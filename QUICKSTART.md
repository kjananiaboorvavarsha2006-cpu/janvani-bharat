# 🚀 Quick Start Guide - JanVani Bharat

## For Development (Without AWS)

If you want to test the application without setting up AWS services, follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment Files

Create `.env` in the root directory:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=dummy
AWS_SECRET_ACCESS_KEY=dummy
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

Create `.env.local` in the root directory:
```env
VITE_API_URL=http://localhost:3001
```

### 3. Run the Application

```bash
npm run dev:all
```

This will start:
- Frontend on http://localhost:8080
- Backend on http://localhost:3001

### 4. Test Features

✅ **Working without AWS:**
- Landing page with features
- Eligibility form
- Results dashboard (using mock data)
- Interactive map (basic functionality)
- UI/UX features

⚠️ **Requires AWS setup:**
- AI Chatbot responses (will show errors)
- Text-to-speech
- Real-time translation
- DynamoDB scheme storage

---

## For Production (With AWS)

### Prerequisites
- AWS Account
- AWS CLI configured
- Node.js 18+

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure AWS

#### A. Create IAM User
1. Go to AWS IAM Console
2. Create new user with programmatic access
3. Attach policies:
   - AmazonBedrockFullAccess
   - TranslateFullAccess
   - AmazonPollyFullAccess
   - AmazonDynamoDBFullAccess

#### B. Enable Bedrock Model
1. Go to AWS Bedrock Console
2. Click "Model access"
3. Enable "Amazon Nova Lite"
4. Wait for approval

### 3. Setup Environment

Create `.env`:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_ACTUAL_KEY
AWS_SECRET_ACCESS_KEY=YOUR_ACTUAL_SECRET
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

Create `.env.local`:
```env
VITE_API_URL=http://localhost:3001
```

### 4. Setup DynamoDB

```bash
npm run setup:db
```

This will:
- Create the `schemes` table
- Populate it with 8 sample schemes

### 5. Run the Application

```bash
npm run dev:all
```

### 6. Test All Features

✅ All features should now work:
- AI Chatbot with Bedrock
- Multilingual translation
- Text-to-speech
- Voice input (browser-based)
- DynamoDB scheme storage
- Eligibility checker
- Interactive map

---

## 🎯 Feature Testing Checklist

### Landing Page
- [ ] Hero section loads
- [ ] Features section displays
- [ ] Map is interactive
- [ ] Language selector works
- [ ] Chatbot button appears

### Eligibility Form
- [ ] Form fields work
- [ ] Language selection works
- [ ] Form submission succeeds
- [ ] Redirects to results

### Results Dashboard
- [ ] Shows eligible schemes
- [ ] Displays scheme cards
- [ ] Apply links work
- [ ] AI explanation appears

### AI Chatbot
- [ ] Opens on button click
- [ ] Sends messages
- [ ] Receives AI responses
- [ ] Voice input works
- [ ] Text-to-speech works
- [ ] Language switching works

### Map Feature
- [ ] Map loads
- [ ] States are clickable
- [ ] Shows schemes for state
- [ ] Info panel appears

---

## 🐛 Common Issues

### Backend won't start
**Error:** `Cannot find module`
**Solution:** Run `npm install` again

### AWS Credentials Error
**Error:** `Missing credentials`
**Solution:** Check `.env` file has correct AWS keys

### Bedrock Access Denied
**Error:** `Access denied to model`
**Solution:** Enable Nova Lite model in Bedrock console

### DynamoDB Table Not Found
**Error:** `Table does not exist`
**Solution:** Run `npm run setup:db`

### Chatbot Not Responding
**Error:** Network error
**Solution:** 
1. Check backend is running on port 3001
2. Verify AWS credentials
3. Check Bedrock model access

### Voice Input Not Working
**Solution:** 
- Use Chrome or Edge browser
- Allow microphone permissions
- Voice input uses browser API (no AWS needed)

---

## 📊 API Testing

Test backend endpoints directly:

### Health Check
```bash
curl http://localhost:3001/health
```

### Get All Schemes
```bash
curl http://localhost:3001/api/schemes
```

### Chat (requires AWS)
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about PM Kisan", "language": "english"}'
```

### Eligibility Check
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

---

## 🎓 Next Steps

1. **Customize Schemes:** Edit `server/routes/schemes.js` to add more schemes
2. **Enhance AI:** Modify prompts in `server/routes/chat.js`
3. **Add States:** Update map data in `src/components/SchemeMap.tsx`
4. **Improve Eligibility:** Enhance logic in `server/routes/eligibility.js`
5. **Deploy:** Use AWS Amplify, Vercel, or EC2 for production

---

## 💡 Tips

- Start with mock data to test UI/UX
- Add AWS services incrementally
- Monitor AWS costs with billing alerts
- Use AWS Free Tier when possible
- Keep credentials secure

---

## 📞 Support

For issues:
1. Check console logs (browser & terminal)
2. Verify environment variables
3. Test API endpoints individually
4. Review AWS service quotas

Happy coding! 🚀
