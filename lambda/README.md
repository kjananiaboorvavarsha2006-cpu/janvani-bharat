# JanVani Bharat - AWS Lambda Deployment

## 📦 Lambda Functions

This directory contains AWS Lambda functions for the JanVani Bharat backend, ready for serverless deployment.

### Functions Included:

1. **schemes.js** - Scheme operations (GET, filter, search by eligibility)
2. **eligibility.js** - Check user eligibility for schemes
3. **chat.js** - AI chatbot using AWS Bedrock Nova Lite
4. **voice.js** - Text-to-speech using AWS Polly
5. **dbSeeder.js** - Seed DynamoDB with initial scheme data

## 🚀 Quick Deployment

### Prerequisites

1. **AWS CLI** installed and configured
2. **AWS SAM CLI** installed
3. **Node.js 18+** installed
4. **AWS Account** with appropriate permissions

### Install AWS SAM CLI

```bash
# macOS
brew install aws-sam-cli

# Windows (with Chocolatey)
choco install aws-sam-cli

# Linux
pip install aws-sam-cli
```

### Deploy to AWS

```bash
# Navigate to lambda directory
cd lambda

# Install dependencies
npm install

# Deploy with guided setup (first time)
sam deploy --guided

# Or deploy to dev environment
npm run deploy:dev

# Or deploy to production
npm run deploy:prod
```

## 📋 Deployment Steps

### Step 1: Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
```

### Step 2: Build the Application

```bash
sam build
```

### Step 3: Deploy

```bash
# First time deployment (interactive)
sam deploy --guided

# Follow prompts:
# - Stack Name: janvani-bharat-dev
# - AWS Region: us-east-1
# - Parameter Environment: dev
# - Confirm changes: Y
# - Allow SAM CLI IAM role creation: Y
# - Save arguments to config: Y
```

### Step 4: Seed the Database

After deployment, invoke the seeder function:

```bash
aws lambda invoke \
  --function-name dev-janvani-db-seeder \
  --region us-east-1 \
  response.json

cat response.json
```

### Step 5: Get API Endpoint

```bash
aws cloudformation describe-stacks \
  --stack-name janvani-bharat-dev \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
  --output text
```

## 🧪 Local Testing

### Start Local API

```bash
sam local start-api
```

API will be available at: http://localhost:3000

### Test Individual Functions

```bash
# Test schemes function
sam local invoke SchemesFunction -e events/schemes.json

# Test eligibility function
sam local invoke EligibilityFunction -e events/eligibility.json

# Test database seeder
sam local invoke DatabaseSeederFunction
```

### Test with curl

```bash
# Get all schemes
curl http://localhost:3000/schemes

# Get scheme by ID
curl http://localhost:3000/schemes/pm-kisan

# Check eligibility
curl -X POST http://localhost:3000/eligibility \
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

## 📊 API Endpoints

After deployment, your API will have these endpoints:

### Schemes API

```
GET  /schemes                    - Get all schemes
GET  /schemes/{id}               - Get scheme by ID
POST /schemes/eligible           - Get eligible schemes
```

### Eligibility API

```
POST /eligibility                - Check eligibility
```

### Chat API

```
POST /chat                       - AI chatbot
```

### Voice API

```
POST /voice/synthesize           - Text-to-speech
```

## 🔧 Configuration

### Environment Variables

Set in `template.yaml`:

- `DYNAMODB_TABLE_NAME` - DynamoDB table name (auto-configured)
- `AWS_REGION` - AWS region (auto-configured)

### DynamoDB Table

Table name: `{Environment}-schemes`
- dev: `dev-schemes`
- prod: `prod-schemes`

Primary Key: `schemeId` (String)

## 📝 Example Requests

### Get All Schemes

```bash
curl https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/schemes
```

### Get Eligible Schemes

```bash
curl -X POST https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/schemes/eligible \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "income": 200000,
    "occupation": "farmer",
    "state": "Maharashtra",
    "category": "General"
  }'
```

### Chat with AI

```bash
curl -X POST https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about PM Kisan scheme",
    "language": "english"
  }'
```

## 🔍 Monitoring

### View Logs

```bash
# Schemes function logs
sam logs -n SchemesFunction --tail

# Eligibility function logs
sam logs -n EligibilityFunction --tail

# Or use AWS CLI
aws logs tail /aws/lambda/dev-janvani-schemes --follow
```

### CloudWatch Metrics

View metrics in AWS Console:
- Lambda → Functions → Select function → Monitoring

## 🗑️ Cleanup

To delete all resources:

```bash
sam delete --stack-name janvani-bharat-dev
```

## 💰 Cost Estimation

### Free Tier (First 12 months)
- Lambda: 1M requests/month free
- DynamoDB: 25 GB storage free
- API Gateway: 1M requests/month free

### After Free Tier
- Lambda: ~$0.20 per 1M requests
- DynamoDB: Pay per request (~$1.25 per million writes)
- API Gateway: ~$3.50 per million requests

**Estimated monthly cost for low traffic: $5-10**

## 🔒 Security

### IAM Permissions Required

The Lambda functions need:
- DynamoDB: Read/Write access
- Bedrock: InvokeModel permission
- Translate: TranslateText permission
- Polly: SynthesizeSpeech permission

These are automatically configured in `template.yaml`.

### API Security

- CORS enabled for all origins (configure in production)
- No API key required (add in production)
- Consider adding AWS WAF for production

## 🚀 Production Deployment

### Best Practices

1. **Use separate environments**
   ```bash
   sam deploy --config-env prod
   ```

2. **Enable API Gateway caching**
   - Reduces Lambda invocations
   - Improves response time

3. **Set up CloudWatch Alarms**
   - Monitor error rates
   - Track latency

4. **Enable X-Ray tracing**
   - Debug performance issues
   - Trace requests

5. **Use AWS Secrets Manager**
   - Store API keys securely
   - Rotate credentials

## 📚 Additional Resources

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)

## 🐛 Troubleshooting

### Issue: Deployment fails

```bash
# Check AWS credentials
aws sts get-caller-identity

# Validate template
sam validate

# Check CloudFormation events
aws cloudformation describe-stack-events --stack-name janvani-bharat-dev
```

### Issue: Function timeout

Increase timeout in `template.yaml`:
```yaml
Timeout: 60  # seconds
```

### Issue: DynamoDB access denied

Check IAM policies in `template.yaml` under `Policies`.

---

**Ready to deploy!** Run `sam deploy --guided` to get started.
