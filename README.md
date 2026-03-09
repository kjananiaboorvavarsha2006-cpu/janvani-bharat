<<<<<<< HEAD
# JanVani Bharat – AI-Powered Government Scheme Discovery Platform

## 🇮🇳 Overview

JanVani Bharat is an advanced AI-powered platform that helps Indian citizens discover government welfare schemes using AWS cloud services. The platform features an intelligent chatbot, multilingual support, voice assistance, and interactive maps to make government schemes accessible to everyone.

## ✨ Key Features

- **AI Chatbot** - Powered by AWS Bedrock (Nova Lite) for intelligent scheme recommendations
- **Multilingual Support** - English, Hindi, and Tamil with AWS Translate
- **Voice Assistant** - Voice input and text-to-speech using AWS Polly
- **Eligibility Checker** - Smart form-based scheme matching
- **Interactive Map** - Explore schemes by state using Leaflet
- **Modern UI** - Responsive design with Tailwind CSS and Shadcn/ui

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- AWS Account (optional for development)

### Installation

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# Setup DynamoDB
npm run setup:db

# Run the application
npm run dev:all
```

The app will be available at:
- Frontend: http://localhost:8080
- Backend: http://localhost:3001

## Project Structure

```
janvani-bharat/
├── frontend/          # React + Vite frontend
├── backend/           # Express.js backend
├── lambda/            # AWS Lambda functions
└── package.json       # Root scripts for running both
```

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get started in 5 minutes
- **[Setup Guide](README_SETUP.md)** - Complete AWS setup instructions
- **[API Documentation](README_SETUP.md#-api-endpoints)** - Backend API reference

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Leaflet  
**Backend:** Node.js, Express, AWS SDK v3  
**AWS Services:** Bedrock, Translate, Polly, Transcribe, DynamoDB

## 📦 Available Scripts

```bash
npm run install:all  # Install dependencies for all packages
npm run dev          # Start frontend only
npm run server       # Start backend only
npm run dev:all      # Start both frontend and backend
npm run setup:db     # Setup DynamoDB table with sample data
npm run build        # Build frontend for production
npm run lint         # Run ESLint on frontend
npm run test         # Run frontend tests
```

## 🎯 Features in Detail

### 1. AI Chatbot
- Real-time chat interface with typing indicators
- Powered by AWS Bedrock Nova Lite model
- Context-aware responses about government schemes
- Multilingual support

### 2. Eligibility Checker
- Form-based user profiling
- Smart scheme matching algorithm
- Personalized recommendations
- AI-generated explanations

### 3. Interactive Map
- Click states to explore regional schemes
- Visual scheme distribution
- Integrated with DynamoDB

### 4. Voice Features
- Voice input using Web Speech API
- Text-to-speech with AWS Polly
- Supports multiple Indian languages

## 🔧 Configuration

### Environment Variables

**Backend (backend/.env):**
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

**Frontend (frontend/.env.local):**
```env
VITE_API_URL=http://localhost:3001
```

## 🌐 API Endpoints

- `POST /api/chat` - AI chatbot
- `POST /api/eligibility` - Check scheme eligibility
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get scheme by ID
- `POST /api/voice/synthesize` - Text-to-speech

## 🎨 UI Components

Built with Shadcn/ui:
- Chatbot with floating button
- Language selector
- Interactive map
- Scheme cards
- Form components

## 📱 Responsive Design

Fully responsive layout optimized for:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🔒 Security

- AWS credentials stored in environment variables
- CORS enabled for API security
- Input validation on all forms
- Secure AWS IAM permissions

## 🚢 Deployment

### Frontend
- Deploy to Vercel, Netlify, or AWS Amplify
- Build command: `npm run build`
- Output directory: `frontend/dist`
- Root directory: `frontend`

### Backend
- Deploy to AWS EC2, ECS, or Lambda
- Ensure AWS credentials are configured
- Set environment variables
- Root directory: `backend`

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

MIT License

## 🙏 Acknowledgments

- AWS for cloud services
- Shadcn/ui for components
- OpenStreetMap for map tiles
- Government of India for scheme information

---

# janvani-bharat-scheme-eligibility

