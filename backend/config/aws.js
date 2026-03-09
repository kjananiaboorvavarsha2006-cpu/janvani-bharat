import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import { TranslateClient } from '@aws-sdk/client-translate';
import { PollyClient } from '@aws-sdk/client-polly';
import { TranscribeClient } from '@aws-sdk/client-transcribe';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

// Check if AWS credentials are configured
const hasValidCredentials = 
  process.env.AWS_ACCESS_KEY_ID && 
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_ACCESS_KEY_ID !== 'your_access_key_here' &&
  process.env.AWS_SECRET_ACCESS_KEY !== 'your_secret_key_here';

if (!hasValidCredentials) {
  console.log('⚠️  AWS credentials not configured - using mock data mode');
  console.log('   To enable AWS features, configure credentials in backend/.env');
}

// Create AWS clients with credentials only if they're valid
const awsConfig = hasValidCredentials ? {
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
} : {
  region: AWS_REGION,
  // No credentials - will fail gracefully and use mock data
};

// AWS Bedrock Client for AI
export const bedrockClient = new BedrockRuntimeClient(awsConfig);

// AWS Translate Client
export const translateClient = new TranslateClient(awsConfig);

// AWS Polly Client for Text-to-Speech
export const pollyClient = new PollyClient(awsConfig);

// AWS Transcribe Client for Speech-to-Text
export const transcribeClient = new TranscribeClient(awsConfig);

// DynamoDB Client
const dynamoClient = new DynamoDBClient(awsConfig);

export const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const isAwsConfigured = hasValidCredentials;
