# JanVani Bharat - Backend

Express.js backend API for the JanVani Bharat platform with AWS integrations.

## Tech Stack

- Node.js
- Express
- AWS SDK v3 (Bedrock, DynamoDB, Polly, Translate, Transcribe)

## Getting Started

```bash
# Install dependencies
npm install

# Setup DynamoDB table
npm run setup:db

# Start server
npm run dev
```

The server will run at http://localhost:3001

## Environment Variables

Create a `.env` file:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

## API Endpoints

- `POST /api/chat` - AI chatbot
- `POST /api/eligibility` - Check scheme eligibility
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get scheme by ID
- `POST /api/voice/synthesize` - Text-to-speech
- `GET /health` - Health check

## Project Structure

```
backend/
├── routes/         # API route handlers
├── config/         # Configuration files
└── scripts/        # Utility scripts
```
