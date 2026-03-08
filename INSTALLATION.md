# 📦 Installation Guide - JanVani Bharat

## Step-by-Step Installation

### Step 1: Install Node.js

Ensure you have Node.js 18 or higher installed:

```bash
node --version  # Should be v18.x.x or higher
npm --version   # Should be 9.x.x or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### Step 2: Clone or Download Project

If you have the project files, navigate to the project directory:

```bash
cd janvani-bharat
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages for both frontend and backend.

**Expected output:**
```
added 1500+ packages in 2m
```

### Step 4: Setup Environment Files

#### Backend Environment (.env)

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your text editor:

**For Development (without AWS):**
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=dummy
AWS_SECRET_ACCESS_KEY=dummy
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

**For Production (with AWS):**
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

#### Frontend Environment (.env.local)

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:3001
```

### Step 5: Verify Installation

Check if all files are in place:

```bash
# Check backend files
ls server/index.js
ls server/config/aws.js
ls server/routes/

# Check frontend files
ls src/App.tsx
ls src/components/Chatbot.tsx
ls src/pages/LandingPage.tsx
```

## 🚀 Running the Application

### Option 1: Run Everything Together (Recommended)

```bash
npm run dev:all
```

This starts:
- Frontend on http://localhost:8080
- Backend on http://localhost:3001

**Expected output:**
```
[0] VITE v5.4.19  ready in 1234 ms
[0] ➜  Local:   http://localhost:8080/
[1] 🚀 Server running on http://localhost:3001
```

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 6: Test the Application

Open your browser and navigate to:
```
http://localhost:8080
```

You should see the JanVani Bharat landing page.

## ✅ Testing Features

### Test 1: Landing Page
- [ ] Page loads successfully
- [ ] Hero section displays
- [ ] Features section visible
- [ ] Map loads (may take a few seconds)
- [ ] Chatbot button appears (bottom right)

### Test 2: Navigation
- [ ] Click "Check Eligibility" button
- [ ] Form page loads
- [ ] All form fields are visible

### Test 3: Eligibility Form
- [ ] Select language (English/Hindi/Tamil)
- [ ] Fill in all fields:
  - Name: Test User
  - Age: 30
  - Gender: Male
  - Income: 200000
  - State: Maharashtra
  - Area: Rural
  - Occupation: Farmer
  - Category: General
- [ ] Click "Check Eligibility"
- [ ] Results page loads

### Test 4: Results Dashboard
- [ ] Eligible schemes display
- [ ] Scheme cards show benefits
- [ ] Apply links are clickable
- [ ] AI explanation appears

### Test 5: Chatbot (Without AWS)
- [ ] Click chatbot button
- [ ] Chat window opens
- [ ] Type a message
- [ ] Send message
- [ ] Error message appears (expected without AWS)

### Test 6: Map Feature
- [ ] Return to landing page
- [ ] Scroll to map section
- [ ] Click on a state marker
- [ ] Info panel appears
- [ ] Schemes list displays (may be empty without AWS)

## 🔧 AWS Setup (Optional)

If you want to enable AI features, follow these steps:

### Step 1: Create AWS Account

1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Follow the registration process
4. Add payment method (Free Tier available)

### Step 2: Create IAM User

1. Go to AWS Console → IAM
2. Click "Users" → "Add users"
3. Username: `janvani-bharat-user`
4. Access type: Programmatic access
5. Click "Next: Permissions"

### Step 3: Attach Policies

Attach these policies:
- AmazonBedrockFullAccess
- TranslateFullAccess
- AmazonPollyFullAccess
- AmazonDynamoDBFullAccess

Click "Next" → "Create user"

### Step 4: Save Credentials

**IMPORTANT:** Save these credentials securely:
- Access Key ID: `AKIAIOSFODNN7EXAMPLE`
- Secret Access Key: `wJalrXUtnFEMI/K7MDENG/bPxRfiCY...`

### Step 5: Enable Bedrock Model

1. Go to AWS Console → Bedrock
2. Click "Model access" (left sidebar)
3. Click "Manage model access"
4. Find "Amazon Nova Lite"
5. Check the box
6. Click "Request model access"
7. Wait for approval (usually instant)

### Step 6: Update .env File

Edit `.env` with your actual AWS credentials:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

### Step 7: Setup DynamoDB

```bash
npm run setup:db
```

**Expected output:**
```
🔍 Checking if table exists...
📦 Creating DynamoDB table...
✅ Table created successfully!
⏳ Waiting for table to be active...
📝 Inserting sample schemes...
  ✓ Added: PM Kisan Samman Nidhi
  ✓ Added: Ayushman Bharat (PMJAY)
  ✓ Added: PM Awas Yojana
  ✓ Added: Startup India
  ✓ Added: Skill India (PMKVY)
  ✓ Added: PM Mudra Loan Yojana
  ✓ Added: PM Ujjwala Yojana
  ✓ Added: Sukanya Samriddhi Yojana
🎉 DynamoDB setup complete!
📊 Total schemes added: 8
```

### Step 8: Restart Application

```bash
# Stop the running application (Ctrl+C)
# Start again
npm run dev:all
```

### Step 9: Test AI Features

#### Test Chatbot:
1. Click chatbot button
2. Type: "Tell me about PM Kisan"
3. Wait for AI response
4. Response should appear in chat

#### Test Voice:
1. In chatbot, click microphone button
2. Allow microphone access
3. Speak: "What is Ayushman Bharat?"
4. Text should appear in input
5. Send message
6. Click "Listen" on bot response
7. Audio should play

#### Test Translation:
1. Change language to Hindi
2. Send a message
3. Response should be in Hindi

## 🐛 Troubleshooting

### Issue: npm install fails

**Error:** `EACCES: permission denied`

**Solution:**
```bash
sudo npm install
# OR
npm install --unsafe-perm
```

### Issue: Port already in use

**Error:** `Port 3001 is already in use`

**Solution:**
```bash
# Find process using port
lsof -i :3001  # Mac/Linux
netstat -ano | findstr :3001  # Windows

# Kill the process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows

# OR change port in .env
PORT=3002
```

### Issue: Backend won't start

**Error:** `Cannot find module`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: AWS credentials error

**Error:** `Missing credentials in config`

**Solution:**
1. Check `.env` file exists
2. Verify credentials are correct
3. Ensure no extra spaces
4. Restart server

### Issue: Bedrock access denied

**Error:** `Access denied to model`

**Solution:**
1. Go to Bedrock console
2. Check model access status
3. Request access if not enabled
4. Wait for approval
5. Restart application

### Issue: DynamoDB table not found

**Error:** `Requested resource not found`

**Solution:**
```bash
# Run setup script
npm run setup:db

# OR create table manually in AWS Console
```

### Issue: Map not loading

**Error:** Blank map area

**Solution:**
1. Check internet connection
2. Open browser console (F12)
3. Look for errors
4. Ensure Leaflet CSS is loaded
5. Try different browser

### Issue: Voice input not working

**Error:** Microphone button does nothing

**Solution:**
1. Use Chrome or Edge browser
2. Allow microphone permissions
3. Check browser console for errors
4. Try HTTPS (voice API requires secure context)

## 📊 Verify Installation Checklist

- [ ] Node.js 18+ installed
- [ ] npm packages installed (1500+)
- [ ] `.env` file created
- [ ] `.env.local` file created
- [ ] Backend starts on port 3001
- [ ] Frontend starts on port 8080
- [ ] Landing page loads
- [ ] Eligibility form works
- [ ] Results page displays
- [ ] Map loads
- [ ] Chatbot opens

## 🎯 Next Steps

1. **Explore the UI:** Navigate through all pages
2. **Test Features:** Try eligibility checker with different inputs
3. **Setup AWS:** Enable AI features (optional)
4. **Customize:** Modify schemes, add new features
5. **Deploy:** Follow deployment guide in README_SETUP.md

## 📞 Getting Help

If you encounter issues:

1. Check console logs (browser & terminal)
2. Review error messages
3. Verify environment variables
4. Check AWS service status
5. Review documentation files

## 🎉 Success!

If you can see the landing page and navigate through the app, congratulations! You've successfully installed JanVani Bharat.

Now you can:
- Explore the features
- Add AWS credentials for AI
- Customize the schemes
- Deploy to production

Happy coding! 🚀
