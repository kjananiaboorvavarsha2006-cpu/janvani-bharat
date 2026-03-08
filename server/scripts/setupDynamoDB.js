import { DynamoDBClient, CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../config/aws.js';
import dotenv from 'dotenv';

dotenv.config();

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE_NAME = 'schemes';

const sampleSchemes = [
  {
    schemeId: 'pm-kisan',
    schemeName: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    description: 'Income support of ₹6,000 per year to farmer families for purchasing farm inputs.',
    benefits: '₹6,000 per year in 3 installments of ₹2,000 each, directly to bank account',
    eligibility: 'Small and marginal farmer families',
    state: 'All India',
    applySteps: '1. Visit pmkisan.gov.in 2. Register with Aadhaar 3. Fill application form 4. Submit bank details',
    officialLink: 'https://pmkisan.gov.in'
  },
  {
    schemeId: 'ayushman-bharat',
    schemeName: 'Ayushman Bharat (PMJAY)',
    category: 'Health',
    description: 'Health insurance cover of ₹5 lakh per family per year for secondary and tertiary hospitalization.',
    benefits: '₹5 lakh health coverage per family per year, cashless treatment at empaneled hospitals',
    eligibility: 'Economically weaker families as per SECC database',
    state: 'All India',
    applySteps: '1. Check eligibility at pmjay.gov.in 2. Visit nearest Ayushman Mitra 3. Get Ayushman card 4. Use at empaneled hospitals',
    officialLink: 'https://pmjay.gov.in'
  },
  {
    schemeId: 'pm-awas',
    schemeName: 'PM Awas Yojana',
    category: 'Housing',
    description: 'Financial assistance for construction of pucca houses for eligible families.',
    benefits: 'Subsidy up to ₹2.67 lakh for house construction, interest subsidy on home loans',
    eligibility: 'Homeless or living in kutcha/dilapidated houses, EWS/LIG categories',
    state: 'All India',
    applySteps: '1. Visit pmaymis.gov.in 2. Apply online with Aadhaar 3. Submit income proof 4. Get approval',
    officialLink: 'https://pmaymis.gov.in'
  },
  {
    schemeId: 'startup-india',
    schemeName: 'Startup India',
    category: 'Business',
    description: 'Support and incentives for startups including tax benefits and easier compliance.',
    benefits: 'Tax exemption for 3 years, self-certification for compliance, patent fee reduction, funding support',
    eligibility: 'Entrepreneurs and startup founders with innovative business ideas',
    state: 'All India',
    applySteps: '1. Register at startupindia.gov.in 2. Get DPIIT recognition certificate 3. Apply for benefits',
    officialLink: 'https://www.startupindia.gov.in'
  },
  {
    schemeId: 'skill-india',
    schemeName: 'Skill India (PMKVY)',
    category: 'Education',
    description: 'Free skill training and certification to enable youth to earn a livelihood.',
    benefits: 'Free training, certification, placement assistance, ₹8,000 reward on certification',
    eligibility: 'Youth aged 15-45 seeking skill development',
    state: 'All India',
    applySteps: '1. Visit pmkvyofficial.org 2. Find nearest training center 3. Enroll in course 4. Complete training',
    officialLink: 'https://www.pmkvyofficial.org'
  },
  {
    schemeId: 'pm-mudra',
    schemeName: 'PM Mudra Loan Yojana',
    category: 'Finance',
    description: 'Collateral-free loans up to ₹10 lakh for small businesses and entrepreneurs.',
    benefits: 'Loans without collateral: Shishu (up to ₹50K), Kishore (₹50K-₹5L), Tarun (₹5L-₹10L)',
    eligibility: 'Small business owners, entrepreneurs, self-employed individuals',
    state: 'All India',
    applySteps: '1. Visit mudra.org.in 2. Apply at nearest bank/NBFC 3. Submit business plan 4. Get loan approval',
    officialLink: 'https://www.mudra.org.in'
  },
  {
    schemeId: 'pm-ujjwala',
    schemeName: 'PM Ujjwala Yojana',
    category: 'Energy',
    description: 'Free LPG connections to women from BPL households.',
    benefits: 'Free LPG connection, ₹1,600 financial support, first refill and stove free',
    eligibility: 'Women from BPL households',
    state: 'All India',
    applySteps: '1. Visit nearest LPG distributor 2. Submit BPL certificate and ID proof 3. Get free connection',
    officialLink: 'https://www.pmujjwalayojana.com'
  },
  {
    schemeId: 'sukanya-samriddhi',
    schemeName: 'Sukanya Samriddhi Yojana',
    category: 'Savings',
    description: 'Savings scheme for the girl child with attractive interest rates and tax benefits.',
    benefits: 'High interest rate (~8%), tax-free returns under Section 80C, maturity at age 21',
    eligibility: 'Parents/guardians of girl children below 10 years of age',
    state: 'All India',
    applySteps: '1. Visit post office or authorized bank 2. Open account with minimum ₹250 3. Deposit annually',
    officialLink: 'https://www.india.gov.in/sukanya-samriddhi-yojna'
  }
];

async function setupDynamoDB() {
  try {
    console.log('🔍 Checking if table exists...');
    
    // Check if table exists
    const listCommand = new ListTablesCommand({});
    const tables = await dynamoClient.send(listCommand);
    
    if (!tables.TableNames.includes(TABLE_NAME)) {
      console.log('📦 Creating DynamoDB table...');
      
      const createCommand = new CreateTableCommand({
        TableName: TABLE_NAME,
        KeySchema: [
          { AttributeName: 'schemeId', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
          { AttributeName: 'schemeId', AttributeType: 'S' }
        ],
        BillingMode: 'PAY_PER_REQUEST'
      });
      
      await dynamoClient.send(createCommand);
      console.log('✅ Table created successfully!');
      
      // Wait for table to be active
      console.log('⏳ Waiting for table to be active...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    } else {
      console.log('✅ Table already exists!');
    }
    
    // Insert sample data
    console.log('📝 Inserting sample schemes...');
    
    for (const scheme of sampleSchemes) {
      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: scheme
      });
      
      await docClient.send(command);
      console.log(`  ✓ Added: ${scheme.schemeName}`);
    }
    
    console.log('\n🎉 DynamoDB setup complete!');
    console.log(`📊 Total schemes added: ${sampleSchemes.length}`);
    
  } catch (error) {
    console.error('❌ Error setting up DynamoDB:', error);
    process.exit(1);
  }
}

setupDynamoDB();
