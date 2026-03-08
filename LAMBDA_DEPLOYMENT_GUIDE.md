# 🚀 AWS Lambda Deployment Guide - JanVani Bharat

## 📋 Complete Deployment Checklist

This guide will help you deploy the JanVani Bharat backend as serverless AWS Lambda functions.

---

## 🎯 What You'll Deploy

- ✅ 3 Lambda functions (Schemes, Chat, Voice)
- ✅ API Gateway with REST endpoints
- ✅ DynamoDB table for schemes
- ✅ IAM roles and permissions
- ✅ CloudWatch logging

---

## 📦 Prerequisites

### 1. Install Required Tools

#### AWS CLI
```bash
# Windows (PowerShell)
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Mac
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Verify:
```bash
aws --version
# Should show: aws-cli/2.x.x
```

#### AWS SAM CLI
```bash
# Windows (PowerShell)
msiexec.exe /i https://github.com/aws/aws-sam-cli/releases/latest/download/AWS_SAM_CLI_64_PY3.msi

# Mac
brew install aws-sam-cli

# Linux
pip install aws-sam-cli
```

Verify:
```bash
sam --v