# 🎯 Command Reference - JanVani Bharat

## Quick Commands

### Installation
```bash
npm install
```

### Development
```bash
# Run both frontend and backend
npm run dev:all

# Run frontend only
npm run dev

# Run backend only
npm run server
```

### Database Setup
```bash
npm run setup:db
```

### Build
```bash
npm run build
```

### Testing
```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

---

## Detailed Commands

### npm install
**Purpose:** Install all dependencies  
**Time:** 2-3 minutes  
**When:** First time setup, after pulling changes  
**Output:** ~1500 packages installed

### npm run dev:all
**Purpose:** Start both frontend and backend  
**Ports:** Frontend (8080), Backend (3001)  
**When:** Development  
**Stop:** Ctrl+C

### npm run dev
**Purpose:** Start frontend only  
**Port:** 8080  
**URL:** http://localhost:8080  
**When:** Frontend development

### npm run server
**Purpose:** Start backend only  
**Port:** 3001  
**URL:** http://localhost:3001  
**When:** Backend development

### npm run setup:db
**Purpose:** Create and populate DynamoDB table  
**Requires:** AWS credentials in .env  
**When:** First time AWS setup  
**Output:** Creates 'schemes' table with 8 schemes

### npm run build
**Purpose:** Build for production  
**Output:** dist/ folder  
**When:** Before deployment  
**Time:** 30-60 seconds

---

## Testing Commands

### Test API Endpoints

#### Health Check
```bash
curl http://localhost:3001/health
```

#### Get All Schemes
```bash
curl http://localhost:3001/api/schemes
```

#### Get Scheme by ID
```bash
curl http://localhost:3001/api/schemes/pm-kisan
```

#### Check Eligibility
```bash
curl -X POST http://localhost:3001/api/eligibility \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "income": 200000,
    "occupation": "farmer",
    "state": "Maharashtra",
    "category": "General"
  }'
```

#### Chat (Requires AWS)
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about PM Kisan",
    "language": "english"
  }'
```

#### Text-to-Speech (Requires AWS)
```bash
curl -X POST http://localhost:3001/api/voice/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello from JanVani Bharat",
    "language": "english"
  }'
```

---

## Troubleshooting Commands

### Clear and Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Node Version
```bash
node --version
npm --version
```

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :3001
netstat -ano | findstr :8080

# Mac/Linux
lsof -i :3001
lsof -i :8080
```

### Kill Process on Port
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

### Check Syntax
```bash
node --check server/index.js
node --check server/routes/chat.js
```

### Run Pre-Deployment Check
```bash
node test-setup.js
```

---

## Environment Commands

### Create Environment Files
```bash
# Windows PowerShell
Copy-Item .env.example .env
Copy-Item .env.local.example .env.local

# Mac/Linux/Git Bash
cp .env.example .env
cp .env.local.example .env.local
```

### View Environment Files
```bash
# Windows
type .env
type .env.local

# Mac/Linux
cat .env
cat .env.local
```

---

## Git Commands

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: JanVani Bharat"
```

### Push to Remote
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

### Pull Latest Changes
```bash
git pull origin main
npm install  # After pulling
```

---

## Deployment Commands

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy Frontend (Netlify)
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## AWS Commands

### Configure AWS CLI (Optional)
```bash
aws configure
```

### Check DynamoDB Table
```bash
aws dynamodb describe-table --table-name schemes
```

### List DynamoDB Items
```bash
aws dynamodb scan --table-name schemes
```

### Check Bedrock Model Access
```bash
aws bedrock list-foundation-models
```

---

## Quick Reference

| Command | Purpose | Port |
|---------|---------|------|
| `npm install` | Install dependencies | - |
| `npm run dev:all` | Start everything | 8080, 3001 |
| `npm run dev` | Frontend only | 8080 |
| `npm run server` | Backend only | 3001 |
| `npm run setup:db` | Setup database | - |
| `npm run build` | Production build | - |
| `npm run test` | Run tests | - |

---

## Common Workflows

### First Time Setup
```bash
npm install
cp .env.example .env
cp .env.local.example .env.local
npm run dev:all
```

### Daily Development
```bash
npm run dev:all
# Make changes
# Test in browser
# Ctrl+C to stop
```

### With AWS Setup
```bash
# Edit .env with AWS credentials
npm run setup:db
npm run dev:all
# Test AI features
```

### Before Deployment
```bash
npm run build
npm run preview
# Test production build
```

---

## URLs

| Service | URL |
|---------|-----|
| Frontend Dev | http://localhost:8080 |
| Backend API | http://localhost:3001 |
| Health Check | http://localhost:3001/health |
| API Schemes | http://localhost:3001/api/schemes |

---

**Quick Start:**
```bash
npm install && npm run dev:all
```

**Then open:** http://localhost:8080
