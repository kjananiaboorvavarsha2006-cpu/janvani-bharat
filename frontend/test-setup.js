#!/usr/bin/env node

/**
 * Pre-deployment Test Script
 * Verifies all files and configurations are correct
 */

import { existsSync } from 'fs';
import { readFileSync } from 'fs';
import { join } from 'path';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(path, description) {
  if (existsSync(path)) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description} - MISSING`, 'red');
    return false;
  }
}

function checkPackageJson() {
  try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    
    log('\n📦 Checking package.json...', 'blue');
    
    const requiredDeps = [
      '@aws-sdk/client-bedrock-runtime',
      '@aws-sdk/client-dynamodb',
      '@aws-sdk/client-polly',
      '@aws-sdk/client-translate',
      'express',
      'axios',
      'react',
      'react-leaflet',
      'leaflet'
    ];
    
    let allPresent = true;
    requiredDeps.forEach(dep => {
      if (pkg.dependencies[dep]) {
        log(`  ✅ ${dep}`, 'green');
      } else {
        log(`  ❌ ${dep} - MISSING`, 'red');
        allPresent = false;
      }
    });
    
    return allPresent;
  } catch (error) {
    log('❌ Error reading package.json', 'red');
    return false;
  }
}

function checkEnvFiles() {
  log('\n🔧 Checking environment files...', 'blue');
  
  const envExample = checkFile('.env.example', '.env.example exists');
  const envLocalExample = checkFile('.env.local.example', '.env.local.example exists');
  
  if (existsSync('.env')) {
    log('✅ .env exists', 'green');
  } else {
    log('⚠️  .env not found - will be created from example', 'yellow');
  }
  
  if (existsSync('.env.local')) {
    log('✅ .env.local exists', 'green');
  } else {
    log('⚠️  .env.local not found - will be created from example', 'yellow');
  }
  
  return envExample && envLocalExample;
}

function checkServerFiles() {
  log('\n🖥️  Checking server files...', 'blue');
  
  const files = [
    ['server/index.js', 'Server entry point'],
    ['server/config/aws.js', 'AWS configuration'],
    ['server/routes/chat.js', 'Chat route'],
    ['server/routes/schemes.js', 'Schemes route'],
    ['server/routes/eligibility.js', 'Eligibility route'],
    ['server/routes/voice.js', 'Voice route'],
    ['server/scripts/setupDynamoDB.js', 'DynamoDB setup script']
  ];
  
  return files.every(([path, desc]) => checkFile(path, desc));
}

function checkFrontendFiles() {
  log('\n⚛️  Checking frontend files...', 'blue');
  
  const files = [
    ['src/App.tsx', 'App component'],
    ['src/main.tsx', 'Main entry'],
    ['src/components/Chatbot.tsx', 'Chatbot component'],
    ['src/components/SchemeMap.tsx', 'Map component'],
    ['src/components/LanguageSelector.tsx', 'Language selector'],
    ['src/pages/LandingPage.tsx', 'Landing page'],
    ['src/pages/EligibilityForm.tsx', 'Eligibility form'],
    ['src/pages/ResultsDashboard.tsx', 'Results dashboard'],
    ['src/lib/schemes.ts', 'Schemes library']
  ];
  
  return files.every(([path, desc]) => checkFile(path, desc));
}

function checkConfigFiles() {
  log('\n⚙️  Checking configuration files...', 'blue');
  
  const files = [
    ['vite.config.ts', 'Vite config'],
    ['tailwind.config.ts', 'Tailwind config'],
    ['tsconfig.json', 'TypeScript config'],
    ['package.json', 'Package config']
  ];
  
  return files.every(([path, desc]) => checkFile(path, desc));
}

function checkDocumentation() {
  log('\n📚 Checking documentation...', 'blue');
  
  const files = [
    ['README.md', 'Main README'],
    ['GETTING_STARTED.md', 'Getting started guide'],
    ['QUICKSTART.md', 'Quick start guide'],
    ['INSTALLATION.md', 'Installation guide'],
    ['README_SETUP.md', 'Setup guide'],
    ['PROJECT_STRUCTURE.md', 'Project structure'],
    ['IMPLEMENTATION_SUMMARY.md', 'Implementation summary'],
    ['PRE_DEPLOYMENT_CHECKLIST.md', 'Deployment checklist']
  ];
  
  return files.every(([path, desc]) => checkFile(path, desc));
}

async function main() {
  log('\n🚀 JanVani Bharat - Pre-Deployment Check\n', 'blue');
  log('='.repeat(50), 'blue');
  
  const checks = [
    checkPackageJson(),
    checkEnvFiles(),
    checkServerFiles(),
    checkFrontendFiles(),
    checkConfigFiles(),
    checkDocumentation()
  ];
  
  log('\n' + '='.repeat(50), 'blue');
  
  if (checks.every(check => check)) {
    log('\n✅ All checks passed! Ready to deploy! 🎉', 'green');
    log('\nNext steps:', 'blue');
    log('1. Run: npm install', 'yellow');
    log('2. Run: npm run dev:all', 'yellow');
    log('3. Open: http://localhost:8080', 'yellow');
    return 0;
  } else {
    log('\n❌ Some checks failed. Please fix the issues above.', 'red');
    return 1;
  }
}

main().then(code => process.exit(code));
