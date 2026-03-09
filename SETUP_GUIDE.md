# Setup Guide - Restructured Project

The project has been reorganized into separate frontend and backend directories.

## New Structure

```
janvani-bharat/
├── frontend/              # React + Vite application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.local
├── backend/               # Express.js API server
│   ├── routes/
│   ├── config/
│   ├── scripts/
│   ├── package.json
│   └── .env
├── lambda/                # AWS Lambda functions
└── package.json           # Root package with scripts
```

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies at once
npm run install:all
```

Or install individually:

```bash
# Root dependencies (concurrently)
npm install

# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables

**Backend** - Create `backend/.env`:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

**Frontend** - Create `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:3001
```

### 3. Setup Database

```bash
npm run setup:db
```

### 4. Run the Application

```bash
# Run both frontend and backend
npm run dev:all

# Or run separately:
npm run dev      # Frontend only (port 8080)
npm run server   # Backend only (port 3001)
```

## Development Workflow

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run linter
npm run test     # Run tests
```

### Backend Development
```bash
cd backend
npm run dev      # Start server
npm run setup:db # Setup DynamoDB
```

## Migration Notes

- All frontend code moved to `frontend/` directory
- All backend code moved to `backend/` directory
- Lambda functions remain in `lambda/` directory
- Root `package.json` provides convenience scripts
- Each directory has its own `package.json` with specific dependencies
- Environment files are now in their respective directories

## Deployment

### Frontend
- Build directory: `frontend/dist`
- Deploy to: Vercel, Netlify, AWS Amplify
- Build command: `npm run build` (from frontend directory)

### Backend
- Entry point: `backend/index.js`
- Deploy to: AWS EC2, ECS, Lambda
- Start command: `npm start` (from backend directory)
