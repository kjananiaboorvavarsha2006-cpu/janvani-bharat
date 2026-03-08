# 🚀 Getting Started - JanVani Bharat

## Quick Installation (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment Files

**Backend (.env):**
```bash
cat > .env << 'EOF'
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=dummy
AWS_SECRET_ACCESS_KEY=dummy
DYNAMODB_TABLE_NAME=schemes
PORT=3001
EOF
```

**Frontend (.env.local):**
```bash
cat > .env.local << 'EOF'
VITE_API_URL=http://localhost:3001
EOF
```

### Step 3: Run the Application
```bash
npm run dev:all
```

### Step 4: Open in Browser
```
http://localhost:8080
```

## ✅ You're Done!

The application is now running with:
- ✅ Landing page
- ✅ Eligibility form
- ✅ Results dashboard
- ✅ Interactive map
- ✅ UI components

## 🔧 Enable AI Features (Optional)

To enable the AI chatbot and AWS features:

### 1. Get AWS Credentials
- Create AWS account at [aws.amazon.com](https://aws.amazon.com)
- Create IAM user with Bedrock, Translate, Polly, DynamoDB permissions
- Save Access Key ID and Secret Access Key

### 2. Update .env File
```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_ACTUAL_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_ACTUAL_SECRET_HERE
DYNAMODB_TABLE_NAME=schemes
PORT=3001
```

### 3. Enable Bedrock Model
- Go to AWS Bedrock Console
- Click "Model access"
- Enable "Amazon Nova Lite"

### 4. Setup Database
```bash
npm run setup:db
```

### 5. Restart Application
```bash
npm run dev:all
```

## 🎯 Test Features

### Without AWS (Works Immediately)
- ✅ Browse landing page
- ✅ Fill eligibility form
- ✅ View results with mock data
- ✅ Explore interactive map
- ✅ Test UI components

### With AWS (After Setup)
- ✅ Chat with AI assistant
- ✅ Get scheme recommendations
- ✅ Use voice input
- ✅ Listen to responses
- ✅ Switch languages
- ✅ Real-time translation

## 📚 Documentation

- **[README.md](README.md)** - Main overview
- **[QUICKSTART.md](QUICKSTART.md)** - Detailed quick start
- **[INSTALLATION.md](INSTALLATION.md)** - Step-by-step installation
- **[README_SETUP.md](README_SETUP.md)** - Complete AWS setup
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Code architecture
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What's included

## 🐛 Common Issues

### Port Already in Use
```bash
# Change port in .env
PORT=3002
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend Won't Start
```bash
# Check .env file exists
ls -la .env

# Verify Node.js version
node --version  # Should be 18+
```

## 💡 Pro Tips

1. **Start without AWS** to test UI first
2. **Read error messages** in console
3. **Check both terminals** (frontend & backend)
4. **Use Chrome/Edge** for best compatibility
5. **Enable microphone** for voice features

## 🎉 Success Indicators

You'll know it's working when you see:

**Terminal:**
```
[0] VITE v5.4.19  ready in 1234 ms
[0] ➜  Local:   http://localhost:8080/
[1] 🚀 Server running on http://localhost:3001
```

**Browser:**
- Landing page loads with hero image
- Navigation works
- Forms are interactive
- Map displays
- Chatbot button appears

## 📞 Need Help?

1. Check console logs (F12 in browser)
2. Review terminal output
3. Read documentation files
4. Verify environment variables
5. Test API endpoints with curl

## 🎓 Next Steps

1. ✅ Explore all pages
2. ✅ Test eligibility checker
3. ✅ Try different user profiles
4. ✅ Setup AWS for AI features
5. ✅ Customize schemes
6. ✅ Deploy to production

---

**Happy coding! 🚀**

For detailed instructions, see [INSTALLATION.md](INSTALLATION.md)
