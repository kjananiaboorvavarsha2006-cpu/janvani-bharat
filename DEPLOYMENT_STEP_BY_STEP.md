# 🚀 JanVani Bharat - Step-by-Step Deployment Guide

Complete deployment guide from start to finish.

---

## 📋 What You'll Deploy

- ✅ Backend API → AWS Lambda (Serverless)
- ✅ Frontend Website → Vercel (Free hosting)
- ✅ Database → DynamoDB (AWS)
- ✅ AI Services → Bedrock, Translate, Polly

**Estimated Time:** 30-45 minutes  
**Cost:** Free tier / ~$3-5 per month after

---

## Part 1: Prerequisites (10 minutes)

### Step 1.1: Install AWS CLI

**Windows:**
1. Download: https://awscli.amazonaws.com/AWSCLIV2.msi
2. Run the installer
3. Click "Next" → "Next" → "Install"
4. Open new PowerShell and verify:
```powershell
aws --version
```
Should show: `aws-cli/2.x.x`

**Mac:**
```bash
brew install awscli
aws --version
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

### Step 1.2: Install SAM CLI

**Windows:**
1. Download: https://github.com/aws/aws-sam-cli/releases/latest/download/AWS_SAM_CLI_64_PY3.msi
2. Run the installer
3. Verify:
```powershell
sam --version
```

**Mac:**
```bash
brew install aws-sam-cli
sam --version
```

**Linux:**
```bash
pip install aws-sam-cli
sam --version
```

### Step 1.3: Create GitHub Account (if you don't have one)
1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process

### Step 1.4: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

✅ **Checkpoint:** You should have AWS CLI, SAM CLI, GitHub account, and Vercel account ready.

---

## Part 2: AWS Account Setup (15 minutes)

### Step 2.1: Create AWS Account
1. Go to https://aws.amazon.com
2. Click "Create an AWS Account"
3. Enter email address
4. Choose account name: `janvani-bharat`
5. Enter password
6. Click "Continue"
7. Fill in contact information
8. Enter credit/debit card (required, but we'll use free tier)
9. Verify phone number
10. Choose "Basic Support - Free"
11. Complete sign-up

### Step 2.2: Sign in to AWS Console
1. Go to https://console.aws.amazon.com
2. Sign in with your email and password
3. You should see the AWS Management Console

### Step 2.3: Enable Bedrock Model
1. In the search bar at top, type: **Bedrock**
2. Click "Amazon Bedrock"
3. **Check region** (top-right corner) - should be **"N. Virginia"** (us-east-1)
   - If not, click region dropdown → Select "US East (N. Virginia)"
4. In left sidebar, click **"Model access"**
5. Click orange button **"Manage model access"**
6. Find **"Amazon Nova Lite"** in the list
7. Check the checkbox next to it
8. Click **"Request model access"** at bottom
9. Wait 1-2 minutes
10. Refresh page - should show "Access granted" ✅

### Step 2.4: Create IAM User
1. In search bar, type: **IAM**
2. Click "IAM"
3. Click **"Users"** in left sidebar
4. Click **"Create user"** button
5. Username: `janvani-bharat-deployer`
6. Click **"Next"**
7. Select **"Attach policies directly"**
8. Search and check these policies:
   - `AdministratorAccess` (easiest for deployment)
   - OR individually: `AmazonBedrockFullAccess`, `AWSLambda_FullAccess`, `AmazonDynamoDBFullAccess`, `AmazonAPIGatewayAdministrator`, `CloudFormationFullAccess`
9. Click **"Next"**
10. Click **"Create user"**

### Step 2.5: Create Access Keys
1. Click on the user you just created
2. Click **"Security credentials"** tab
3. Scroll to **"Access keys"** section
4. Click **"Create access key"**
5. Select **"Command Line Interface (CLI)"**
6. Check "I understand" checkbox
7. Click **"Next"**
8. Description: `JanVani Deployment`
9. Click **"Create access key"**
10. **IMPORTANT:** Copy both:
    - Access Key ID (starts with AKIA...)
    - Secret Access Key (long string)
11. Click **"Download .csv file"** (save it safely!)
12. Click **"Done"**

### Step 2.6: Configure AWS CLI
Open PowerShell/Terminal and run:
```bash
aws configure
```

Enter when prompted:
```
AWS Access Key ID: [Paste your Access Key ID]
AWS Secret Access Key: [Paste your Secret Access Key]
Default region name: us-east-1
Default output format: json
```

Verify it works:
```bash
aws sts get-caller-identity
```

Should show your account info ✅

✅ **Checkpoint:** AWS account created, Bedrock enabled, IAM user created, AWS CLI configured.

---

## Part 3: Deploy Backend to AWS Lambda (10 minutes)

### Step 3.1: Navigate to Lambda Folder
```bash
cd lambda
```

### Step 3.2: Install Dependencies
```bash
npm install
```

### Step 3.3: Build the Application
```bash
sam build
```

You should see:
```
Build Succeeded
Built Artifacts  : .aws-sam/build
```

### Step 3.4: Deploy to AWS
```bash
sam deploy --guided
```

Answer the prompts:

**Question 1:** Stack Name  
**Answer:** `janvani-bharat-prod`

**Question 2:** AWS Region  
**Answer:** `us-east-1`

**Question 3:** Parameter Environment  
**Answer:** `prod`

**Question 4:** Confirm changes before deploy  
**Answer:** `Y`

**Question 5:** Allow SAM CLI IAM role creation  
**Answer:** `Y`

**Question 6:** Disable rollback  
**Answer:** `N`

**Question 7:** SchemesFunction has no authentication  
**Answer:** `y` (press y for all functions)

**Question 8:** Save arguments to configuration file  
**Answer:** `Y`

**Question 9:** SAM configuration file  
**Answer:** `samconfig.toml` (press Enter)

**Question 10:** SAM configuration environment  
**Answer:** `default` (press Enter)

Wait 3-5 minutes for deployment...

### Step 3.5: Get Your API URL
After deployment completes, look for output like:
```
Key: ApiEndpoint
Value: https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod
```

**Copy this URL!** You'll need it later.

Or run:
```bash
aws cloudformation describe-stacks --stack-name janvani-bharat-prod --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' --output text
```

### Step 3.6: Seed the Database
```bash
aws lambda invoke --function-name prod-janvani-db-seeder --region us-east-1 response.json
```

Check the response:
```bash
cat response.json
```

Should show:
```json
{"statusCode":200,"body":"{\"message\":\"Database seeded successfully\",\"count\":8}"}
```

### Step 3.7: Test the API
Open your browser and go to:
```
https://YOUR-API-URL/schemes
```

You should see JSON data with government schemes ✅

✅ **Checkpoint:** Backend deployed to Lambda, database seeded, API working.

---

## Part 4: Deploy Frontend to Vercel (10 minutes)

### Step 4.1: Update Frontend Environment Variable
Edit `frontend/.env.local`:
```env
VITE_API_URL=https://YOUR-API-URL-FROM-STEP-3-5
```

Replace `YOUR-API-URL-FROM-STEP-3-5` with your actual Lambda API URL.

### Step 4.2: Test Locally (Optional)
```bash
cd frontend
npm install
npm run build
npm run preview
```

Open http://localhost:4173 to test.

### Step 4.3: Push to GitHub

**Initialize Git (if not already done):**
```bash
cd ..  # Go back to project root
git init
git add .
git commit -m "Initial commit - JanVani Bharat"
```

**Create GitHub Repository:**
1. Go to https://github.com/new
2. Repository name: `janvani-bharat`
3. Description: `AI-powered government scheme discovery platform`
4. Choose "Public" or "Private"
5. Click "Create repository"

**Push your code:**
```bash
git remote add origin https://github.com/YOUR-USERNAME/janvani-bharat.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 4.4: Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your `janvani-bharat` repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Environment Variables"**
6. Add variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://YOUR-LAMBDA-API-URL` (from Step 3.5)
7. Click **"Deploy"**

Wait 2-3 minutes...

### Step 4.5: Get Your Website URL
After deployment:
- You'll see: `https://janvani-bharat.vercel.app` (or similar)
- Click "Visit" to open your live website!

✅ **Checkpoint:** Frontend deployed to Vercel, website is live!

---

## Part 5: Final Testing (5 minutes)

### Step 5.1: Test Your Live Website
1. Open your Vercel URL: `https://janvani-bharat.vercel.app`
2. Click **"Check Eligibility"** button
3. Fill the form and submit
4. Check if results load ✅

### Step 5.2: Test Chatbot
1. Click the chatbot button (bottom-right)
2. Ask: "Tell me about PM Kisan"
3. Should get AI response ✅

### Step 5.3: Test Map
1. Go back to homepage
2. Scroll to the map section
3. Click on a state
4. Should show schemes for that state ✅

---

## 🎉 Congratulations! Your Project is Live!

**Your URLs:**
- Frontend: `https://janvani-bharat.vercel.app`
- Backend API: `https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod`

---

## 📊 Monitor Your Deployment

### View Lambda Logs
```bash
sam logs -n SchemesFunction --stack-name janvani-bharat-prod --tail
```

### View All Resources
Go to AWS Console → CloudFormation → Stacks → `janvani-bharat-prod`

### Check Costs
Go to AWS Console → Billing Dashboard

---

## 🔄 Update Your Deployment

### Update Backend:
```bash
cd lambda
sam build
sam deploy
```

### Update Frontend:
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel will auto-deploy!

---

## 🗑️ Delete Everything (if needed)

### Delete Backend:
```bash
sam delete --stack-name janvani-bharat-prod
```

### Delete Frontend:
1. Go to Vercel dashboard
2. Select project → Settings → Delete

---

## ❓ Troubleshooting

**Problem:** `sam: command not found`  
**Solution:** Reinstall SAM CLI, restart terminal

**Problem:** `Access Denied` errors  
**Solution:** Check IAM user has correct permissions

**Problem:** Frontend can't connect to backend  
**Solution:** Check `VITE_API_URL` in Vercel environment variables

**Problem:** Chatbot not working  
**Solution:** Check Bedrock model access is enabled

---

## 📞 Need Help?

- AWS Documentation: https://docs.aws.amazon.com/
- Vercel Documentation: https://vercel.com/docs
- Check `AWS_LAMBDA_DEPLOYMENT.md` for detailed Lambda guide
- Check `AWS_SETUP_GUIDE.md` for AWS services setup

---

**🎊 Your project is now live and accessible to anyone on the internet!**
