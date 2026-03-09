# 🚀 JanVani Bharat - Deployment Information

## 🌐 Live URLs

### Production Deployment
- **Frontend (AWS Amplify):** https://main.d3g0cl078uogxm.amplifyapp.com
- **Backend API (AWS Lambda):** https://j639b8j9tk.execute-api.us-east-1.amazonaws.com/prod

### Local Development
- **Frontend:** http://localhost:8080
- **Backend:** http://localhost:3001

---

## 📡 API Endpoints

### Base URL
**Production:** `https://j639b8j9tk.execute-api.us-east-1.amazonaws.com/prod`

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/api/chat` | AI chatbot |
| POST | `/api/eligibility` | Check eligibility |
| GET | `/api/schemes` | Get all schemes |
| GET | `/api/schemes/:id` | Get scheme by ID |
| POST | `/api/voice/synthesize` | Text-to-speech |

---

## 🏗️ Infrastructure

### AWS Services Used

**Frontend:**
- AWS Amplify (Hosting)
- CloudFront (CDN)
- Route 53 (DNS)

**Backend:**
- AWS Lambda (Serverless functions)
- API Gateway (REST API)
- CloudWatch (Logging)

**Database:**
- DynamoDB (NoSQL database)

**AI Services:**
- Amazon Bedrock (Nova Lite model)
- Amazon Translate (Multilingual support)
- Amazon Polly (Text-to-speech)
- Amazon Transcribe (Speech-to-text)

---

## 🔄 Deployment Process

### Frontend (AWS Amplify)
Amplify automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push
```

Amplify will:
1. Detect the push
2. Build the frontend
3. Deploy automatically
4. Update the live site

### Backend (AWS Lambda)
To update the backend:

```bash
cd lambda
sam build
sam deploy
```

---

## 📊 Monitoring

### Frontend Monitoring
- **Amplify Console:** https://console.aws.amazon.com/amplify/home
- View build logs, deployment history, and metrics

### Backend Monitoring
- **Lambda Console:** https://console.aws.amazon.com/lambda/home
- **CloudWatch Logs:** https://console.aws.amazon.com/cloudwatch/home
- **API Gateway:** https://console.aws.amazon.com/apigateway/home

---

## 💰 Cost Estimate

### Free Tier (First 12 months)
- Lambda: 1M requests/month FREE
- DynamoDB: 25 GB storage FREE
- API Gateway: 1M calls/month FREE
- Amplify: 1000 build minutes/month FREE

### After Free Tier (Estimated for 10K requests/month)
- Lambda: ~$0.20
- DynamoDB: ~$2.50
- API Gateway: ~$0.35
- Bedrock: ~$0.10
- Amplify: ~$0.15
- **Total: ~$3-5/month**

---

## 🔐 Security

### Environment Variables
Sensitive data is stored as environment variables:
- AWS credentials (not in code)
- API keys (not in code)
- Database connection strings (not in code)

### HTTPS
- ✅ Frontend: HTTPS enabled by default (Amplify)
- ✅ Backend: HTTPS enabled by default (API Gateway)

### CORS
- Configured to allow frontend domain
- Restricts unauthorized access

---

## 🔄 CI/CD Pipeline

### Automatic Deployment
1. Push code to GitHub
2. Amplify detects changes
3. Builds frontend automatically
4. Deploys to production
5. Live site updates

### Manual Backend Deployment
```bash
cd lambda
sam build
sam deploy
```

---

## 📝 Environment Variables

### Frontend (.env.local)
```env
VITE_API_URL=https://j639b8j9tk.execute-api.us-east-1.amazonaws.com/prod
```

### Backend (.env)
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

---

## 🎯 Quick Links

- **Live App:** https://main.d3g0cl078uogxm.amplifyapp.com
- **API Health Check:** https://j639b8j9tk.execute-api.us-east-1.amazonaws.com/prod/health
- **GitHub Repo:** https://github.com/kjananiaboorvavarsha2006-cpu/janvani-bharat
- **AWS Console:** https://console.aws.amazon.com/

---

## 📞 Support

For issues or questions:
1. Check CloudWatch logs for backend errors
2. Check Amplify console for frontend build errors
3. Review API Gateway logs for request errors

---

**Last Updated:** March 9, 2026  
**Deployment Status:** ✅ Live and Running
