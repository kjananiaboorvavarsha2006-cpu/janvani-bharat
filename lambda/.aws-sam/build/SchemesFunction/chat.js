import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

const bedrockClient = new BedrockRuntimeClient({});
const translateClient = new TranslateClient({});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

/**
 * Lambda handler for AI chatbot using AWS Bedrock
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle OPTIONS for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { message, language = 'english', context = {} } = body;

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Message is required'
        })
      };
    }

    // System prompt for government scheme assistant
    const systemPrompt = `You are an AI assistant for JanVani Bharat, a platform helping Indian citizens discover government welfare schemes.

Your role:
- Answer questions about government schemes in India
- Explain scheme benefits, eligibility criteria, and application process
- Guide users to the right schemes based on their profile
- Be helpful, accurate, and empathetic
- Keep responses concise and actionable (max 200 words)
- Always provide official links when available

Available schemes: PM Kisan, Ayushman Bharat, PM Awas Yojana, Startup India, Skill India, PM Mudra Loan, PM Ujjwala Yojana, Sukanya Samriddhi Yojana.

Respond in a friendly, conversational tone.`;

    // Prepare request for Bedrock Nova Lite
    const payload = {
      messages: [
        {
          role: 'user',
          content: [{ text: `${systemPrompt}\n\nUser question: ${message}` }]
        }
      ],
      inferenceConfig: {
        maxTokens: 500,
        temperature: 0.7,
        topP: 0.9
      }
    };

    // Call AWS Bedrock Nova Lite
    const command = new InvokeModelCommand({
      modelId: 'us.amazon.nova-lite-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload)
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    let aiResponse = responseBody.output?.message?.content?.[0]?.text || 
                     'I apologize, but I could not generate a response. Please try again.';

    // Translate response if needed
    if (language !== 'english') {
      const targetLang = language === 'hindi' ? 'hi' : language === 'tamil' ? 'ta' : 'en';
      
      try {
        const translateCommand = new TranslateTextCommand({
          Text: aiResponse,
          SourceLanguageCode: 'en',
          TargetLanguageCode: targetLang
        });

        const translateResponse = await translateClient.send(translateCommand);
        aiResponse = translateResponse.TranslatedText;
      } catch (translateError) {
        console.error('Translation error:', translateError);
        // Continue with English response if translation fails
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        response: aiResponse,
        language: language
      })
    };

  } catch (error) {
    console.error('Chat error:', error);
    
    // Handle specific Bedrock errors
    if (error.name === 'AccessDeniedException') {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Bedrock model access denied. Please enable Nova Lite model access.',
          details: error.message
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to process chat request',
        message: error.message
      })
    };
  }
};
