# Project Structure - JanVani Bharat

## 📁 Directory Overview

```
janvani-bharat/
├── server/                      # Backend Node.js + Express
│   ├── config/
│   │   └── aws.js              # AWS SDK configuration
│   ├── routes/
│   │   ├── chat.js             # AI chatbot endpoint (Bedrock)
│   │   ├── eligibility.js      # Eligibility checker
│   │   ├── schemes.js          # Scheme CRUD operations
│   │   └── voice.js            # Text-to-speech (Polly)
│   ├── scripts/
│   │   └── setupDynamoDB.js    # DynamoDB table setup
│   └── index.js                # Express server entry point
│
├── src/                         # Frontend React + TypeScript
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── Chatbot.tsx         # AI chatbot component
│   │   ├── SchemeMap.tsx       # Interactive map
│   │   ├── LanguageSelector.tsx # Language switcher
│   │   └── NavLink.tsx         # Navigation component
│   ├── pages/
│   │   ├── LandingPage.tsx     # Home page
│   │   ├── EligibilityForm.tsx # Eligibility form
│   │   ├── ResultsDashboard.tsx # Results page
│   │   ├── Index.tsx           # Fallback page
│   │   └── NotFound.tsx        # 404 page
│   ├── lib/
│   │   ├── schemes.ts          # Scheme data & logic
│   │   └── utils.ts            # Utility functions
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Mobile detection
│   │   └── use-toast.ts        # Toast notifications
│   ├── assets/
│   │   └── hero-banner.jpg     # Hero image
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles
│
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── .env.example                 # Backend env template
├── .env.local.example          # Frontend env template
├── package.json                # Dependencies & scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── README.md                   # Main documentation
├── README_SETUP.md             # Detailed setup guide
├── QUICKSTART.md               # Quick start guide
└── PROJECT_STRUCTURE.md        # This file
```

## 🔧 Key Files Explained

### Backend Files

#### `server/index.js`
- Express server setup
- CORS configuration
- Route mounting
- Health check endpoint

#### `server/config/aws.js`
- AWS SDK client initialization
- Bedrock, Translate, Polly, Transcribe, DynamoDB clients
- Credential management

#### `server/routes/chat.js`
- POST `/api/chat` endpoint
- AWS Bedrock Nova Lite integration
- Multilingual translation
- System prompt for scheme guidance

#### `server/routes/schemes.js`
- GET `/api/schemes` - List all schemes
- GET `/api/schemes/:id` - Get scheme by ID
- DynamoDB integration with mock fallback
- State and category filtering

#### `server/routes/eligibility.js`
- POST `/api/eligibility` endpoint
- Eligibility matching logic
- Returns list of eligible scheme IDs

#### `server/routes/voice.js`
- POST `/api/voice/synthesize` - Text-to-speech
- AWS Polly integration
- Multi-language voice support

#### `server/scripts/setupDynamoDB.js`
- Creates DynamoDB table
- Populates with 8 sample schemes
- Run with: `npm run setup:db`

### Frontend Files

#### `src/App.tsx`
- React Router setup
- Query client provider
- Toast and tooltip providers
- Route definitions

#### `src/pages/LandingPage.tsx`
- Hero section with banner
- Features showcase
- How it works section
- Interactive map integration
- AI chatbot integration
- Language selector

#### `src/pages/EligibilityForm.tsx`
- Multi-field form
- Language selection
- Form validation
- Loading state
- Navigation to results

#### `src/pages/ResultsDashboard.tsx`
- Displays eligible schemes
- Scheme cards with benefits
- AI explanation section
- Apply links
- Multilingual scheme names

#### `src/components/Chatbot.tsx`
- Floating chat button
- Chat interface with bubbles
- Voice input (Web Speech API)
- Text-to-speech integration
- Message history
- Loading states

#### `src/components/SchemeMap.tsx`
- Leaflet map integration
- Interactive state markers
- Click to view schemes
- State info panel
- Scheme list display

#### `src/components/LanguageSelector.tsx`
- Dropdown for language selection
- English, Hindi, Tamil options
- Globe icon indicator

#### `src/lib/schemes.ts`
- Scheme data types
- Mock scheme data
- Eligibility scoring logic
- AI explanation generator
- Indian states list

## 🎨 Styling Architecture

### Tailwind CSS
- Custom color palette (saffron, green, navy)
- Responsive breakpoints
- Custom animations (fade-in, slide-up)
- Gradient utilities

### CSS Variables
- Theme colors in `index.css`
- Dark mode support (via next-themes)
- Consistent spacing and typography

### Component Styling
- Shadcn/ui base components
- Custom variants with CVA
- Responsive utilities
- Accessibility-first approach

## 🔌 API Integration

### Frontend → Backend
- Axios for HTTP requests
- Base URL from environment variable
- Error handling with try-catch
- Loading states

### Backend → AWS
- AWS SDK v3 clients
- Async/await pattern
- Error handling and fallbacks
- Mock data for development

## 🗄️ Data Flow

### Eligibility Check Flow
1. User fills form → `EligibilityForm.tsx`
2. Submit → Local scoring → `schemes.ts`
3. Navigate to results → `ResultsDashboard.tsx`
4. Display eligible schemes

### Chat Flow
1. User sends message → `Chatbot.tsx`
2. POST `/api/chat` → `server/routes/chat.js`
3. AWS Bedrock generates response
4. AWS Translate (if needed)
5. Response displayed in chat

### Scheme Fetch Flow
1. Component requests schemes → `SchemeMap.tsx`
2. GET `/api/schemes` → `server/routes/schemes.js`
3. Query DynamoDB (or mock data)
4. Filter by state/category
5. Return scheme list

## 🔐 Environment Variables

### Backend (.env)
```
AWS_REGION              # AWS region (us-east-1)
AWS_ACCESS_KEY_ID       # IAM user access key
AWS_SECRET_ACCESS_KEY   # IAM user secret key
DYNAMODB_TABLE_NAME     # DynamoDB table name
PORT                    # Server port (3001)
```

### Frontend (.env.local)
```
VITE_API_URL           # Backend API URL
```

## 📦 Dependencies

### Production Dependencies
- **Frontend:** React, React Router, Axios, Leaflet, Shadcn/ui
- **Backend:** Express, AWS SDK v3, CORS, dotenv
- **Shared:** TypeScript, Tailwind CSS

### Development Dependencies
- Vite, ESLint, Vitest
- TypeScript types
- Concurrently (run multiple scripts)

## 🚀 Build & Deploy

### Development
```bash
npm run dev:all        # Both frontend & backend
```

### Production Build
```bash
npm run build          # Frontend build → dist/
```

### Backend Deployment
- AWS EC2, ECS, or Lambda
- Environment variables via AWS Systems Manager
- DynamoDB in same region

### Frontend Deployment
- Vercel, Netlify, or AWS Amplify
- Static site from `dist/`
- Environment variables in platform settings

## 🧪 Testing Strategy

### Unit Tests
- Component tests with Vitest
- API route tests
- Utility function tests

### Integration Tests
- E2E with Playwright (optional)
- API endpoint testing
- AWS service mocking

### Manual Testing
- Browser compatibility
- Mobile responsiveness
- Voice features
- Map interactions

## 🔄 Development Workflow

1. **Local Development**
   - Run `npm run dev:all`
   - Edit files with hot reload
   - Test features incrementally

2. **AWS Integration**
   - Setup AWS credentials
   - Enable Bedrock model
   - Create DynamoDB table
   - Test AWS features

3. **Testing**
   - Test UI components
   - Test API endpoints
   - Test AWS integrations
   - Test error handling

4. **Deployment**
   - Build frontend
   - Deploy backend
   - Configure environment
   - Test production

## 📊 Performance Considerations

- Lazy loading for map components
- Debounced API calls
- Optimized images
- Code splitting with Vite
- AWS service quotas monitoring

## 🔍 Debugging Tips

- Check browser console for frontend errors
- Check terminal for backend errors
- Use AWS CloudWatch for service logs
- Test API endpoints with curl/Postman
- Verify environment variables

---

This structure provides a scalable foundation for the JanVani Bharat platform. Each component is modular and can be enhanced independently.
