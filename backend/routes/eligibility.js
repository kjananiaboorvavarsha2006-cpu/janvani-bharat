import express from 'express';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../config/aws.js';

const router = express.Router();

// Eligibility rules
const eligibilityRules = {
  'pm-kisan': (d) => d.occupation === 'farmer' && d.income <= 600000,
  'ayushman-bharat': (d) => d.income <= 500000,
  'pm-awas': (d) => d.income <= 600000 && ['SC', 'ST', 'OBC'].includes(d.category),
  'startup-india': (d) => ['business', 'self-employed'].includes(d.occupation) && d.age >= 18 && d.age <= 55,
  'skill-india': (d) => d.age >= 15 && d.age <= 45 && ['student', 'unemployed'].includes(d.occupation),
  'pm-mudra': (d) => ['business', 'self-employed', 'farmer'].includes(d.occupation) && d.income <= 1000000,
  'pm-ujjwala': (d) => d.income <= 200000,
  'sukanya-samriddhi': (d) => d.age >= 18 && d.income <= 800000
};

// POST /api/eligibility
router.post('/', async (req, res) => {
  try {
    const { age, income, occupation, state, category } = req.body;

    if (!age || !income || !occupation || !state || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userData = { age: Number(age), income: Number(income), occupation, state, category };

    // Fetch schemes from DynamoDB or fall back to rule keys
    let allSchemes = [];
    try {
      const command = new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME || 'schemes' });
      const result = await docClient.send(command);
      allSchemes = result.Items || [];
    } catch {
      allSchemes = Object.keys(eligibilityRules).map(id => ({ schemeId: id }));
    }

    const eligibleSchemes = allSchemes.filter(scheme => {
      const rule = eligibilityRules[scheme.schemeId];
      return rule ? rule(userData) : false;
    });

    return res.json({
      success: true,
      eligibleSchemes: eligibleSchemes.map(s => s.schemeId),
      count: eligibleSchemes.length
    });

  } catch (error) {
    console.error('Eligibility error:', error);
    res.status(500).json({ error: 'Failed to check eligibility', details: error.message });
  }
});

export default router;
