# 🚀 AWS Lambda Deployment Guide - JanVani Bharat

## Complete Guide to Deploy Backend as Serverless Functions

This guide will help you deploy the JanVani Bharat backend to AWS Lambda with DynamoDB integration.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Setup AWS Environment](#setup-aws-environment)
4. [Deploy Lambda Functions](#deploy-lambda-functions)
5. [Configure Frontend](#configure-frontend)
6. [Testing](#testing)
7. [Monitoring](#monitoring)
8. [Cost Optimization](#cost-optimization)

---

## Prerequisites

### Required Tools

```bash
# 1. AWS CLI
aws --version
# If not installed: https://aws.amazon.com/cli/

# 2. AWS SAM CLI
sam --version
# If not installed: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

# 3. Node.js 18+
node --version

# 4. Git
git --version
```

### AWS Account Requirements

- Active AWS account
- IAM user with administrator access (or specific permissions)
- AWS credentials configured locally

---

## Architecture Overview

```
┌─────────────┐
│   Frontend  │
│  (React)    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  API Gateway    │
│  (REST API)     │
└──────┬──────────┘
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌──────────────┐  ┌──────────────┐
│   Lambda     │  │   Lambda     │
│  (Schemes)   │  │ (Eligibility)│
└──────┬───────┘  └──────┬───────┘
       │                 │
       └────────┬────────┘
                ▼
         ┌──────────────┐
         │  DynamoDB    │
         │  (Schemes)   │
         └──────────────┘

Additional Services:
- AWS Bedrock (AI Chat)
- AWS Translate (Multilingual)
- AWS Polly (Text-to-Speech)
```

---

## Setup AWS Environment

### Step 1: Configure AWS Credentials

```bash
# Configure AWS CLI
aws configure

# Enter:
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region: us-east-1
# Default output format: json

# Verify configuration
aws sts get-caller-identity
```

### Step 2: Enable Required AWS Services

#### Enable Bedrock Model Access

1. Go to AWS Console → Bedrock
2. Click "Model access" in left sidebar
3. Click "Manage model access"
4. Find "Amazon Nova Lite"
5. Check the box and click "Request model access"
6. Wait for approval (usually instant)

#### Verify Permissions

Your IAM user needs these permissions:
- Lambda: Full access
- DynamoDB: Full access
- API Gateway: Full access
- CloudFormation: Full access
- IAM: Create roles
- Bedrock: InvokeModel
- Translate: TranslateText
- Polly: SynthesizeSpeech

---

## Deploy Lambda Functions

### Step 1: Navigate to Lambda Directory

```bash
cd lambda
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build the Application

```bash
sam build
```

Expected output:
```
Build Succeeded

Built Artifacts  : .aws-sam/build
Built Template   : .aws-sam/build/template.yaml
```

### Step 4: Deploy (First Time)

```bash
sam deploy --guided
```

Answer the prompts:

```
Stack Name [janvani-bharat-dev]: janvani-bharat-dev
AWS Region [us-east-1]: us-east-1
Parameter Environment [dev]: dev
Confirm changes before deploy [Y/n]: Y
Allow SAM CLI IAM role creation [Y/n]: Y
Disable rollback [y/N]: N
Save arguments to configuration file [Y/n]: Y
SAM configuration file [samconfig.toml]: samconfig.toml
SAM configuration environment [default]: default
```

### Step 5: Wait for Deployment

Deployment takes 3-5 minutes. You'll see:

```
CloudFormation stack changeset
---------------------------------
Operation                LogicalResourceId        ResourceType
---------------------------------
+ Add                    ApiGateway               AWS::Serverless::Api
+ Add                    SchemesTable             AWS::DynamoDB::Table
+ Add                    SchemesFunction          AWS::Serverless::Function
+ Add                    EligibilityFunction      AWS::Serverless::Function
+ Add                    ChatFunction             AWS::Serverless::Function
+ Add                    VoiceFunction            AWS::Serverless::Function
---------------------------------

Deploy this changeset? [y/N]: y
```

### Step 6: Get API Endpoint

After deployment completes:

```bash
# Get the API endpoint
aws cloudformation describe-stacks \
  --stack-name janvani-bharat-dev \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
  --output text
```

Save this URL! Example:
```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/dev
```

### Step 7: Seed the Database

```bash
# Invoke the seeder function
aws lambda invoke \
  --function-name dev-janvani-db-seeder \
  --region us-east-1 \
  response.json

# Check response
cat response.json
```

Expected output:
```json
{
  "statusCode": 200,
  "body": "{\"message\":\"Database seeded successfully\",\"count\":8}"
}
```

---

## Configure Frontend

### Update Frontend Environment

Edit `.env.local` in your project root:

```bash
# Replace with your actual API endpoint
VITE_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/dev
```

### Restart Frontend

```bash
# Stop current dev server (Ctrl+C)
# Restart
npm run dev:all
```

---

## Testing

### Test API Endpoints

#### 1. Test Schemes API

```bash
# Get all schemes
curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/schemes

# Get scheme by ID
curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/schemes/pm-kisan
```

#### 2. Test Eligibility API

```bash
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/eligibility \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "income": 200000,
    "occupation": "farmer",
    "state": "Maharashtra",
    "category": "General",
    "gender": "male",
    "area": "rural"
  }'
```

#### 3. Test Chat API

```bash
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about PM Kisan",
    "language": "english"
  }'
```

#### 4. Test Voice API

```bash
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/voice/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to JanVani Bharat",
    "language": "english"
  }'
```

### Test from Frontend

1. Open http://localhost:8080
2. Navigate to eligibility form
3. Fill and submit
4. Check if results load from Lambda
5. Test chatbot
6. Test voice features

---

## Monitoring

### View Lambda Logs

```bash
# Schemes function
sam logs -n SchemesFunction --tail

# Eligibility function
sam logs -n EligibilityFunction --tail

# Chat function
sam logs -n ChatFunction --tail
```

### CloudWatch Dashboard

1. Go to AWS Console → CloudWatch
2. Click "Dashboards"
3. Create new dashboard
4. Add widgets for:
   - Lambda invocations
   - Lambda errors
   - Lambda duration
   - DynamoDB read/write capacity

### Set Up Alarms

```bash
# Create alarm for Lambda errors
aws cloudwatch put-metric-alarm \
  --alarm-name janvani-lambda-errors \
  --alarm-description "Alert on Lambda errors" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

---

## Cost Optimization

### Free Tier (First 12 Months)

- **Lambda**: 1M requests/month + 400,000 GB-seconds compute
- **DynamoDB**: 25 GB storage + 25 read/write capacity units
- **API Gateway**: 1M API calls/month

### Estimated Costs (After Free Tier)

For 10,000 requests/month:

| Service | Cost |
|---------|------|
| Lambda | $0.20 |
| DynamoDB | $2.50 |
| API Gateway | $0.35 |
| Bedrock (100 requests) | $0.10 |
| **Total** | **~$3.15/month** |

### Cost Optimization Tips

1. **Enable API Gateway Caching**
   ```yaml
   # In template.yaml
   CacheClusterEnabled: true
   CacheClusterSize: '0.5'
   ```

2. **Use DynamoDB On-Demand Pricing**
   - Already configured in template
   - Pay only for what you use

3. **Set Lambda Memory Appropriately**
   - Current: 512 MB
   - Adjust based on actual usage

4. **Enable CloudWatch Logs Retention**
   ```yaml
   RetentionInDays: 7  # Already set
   ```

---

## Production Deployment

### Deploy to Production

```bash
# Deploy to prod environment
sam deploy --config-env prod

# Or manually
sam deploy \
  --stack-name janvani-bharat-prod \
  --parameter-overrides Environment=prod \
  --no-confirm-changeset
```

### Production Checklist

- [ ] Enable API Gateway API keys
- [ ] Set up custom domain
- [ ] Enable AWS WAF
- [ ] Configure CloudFront CDN
- [ ] Set up backup for DynamoDB
- [ ] Enable X-Ray tracing
- [ ] Configure auto-scaling
- [ ] Set up monitoring alerts
- [ ] Enable AWS Secrets Manager
- [ ] Configure VPC (if needed)

---

## Troubleshooting

### Issue: Deployment Fails

```bash
# Check CloudFormation events
aws cloudformation describe-stack-events \
  --stack-name janvani-bharat-dev \
  --max-items 20

# Validate template
sam validate

# Check IAM permissions
aws iam get-user
```

### Issue: Lambda Function Errors

```bash
# View recent logs
aws logs tail /aws/lambda/dev-janvani-schemes --follow

# Invoke function directly
aws lambda invoke \
  --function-name dev-janvani-schemes \
  --payload '{"httpMethod":"GET","path":"/schemes"}' \
  response.json
```

### Issue: DynamoDB Access Denied

Check IAM role permissions:
```bash
aws iam get-role-policy \
  --role-name janvani-bharat-dev-SchemesFunctionRole-XXX \
  --policy-name DynamoDBCrudPolicy
```

### Issue: Bedrock Access Denied

1. Verify model access in Bedrock console
2. Check IAM permissions for `bedrock:InvokeModel`
3. Ensure using correct model ID: `us.amazon.nova-lite-v1:0`

---

## Cleanup

### Delete All Resources

```bash
# Delete the stack
sam delete --stack-name janvani-bharat-dev

# Confirm deletion
Are you sure you want to delete the stack janvani-bharat-dev in the region us-east-1? [y/N]: y
```

This will delete:
- All Lambda functions
- API Gateway
- DynamoDB table (and all data!)
- CloudWatch log groups
- IAM roles

---

## Next Steps

1. ✅ Deploy to AWS Lambda
2. ✅ Test all endpoints
3. ✅ Configure frontend
4. ✅ Set up monitoring
5. 🔄 Deploy frontend to Vercel/Netlify
6. 🔄 Set up custom domain
7. 🔄 Enable production security
8. 🔄 Configure CI/CD pipeline

---

## 📚 Additional Resources

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)

---

**🎉 Congratulations! Your backend is now serverless on AWS Lambda!**
