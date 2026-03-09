import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'schemes';

const sampleSchemes = [
  {
    schemeId: 'pm-kisan',
    schemeName: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    description: 'Income support of ₹6,000 per year to farmer families for purchasing farm inputs.',
    benefits: '₹6,000 per year in 3 installments of ₹2,000 each, directly to bank account',
    eligibility: 'Small and marginal farmer families',
    state: 'All India',
    applySteps: '1. Visit pmkisan.gov.in\n2. Register with Aadhaar\n3. Fill application form\n4. Submit bank details',
    officialLink: 'https://pmkisan.gov.in',
    icon: '🌾',
    tags: ['agriculture', 'farmer', 'income-support']
  },
  {
    schemeId: 'ayushman-bharat',
    schemeName: 'Ayushman Bharat (PMJAY)',
    category: 'Health',
    description: 'Health insurance cover of ₹5 lakh per family per year for secondary and tertiary hospitalization.',
    benefits: '₹5 lakh health coverage per family per year, cashless treatment at empaneled hospitals',
    eligibility: 'Economically weaker families as per SECC database',
    state: 'All India',
    applySteps: '1. Check eligibility at pmjay.gov.in\n2. Visit nearest Ayushman Mitra\n3. Get Ayushman card\n4. Use at empaneled hospitals',
    officialLink: 'https://pmjay.gov.in',
    icon: '🏥',
    tags: ['health', 'insurance', 'medical']
  },
  {
    schemeId: 'pm-awas',
    schemeName: 'PM Awas Yojana',
    category: 'Housing',
    description: 'Financial assistance for construction of pucca houses for eligible families.',
    benefits: 'Subsidy up to ₹2.67 lakh for house construction, interest subsidy on home loans',
    eligibility: 'Homeless or living in kutcha/dilapidated houses, EWS/LIG categories',
    state: 'All India',
    applySteps: '1. Visit pmaymis.gov.in\n2. Apply online with Aadhaar\n3. Submit income proof\n4. Get approval',
    officialLink: 'https://pmaymis.gov.in',
    icon: '🏠',
    tags: ['housing', 'subsidy', 'home-loan']
  },
  {
    schemeId: 'startup-india',
    schemeName: 'Startup India',
    category: 'Business',
    description: 'Support and incentives for startups including tax benefits and easier compliance.',
    benefits: 'Tax exemption for 3 years, self-certification for compliance, patent fee reduction, funding support',
    eligibility: 'Entrepreneurs and startup founders with innovative business ideas',
    state: 'All India',
    applySteps: '1. Register at startupindia.gov.in\n2. Get DPIIT recognition certificate\n3. Apply for benefits',
    officialLink: 'https://www.startupindia.gov.in',
    icon: '🚀',
    tags: ['business', 'startup', 'entrepreneurship']
  },
  {
    schemeId: 'skill-india',
    schemeName: 'Skill India (PMKVY)',
    category: 'Education',
    description: 'Free skill training and certification to enable youth to earn a livelihood.',
    benefits: 'Free training, certification, placement assistance, ₹8,000 reward on certification',
    eligibility: 'Youth aged 15-45 seeking skill development',
    state: 'All India',
    applySteps: '1. Visit pmkvyofficial.org\n2. Find nearest training center\n3. Enroll in course\n4. Complete training',
    officialLink: 'https://www.pmkvyofficial.org',
    icon: '🎓',
    tags: ['education', 'skill-development', 'training']
  },
  {
    schemeId: 'pm-mudra',
    schemeName: 'PM Mudra Loan Yojana',
    category: 'Finance',
    description: 'Collateral-free loans up to ₹10 lakh for small businesses and entrepreneurs.',
    benefits: 'Loans without collateral: Shishu (up to ₹50K), Kishore (₹50K-₹5L), Tarun (₹5L-₹10L)',
    eligibility: 'Small business owners, entrepreneurs, self-employed individuals',
    state: 'All India',
    applySteps: '1. Visit mudra.org.in\n2. Apply at nearest bank/NBFC\n3. Submit business plan\n4. Get loan approval',
    officialLink: 'https://www.mudra.org.in',
    icon: '💰',
    tags: ['finance', 'loan', 'business']
  },
  {
    schemeId: 'pm-ujjwala',
    schemeName: 'PM Ujjwala Yojana',
    category: 'Energy',
    description: 'Free LPG connections to women from BPL households.',
    benefits: 'Free LPG connection, ₹1,600 financial support, first refill and stove free',
    eligibility: 'Women from BPL households',
    state: 'All India',
    applySteps: '1. Visit nearest LPG distributor\n2. Submit BPL certificate and ID proof\n3. Get free connection',
    officialLink: 'https://www.pmujjwalayojana.com',
    icon: '🔥',
    tags: ['energy', 'lpg', 'women']
  },
  {
    schemeId: 'sukanya-samriddhi',
    schemeName: 'Sukanya Samriddhi Yojana',
    category: 'Savings',
    description: 'Savings scheme for the girl child with attractive interest rates and tax benefits.',
    benefits: 'High interest rate (~8%), tax-free returns under Section 80C, maturity at age 21',
    eligibility: 'Parents/guardians of girl children below 10 years of age',
    state: 'All India',
    applySteps: '1. Visit post office or authorized bank\n2. Open account with minimum ₹250\n3. Deposit annually',
    officialLink: 'https://www.india.gov.in/sukanya-samriddhi-yojna',
    icon: '👧',
    tags: ['savings', 'girl-child', 'investment']
  }
];

/**
 * Lambda handler to seed DynamoDB with initial scheme data
 */
export const handler = async (event) => {
  console.log('Starting database seeding...');

  try {
    // Check if table already has data
    const scanCommand = new ScanCommand({
      TableName: TABLE_NAME,
      Limit: 1
    });

    const existingData = await docClient.send(scanCommand);

    if (existingData.Items && existingData.Items.length > 0) {
      console.log('Table already contains data. Skipping seeding.');
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Table already seeded',
          count: existingData.Count
        })
      };
    }

    // Insert sample schemes
    const results = [];
    for (const scheme of sampleSchemes) {
      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          ...scheme,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      });

      await docClient.send(command);
      results.push(scheme.schemeId);
      console.log(`Inserted: ${scheme.schemeName}`);
    }

    console.log('Database seeding completed successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Database seeded successfully',
        count: results.length,
        schemes: results
      })
    };

  } catch (error) {
    console.error('Error seeding database:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to seed database',
        message: error.message
      })
    };
  }
};
