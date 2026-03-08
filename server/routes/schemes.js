import express from 'express';
import { ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../config/aws.js';

const router = express.Router();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'schemes';

// Mock data fallback if DynamoDB is not configured
const mockSchemes = [
  {
    schemeId: 'pm-kisan',
    schemeName: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    description: 'Income support of ₹6,000 per year to farmer families',
    benefits: '₹6,000 per year in 3 installments',
    eligibility: 'Small and marginal farmer families',
    state: 'All India',
    applySteps: '1. Visit pmkisan.gov.in 2. Register with Aadhaar 3. Fill application form',
    officialLink: 'https://pmkisan.gov.in'
  },
  {
    schemeId: 'ayushman-bharat',
    schemeName: 'Ayushman Bharat (PMJAY)',
    category: 'Health',
    description: 'Health insurance cover of ₹5 lakh per family per year',
    benefits: '₹5 lakh health coverage, cashless treatment',
    eligibility: 'Economically weaker families',
    state: 'All India',
    applySteps: '1. Check eligibility at pmjay.gov.in 2. Visit nearest Ayushman Mitra 3. Get card',
    officialLink: 'https://pmjay.gov.in'
  },
  {
    schemeId: 'pm-awas',
    schemeName: 'PM Awas Yojana',
    category: 'Housing',
    description: 'Financial assistance for construction of houses',
    benefits: 'Subsidy up to ₹2.67 lakh',
    eligibility: 'Homeless or living in kutcha houses',
    state: 'All India',
    applySteps: '1. Visit pmaymis.gov.in 2. Apply online 3. Submit documents',
    officialLink: 'https://pmaymis.gov.in'
  },
  {
    schemeId: 'startup-india',
    schemeName: 'Startup India',
    category: 'Business',
    description: 'Support and incentives for startups',
    benefits: 'Tax exemption for 3 years, easier compliance',
    eligibility: 'Entrepreneurs and startup founders',
    state: 'All India',
    applySteps: '1. Register at startupindia.gov.in 2. Get recognition certificate',
    officialLink: 'https://www.startupindia.gov.in'
  },
  {
    schemeId: 'skill-india',
    schemeName: 'Skill India (PMKVY)',
    category: 'Education',
    description: 'Free skill training and certification',
    benefits: 'Free training, ₹8,000 reward on certification',
    eligibility: 'Youth seeking skill development',
    state: 'All India',
    applySteps: '1. Visit pmkvyofficial.org 2. Find training center 3. Enroll',
    officialLink: 'https://www.pmkvyofficial.org'
  },
  {
    schemeId: 'pm-mudra',
    schemeName: 'PM Mudra Loan Yojana',
    category: 'Finance',
    description: 'Collateral-free loans up to ₹10 lakh',
    benefits: 'Loans without collateral: Shishu, Kishore, Tarun',
    eligibility: 'Small business owners and entrepreneurs',
    state: 'All India',
    applySteps: '1. Visit mudra.org.in 2. Apply at bank 3. Submit business plan',
    officialLink: 'https://www.mudra.org.in'
  },
  {
    schemeId: 'pm-ujjwala',
    schemeName: 'PM Ujjwala Yojana',
    category: 'Energy',
    description: 'Free LPG connections to women from BPL households',
    benefits: 'Free LPG connection, ₹1,600 support',
    eligibility: 'Women from BPL households',
    state: 'All India',
    applySteps: '1. Visit LPG distributor 2. Submit BPL certificate 3. Get connection',
    officialLink: 'https://www.pmujjwalayojana.com'
  },
  {
    schemeId: 'sukanya-samriddhi',
    schemeName: 'Sukanya Samriddhi Yojana',
    category: 'Savings',
    description: 'Savings scheme for girl child',
    benefits: 'High interest rate (~8%), tax-free returns',
    eligibility: 'Parents of girl children below 10 years',
    state: 'All India',
    applySteps: '1. Visit post office or bank 2. Open account with ₹250 3. Deposit annually',
    officialLink: 'https://www.india.gov.in/sukanya-samriddhi-yojna'
  }
];

// GET all schemes
router.get('/', async (req, res) => {
  try {
    const { state, category } = req.query;

    // Try DynamoDB first
    try {
      const params = {
        TableName: TABLE_NAME
      };

      const command = new ScanCommand(params);
      const result = await docClient.send(command);
      
      let schemes = result.Items || [];

      // Filter by state and category if provided
      if (state && state !== 'All India') {
        schemes = schemes.filter(s => s.state === state || s.state === 'All India');
      }
      if (category) {
        schemes = schemes.filter(s => s.category === category);
      }

      return res.json({ success: true, schemes });
    } catch (dbError) {
      console.log('DynamoDB not available, using mock data:', dbError.message);
      
      // Use mock data
      let schemes = [...mockSchemes];
      
      if (state && state !== 'All India') {
        schemes = schemes.filter(s => s.state === state || s.state === 'All India');
      }
      if (category) {
        schemes = schemes.filter(s => s.category === category);
      }

      return res.json({ success: true, schemes, source: 'mock' });
    }

  } catch (error) {
    console.error('Schemes fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch schemes',
      details: error.message
    });
  }
});

// GET scheme by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Try DynamoDB first
    try {
      const params = {
        TableName: TABLE_NAME,
        Key: { schemeId: id }
      };

      const command = new QueryCommand(params);
      const result = await docClient.send(command);
      
      if (result.Item) {
        return res.json({ success: true, scheme: result.Item });
      }
    } catch (dbError) {
      console.log('DynamoDB not available, using mock data');
    }

    // Fallback to mock data
    const scheme = mockSchemes.find(s => s.schemeId === id);
    
    if (scheme) {
      return res.json({ success: true, scheme, source: 'mock' });
    }

    res.status(404).json({ error: 'Scheme not found' });

  } catch (error) {
    console.error('Scheme fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch scheme',
      details: error.message
    });
  }
});

export default router;
