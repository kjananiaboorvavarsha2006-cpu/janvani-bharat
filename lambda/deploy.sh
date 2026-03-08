#!/bin/bash

# JanVani Bharat - Lambda Deployment Script
# This script deploys the serverless backend to AWS

set -e

echo "🚀 JanVani Bharat - Lambda Deployment"
echo "======================================"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    echo "   Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    echo "❌ AWS SAM CLI is not installed. Please install it first."
    echo "   Visit: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html"
    exit 1
fi

# Check AWS credentials
echo "📋 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure'"
    exit 1
fi

echo "✅ AWS credentials found"

# Get AWS account info
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region || echo "us-east-1")

echo "📍 AWS Account: $AWS_ACCOUNT_ID"
echo "📍 AWS Region: $AWS_REGION"

# Install dependencies
echo ""
echo "📦 Installing Lambda dependencies..."
cd "$(dirname "$0")"
npm install

# Validate SAM template
echo ""
echo "✅ Validating SAM template..."
sam validate

# Build the application
echo ""
echo "🔨 Building Lambda functions..."
sam build

# Deploy
echo ""
echo "🚀 Deploying to AWS..."
echo ""
echo "Choose deployment option:"
echo "1) Guided deployment (first time)"
echo "2) Quick deployment (using saved config)"
echo "3) Production deployment"
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo "Starting guided deployment..."
        sam deploy --guided
        ;;
    2)
        echo "Starting quick deployment..."
        sam deploy
        ;;
    3)
        echo "Starting production deployment..."
        sam deploy --config-env prod
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

# Get API endpoint
echo ""
echo "📊 Deployment complete!"
echo ""
echo "Getting API endpoint..."
API_ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name janvani-bharat-stack \
    --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
    --output text 2>/dev/null || echo "Not found")

if [ "$API_ENDPOINT" != "Not found" ]; then
    echo ""
    echo "✅ API Endpoint: $API_ENDPOINT"
    echo ""
    echo "📝 Update your frontend .env.local file:"
    echo "   VITE_API_URL=$API_ENDPOINT"
    echo ""
    echo "🧪 Test endpoints:"
    echo "   GET  $API_ENDPOINT/schemes"
    echo "   POST $API_ENDPOINT/schemes/eligible"
    echo "   POST $API_ENDPOINT/chat"
    echo "   POST $API_ENDPOINT/voice/synthesize"
else
    echo "⚠️  Could not retrieve API endpoint. Check AWS Console."
fi

echo ""
echo "🎉 Deployment successful!"
