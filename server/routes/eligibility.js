import express from 'express';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../config/aws.js';

const router = express.Router();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'schemes';

// Eligibility checker
router.post('/', async (req, res) => {
  try {
    const { age, income, occupation, state, category } = req.body;

    if (!age || !income || !occupation || !state || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Mock eligibility logic (can be enhanced with AI)
    const eligibilityRules = {
      'pm-kisan': () => occupation === 'farmer' && income <= 600000,
      'ayushman-bharat': () => income <= 500000,
      'pm-awas': () => income <= 600000 && ['SC', 'ST', 'OBC'].includes(category),
      'startup-india': () => ['business', 'self-employed'].includes(occupation) && age >= 18 && age <= 55,
      'skill-india': () => age >= 15 && age <= 45 && ['student', 'unemployed'].includes(occupation),
      'pm-mudra': () => ['business', 'self-employed', 'farmer'].includes(occupation) && income <= 1000000,
      'pm-ujjwala': () => income <= 200000,
      'sukanya-samriddhi': () => age >= 18 && income <= 800000
    };

    // Fetch all schemes
    let allSchemes = [];
    
    try {
      const command = new ScanCommand({ TableName: TABLE_NAME });
      const result = await docClient.send(command);
      allSchemes = result.Items || [];
    } catch (dbError) {
      console.log('Using mock schemes for eligibility check');
      // Use mock scheme IDs
      allSchemes = Object.keys(eligibilityRules).map(id => ({ schemeId: id }));
    }

    // Filter eligible schemes
    const eligibleSchemes = allSchemes.filter(scheme => {
      const rule = eligibilityRules[scheme.schemeId];
      return rule ? rule() : false;
    });

    res.json({
      success: true,
      eligibleSchemes: eligibleSchemes.map(s => s.schemeId),
      count: eligibleSchemes.length
    });

  } catch (error) {
    console.error('Eligibility check error:', error);
    res.status(500).json({
      error: 'Failed to check eligibility',
      details: error.message
    });
  }
});

export default router;
