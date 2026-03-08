# JanVani Bharat - AI-Powered Government Scheme Discovery Platform

## 🚀 Project Overview

JanVani Bharat is an advanced AI-powered platform that helps Indian citizens discover government welfare schemes using AWS cloud services and modern web technologies.

## ✨ Features

### 1. AI Chatbot Integration
- Modern chat UI with typing indicators
- Powered by AWS Bedrock (Nova Lite model)
- Answers questions about government schemes
- Provides scheme explanations, benefits, eligibility, and application steps

### 2. Multilingual Support
- Supports English, Hindi, and Tamil
- AWS Translate integration for dynamic translation
- Language selector in navigation

### 3. Voice Assistant
- Voice input using Web Speech API
- Text-to-speech using Amazon Polly
- Microphone button in chatbot UI

### 4. Government Scheme Database
- DynamoDB integration for scheme storage
- Mock data fallback for development
- Schemes include: PM Kisan, Ayushman Bharat, PM Awas, Startup India, Skill India, PM Mudra, PM Ujjwala, Sukanya Samriddhi

### 5. Scheme Eligibility Checker
- Form-based eligibility assessment
- Filters schemes based on age, income, occupation, state, and category
- Returns personalized scheme recommendations

### 6. Map-Based Scheme Finder
- Interactive map using Leaflet
- Click states to view regional schemes
- Visual exploration of scheme availability

### 7. Modern UI/UX
- Tailwind CSS with responsive design
- Smooth animations and transitions
- Clean scheme cards and government-tech aesthetic

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components
- React Router
- React Leaflet (maps)
- Axios

### Backend
- Node.js + Express
- AWS SDK v3
  - Bedrock Runtime (AI)
  - Translate (multilingual)
  - Polly (text-to-speech)
  - Transcribe (speech-to-text)
  - DynamoDB (database)

## 📋 Prerequisites

1. Node.js 18+ and npm
2. AWS Account with the following services enabled:
   - AWS Bedrock (Nova Lite model access)
   - AWS Translate
   - AWS Polly
   - AWS Transcribe
   - AWS DynamoDB

## 🔧 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: AWS Configuration

1. Create an AWS account if you don't have one
2. Set up IAM user with programmatic access
3. Attach the following policies:
   - AmazonBedrockFullAccess
   - TranslateFullAccess
   - AmazonPollyFullAccess
   - AmazonTranscribeFullAccess
   - AmazonDynamoDBFullAccess

4. Copy `.env.example` to `.env` and fill in your AWS credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

### Step 3: DynamoDB Table Setup

Create a DynamoDB table named `schemes` with:
- Primary Key: `schemeId` (String)

Optional: Populate with sample data:

```json
{
  "schemeId": "pm-kisan",
  "schemeName": "PM Kisan Samman Nidhi",
  "category": "Agriculture",
  "description": "Income support of ₹6,000 per year to farmer families",
  "benefits": "₹6,000 per year in 3 installments",
  "eligibility": "Small and marginal farmer families",
  "state": "All India",
  "applySteps": "1. Visit pmkisan.gov.in 2. Register with Aadhaar 3. Fill application form",
  "officialLink": "https://pmkisan.gov.in"
}
```

### Step 4: Frontend Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:3001
```

### Step 5: AWS Bedrock Model Access

1. Go to AWS Bedrock console
2. Navigate to "Model access"
3. Request access to "Amazon Nova Lite" model
4. Wait for approval (usually instant)

## 🚀 Running the Application

### Option 1: Run Both Frontend and Backend Together

```bash
npm run dev:all
```

### Option 2: Run Separately

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📡 API Endpoints

### Chat
```
POST /api/chat
Body: { message: string, language: string }
```

### Eligibility Check
```
POST /api/eligibility
Body: { age: number, income: number, occupation: string, state: string, category: string }
```

### Get All Schemes
```
GET /api/schemes?state=<state>&category=<category>
```

### Get Scheme by ID
```
GET /api/schemes/:id
```

### Text-to-Speech
```
POST /api/voice/synthesize
Body: { text: string, language: string }
```

## 🎯 Usage Guide

### 1. Landing Page
- View platform features
- Explore schemes by state using interactive map
- Access AI chatbot from floating button

### 2. Eligibility Form
- Fill in personal details
- Select preferred language
- Submit to get personalized scheme recommendations

### 3. Results Dashboard
- View eligible schemes
- Read AI-generated explanations
- Access official application links

### 4. AI Chatbot
- Click floating chat button
- Ask questions about schemes
- Use microphone for voice input
- Listen to responses with text-to-speech

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use IAM roles with minimum required permissions
- Rotate AWS credentials regularly
- Enable AWS CloudTrail for audit logging

## 🐛 Troubleshooting

### Backend won't start
- Check AWS credentials in `.env`
- Verify AWS region is correct
- Ensure all AWS services are enabled

### Chatbot not responding
- Verify Bedrock Nova Lite model access is granted
- Check AWS credentials have Bedrock permissions
- Review backend logs for errors

### Voice features not working
- Voice input uses browser Web Speech API (Chrome/Edge recommended)
- Text-to-speech requires AWS Polly access
- Check microphone permissions in browser

### Map not loading
- Ensure internet connection for OpenStreetMap tiles
- Check browser console for errors
- Verify Leaflet CSS is loaded

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🤝 Contributing

This is a demonstration project showcasing AWS cloud services integration with React.

## 📄 License

MIT License

## 🙏 Acknowledgments

- AWS Bedrock for AI capabilities
- Shadcn/ui for beautiful components
- OpenStreetMap for map tiles
- Government of India for scheme information

---

**Note**: This project requires active AWS services which may incur costs. Monitor your AWS usage and set up billing alerts.
