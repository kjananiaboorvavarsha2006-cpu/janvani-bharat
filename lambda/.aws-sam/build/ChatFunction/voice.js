import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

const pollyClient = new PollyClient({});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

/**
 * Lambda handler for text-to-speech using AWS Polly
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
    const { text, language = 'english' } = body;

    if (!text) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Text is required'
        })
      };
    }

    // Limit text length to prevent abuse
    if (text.length > 3000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Text too long. Maximum 3000 characters allowed.'
        })
      };
    }

    // Map language to Polly voice
    const voiceMap = {
      english: 'Aditi',  // Indian English female voice
      hindi: 'Aditi',    // Supports Hindi
      tamil: 'Aditi'     // Fallback to English voice
    };

    const languageCodeMap = {
      english: 'en-IN',
      hindi: 'hi-IN',
      tamil: 'en-IN'  // Tamil not directly supported
    };

    const command = new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: voiceMap[language] || 'Aditi',
      LanguageCode: languageCodeMap[language] || 'en-IN',
      Engine: 'neural'
    });

    const response = await pollyClient.send(command);
    
    // Convert audio stream to base64
    const audioStream = response.AudioStream;
    const chunks = [];
    
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    
    const audioBuffer = Buffer.concat(chunks);
    const audioBase64 = audioBuffer.toString('base64');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        audio: audioBase64,
        contentType: 'audio/mpeg',
        language: language
      })
    };

  } catch (error) {
    console.error('Speech synthesis error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to synthesize speech',
        message: error.message
      })
    };
  }
};
