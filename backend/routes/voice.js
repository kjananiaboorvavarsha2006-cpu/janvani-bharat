import express from 'express';
import { SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { pollyClient } from '../config/aws.js';

const router = express.Router();

// Text-to-Speech endpoint
router.post('/synthesize', async (req, res) => {
  try {
    const { text, language = 'english' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Try AWS Polly first
    try {
      // Map language to Polly voice
      const voiceMap = {
        english: 'Aditi', // Indian English female voice
        hindi: 'Aditi',   // Supports Hindi
        tamil: 'Aditi'    // Fallback to English voice
      };

      const languageCodeMap = {
        english: 'en-IN',
        hindi: 'hi-IN',
        tamil: 'en-IN' // Tamil not directly supported, use English
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

      res.json({
        success: true,
        audio: audioBase64,
        contentType: 'audio/mpeg',
        source: 'polly'
      });
    } catch (awsError) {
      console.log('AWS Polly not available, using browser TTS fallback:', awsError.message);
      
      // Return success but indicate browser should use Web Speech API
      res.json({
        success: true,
        useBrowserTTS: true,
        text: text,
        message: 'Using browser text-to-speech',
        source: 'browser'
      });
    }

  } catch (error) {
    console.error('Speech synthesis error:', error);
    res.status(500).json({
      error: 'Failed to synthesize speech',
      details: error.message
    });
  }
});

// Note: Speech-to-Text (Transcribe) requires S3 bucket setup
// For real-time transcription, consider using WebSocket with Transcribe Streaming
router.post('/transcribe', async (req, res) => {
  try {
    // This is a placeholder - real implementation requires S3 and async processing
    res.json({
      success: false,
      message: 'Speech-to-text requires S3 bucket configuration. Please use browser Web Speech API as fallback.'
    });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({
      error: 'Failed to transcribe audio',
      details: error.message
    });
  }
});

export default router;
