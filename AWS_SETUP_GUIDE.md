# AWS Setup Guide for JanVani Bharat

This guide will help you set up all required AWS services for the application.

## Required AWS Services

- **Amazon Bedrock** (Nova Lite) - AI chatbot
- **Amazon Translate** - Multilingual support
- **Amazon Transcribe** - Voice to text
- **Amazon Polly** - Text to speech
- **Amazon DynamoDB** - Database
- **Amazon S3** - File storage (optional)

## Step 1: Create AWS Account

1. Go to https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Follow the registration process

## Step 2: Create IAM User with Permissions

### 2.1 Create IAM User

1. Go to AWS Console → IAM → Users
2. Click "Create user"
3. Enter username: `janvani-bharat-app`
4. Click "Next"

### 2.2 Attach Permissions

Attach these policies to the user:

```
- AmazonBedrockFullAccess
- TranslateFullAccess
- AmazonTranscribeFullAccess
- AmazonPollyFullAccess
- AmazonDynamoDBFullAccess
- AmazonS3FullAccess (optional)
```

Or create a custom policy with minimal permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "translate:TranslateText",
        "transcribe:StartTranscriptionJob",
        "transcribe:GetTranscriptionJob",
        "polly:SynthesizeSpeech",
        "dynamodb:*",
        "s3:*"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2.3 Create Access Keys

1. Select the user you created
2. Go to "Security credentials" tab
3. Scroll to "Access keys"
4. Click "Create access key"
5. Select "Application running outside AWS"
6. Click "Next" → "Create access key"
7. **IMPORTANT**: Copy both:
   - Access Key ID
   - Secret Access Key
   (You won't be able to see the secret key again!)

## Step 3: Enable Amazon Bedrock

### 3.1 Request Model Access

1. Go to AWS Console → Amazon Bedrock
2. Click "Model access" in left sidebar
3. Click "Manage model access"
4. Find "Nova Lite" and enable it
5. Click "Request model access"
6. Wait for approval (usually instant)

**Note**: Bedrock is available in specific regions:
- us-east-1 (N. Virginia)
- us-west-2 (Oregon)
- eu-west-1 (Ireland)

## Step 4: Create DynamoDB Table

### Option A: Using AWS Console

1. Go to AWS Console → DynamoDB
2. Click "Create table"
3. Table name: `schemes`
4. Partition key: `schemeId` (String)
5. Leave other settings as default
6. Click "Create table"

### Option B: Using Setup Script

```bash
cd backend
npm run setup:db
```

## Step 5: Configure Backend Environment

Edit `backend/.env`:

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# DynamoDB Table
DYNAMODB_TABLE_NAME=schemes

# Server Configuration
PORT=3001
```

Replace with your actual credentials from Step 2.3.

## Step 6: Test the Setup

### 6.1 Test Backend Connection

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3001
✅ DynamoDB connected successfully
```

### 6.2 Test API Endpoints

```bash
# Health check
curl http://localhost:3001/health

# Get schemes
curl http://localhost:3001/api/schemes
```

## Step 7: Run Full Application

```bash
# From root directory
npm run dev:all
```

Access:
- Frontend: http://localhost:8080
- Backend: http://localhost:3001

## Troubleshooting

### Error: "Resolved credential object is not valid"

**Solution**: Check your AWS credentials in `backend/.env`
- Ensure no extra spaces
- Ensure credentials are valid
- Try regenerating access keys

### Error: "Region is missing"

**Solution**: Add `AWS_REGION=us-east-1` to `backend/.env`

### Error: "Access Denied" for Bedrock

**Solution**: 
1. Check if Nova Lite model is enabled in Bedrock console
2. Verify IAM user has Bedrock permissions
3. Ensure you're using a supported region

### Error: "Table does not exist"

**Solution**: Run `npm run setup:db` from backend directory

## Cost Estimation

**Free Tier Eligible Services:**
- DynamoDB: 25 GB storage, 25 read/write capacity units
- Lambda: 1M requests/month
- S3: 5 GB storage, 20,000 GET requests

**Pay-as-you-go:**
- Bedrock Nova Lite: ~$0.0008 per 1K input tokens
- Translate: $15 per million characters
- Polly: $4 per million characters
- Transcribe: $0.024 per minute

**Estimated monthly cost for moderate usage**: $5-20

## Security Best Practices

1. **Never commit credentials** to Git
2. **Use IAM roles** when deploying to AWS (EC2, Lambda)
3. **Rotate access keys** regularly
4. **Enable MFA** on AWS account
5. **Use least privilege** IAM policies
6. **Monitor usage** with AWS CloudWatch

## Next Steps

1. ✅ Set up AWS credentials
2. ✅ Enable Bedrock model access
3. ✅ Create DynamoDB table
4. ✅ Test backend connection
5. ✅ Run full application
6. 🚀 Deploy to production (see DEPLOYMENT.md)

## Support

- AWS Documentation: https://docs.aws.amazon.com/
- Bedrock Guide: https://docs.aws.amazon.com/bedrock/
- DynamoDB Guide: https://docs.aws.amazon.com/dynamodb/

---

**Need help?** Check the troubleshooting section or review AWS service quotas in your account.
