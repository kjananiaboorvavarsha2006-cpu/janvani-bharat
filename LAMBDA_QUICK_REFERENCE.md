# 🚀 Lambda Quick Reference

## One-Page Cheat Sheet

### 📦 What You Have

```
✅ 5 Lambda Functions Ready
✅ DynamoDB Integration Complete
✅ Eligibility-Based API
✅ SAM Template Configured
✅ Full Documentation
```

---

## 🎯 Quick Commands

### Deploy to AWS Lambda

```bash
# 1. Install SAM CLI
brew install aws-sam-cli

# 2. Configure AWS
aws configure

# 3. Deploy
cd lambda
npm install
sam deploy --guided

# 4. Seed database
aws lambda invoke --function-name dev-janvani-db-seeder response.json

# 5. Get API URL
aws cloudformation describe-stacks \
  --stack-name janvani-bharat-dev \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
  --output text
```

### Use Express Server (No AWS)

```bash
npm run dev:all
# Frontend: http://localhost:8080
# Backend: http://localhost:3001
```

---

## 📡 API Endpoints

```
GET  /schemes              - All schemes
GET  /schemes/{id}         - Scheme by ID
POST /schemes/eligible     - Eligible schemes
POST /eligibility          - Check eligibility
POST /chat                 - AI chatbot
POST /voice/synthesize     - Text-to-speech
```

---

## 🧪 Test Commands

```bash
# Local testing
cd lambda
sam local start-api

# Test schemes
curl http://localhost:3000/schemes

# Test eligibility
curl -X POST http://localhost:3000/eligibility \
  -H "Content-Type: application/json" \
  -d '{"age":30,"income":200000,"occupation":"farmer","state":"Maharashtra","category":"General"}'
```

---

## 💰 Cost

**Free Tier:** 1M requests/month  
**After Free Tier:** ~$3/month for 10K requests

---

## 📚 Documentation

- **AWS_LAMBDA_DEPLOYMENT.md** - Full deployment guide
- **lambda/README.md** - Lambda documentation
- **LAMBDA_INTEGRATION_SUMMARY.md** - Feature overview

---

## 🔧 Troubleshooting

```bash
# View logs
sam logs -n SchemesFunction --tail

# Validate template
sam validate

# Check AWS credentials
aws sts get-caller-identity

# Delete stack
sam delete --stack-name janvani-bharat-dev
```

---

## ✅ Quick Checklist

### Before Deployment
- [ ] AWS CLI installed
- [ ] SAM CLI installed
- [ ] AWS credentials configured
- [ ] Bedrock model access enabled

### After Deployment
- [ ] API endpoint obtained
- [ ] Database seeded
- [ ] Frontend .env.local updated
- [ ] All endpoints tested

---

**Need help? Check AWS_LAMBDA_DEPLOYMENT.md for detailed guide!**
