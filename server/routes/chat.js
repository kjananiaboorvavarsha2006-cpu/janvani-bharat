import express from 'express';
import { InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { TranslateTextCommand } from '@aws-sdk/client-translate';
import { bedrockClient, translateClient } from '../config/aws.js';

const router = express.Router();

// Chat endpoint with AWS Bedrock Nova Lite
router.post('/', async (req, res) => {
  try {
    const { message, language = 'english', context = {} } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // System prompt for government scheme assistant
    const systemPrompt = `You are an AI assistant for JanVani Bharat, a platform helping Indian citizens discover government welfare schemes. 

Your role:
- Answer questions about government schemes in India
- Explain scheme benefits, eligibility criteria, and application process
- Guide users to the right schemes based on their profile
- Be helpful, accurate, and empathetic
- Keep responses concise and actionable
- Always provide official links when available

Available schemes context: PM Kisan, Ayushman Bharat, PM Awas Yojana, Startup India, Skill India, PM Mudra Loan, PM Ujjwala Yojana, Sukanya Samriddhi Yojana.`;

    // Prepare the request for Bedrock Nova Lite
    const payload = {
      messages: [
        {
          role: 'user',
          content: [{ text: `${systemPrompt}\n\nUser question: ${message}` }]
        }
      ],
      inferenceConfig: {
        maxTokens: 1000,
        temperature: 0.7,
        topP: 0.9
      }
    };

    // Call AWS Bedrock Nova Lite model
    const command = new InvokeModelCommand({
      modelId: 'us.amazon.nova-lite-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload)
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    let aiResponse = responseBody.output?.message?.content?.[0]?.text || 'I apologize, but I could not generate a response.';

    // Translate response if needed
    if (language !== 'english') {
      const targetLang = language === 'hindi' ? 'hi' : language === 'tamil' ? 'ta' : 'en';
      
      const translateCommand = new TranslateTextCommand({
        Text: aiResponse,
        SourceLanguageCode: 'en',
        TargetLanguageCode: targetLang
      });

      const translateResponse = await translateClient.send(translateCommand);
      aiResponse = translateResponse.TranslatedText;
    }

    res.json({
      success: true,
      response: aiResponse,
      language
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      details: error.message
    });
  }
});

export default router;
