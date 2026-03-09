import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'schemes';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

/**
 * Lambda handler for eligibility checking
 * POST /eligibility - Check user eligibility for schemes
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle OPTIONS for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { age, income, occupation, state, category, gender, area } = body;

    // Validate required fields
    if (!age || !income || !occupation || !state || !category) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields',
          required: ['age', 'income', 'occupation', 'state', 'category']
        })
      };
    }

    // Fetch all schemes from DynamoDB
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const result = await docClient.send(command);
    const allSchemes = result.Items || [];

    // Define eligibility rules
    const eligibilityRules = {
      'pm-kisan': (user) => 
        user.occupation === 'farmer' && user.income <= 600000,
      
      'ayushman-bharat': (user) => 
        user.income <= 500000,
      
      'pm-awas': (user) => 
        user.income <= 600000 && 
        (['SC', 'ST', 'OBC'].includes(user.category) || user.area === 'rural'),
      
      'startup-india': (user) => 
        ['business', 'self-employed'].includes(user.occupation) && 
        user.age >= 18 && user.age <= 55,
      
      'skill-india': (user) => 
        user.age >= 15 && user.age <= 45 && 
        (['student', 'unemployed'].includes(user.occupation) || user.income <= 300000),
      
      'pm-mudra': (user) => 
        ['business', 'self-employed', 'farmer'].includes(user.occupation) && 
        user.income <= 1000000,
      
      'pm-ujjwala': (user) => 
        user.gender === 'female' && user.income <= 200000 && user.area === 'rural',
      
      'sukanya-samriddhi': (user) => 
        user.age >= 18 && user.income <= 800000
    };

    // Check eligibility for each scheme
    const eligibleSchemes = [];
    const ineligibleSchemes = [];

    for (const scheme of allSchemes) {
      const rule = eligibilityRules[scheme.schemeId];
      
      if (rule) {
        try {
          const isEligible = rule(body);
          
          if (isEligible) {
            eligibleSchemes.push({
              schemeId: scheme.schemeId,
              schemeName: scheme.schemeName,
              category: scheme.category,
              benefits: scheme.benefits,
              officialLink: scheme.officialLink,
              matchScore: calculateMatchScore(scheme, body)
            });
          } else {
            ineligibleSchemes.push({
              schemeId: scheme.schemeId,
              schemeName: scheme.schemeName,
              reason: getIneligibilityReason(scheme.schemeId, body)
            });
          }
        } catch (error) {
          console.error(`Error checking ${scheme.schemeId}:`, error);
        }
      }
    }

    // Sort eligible schemes by match score
    eligibleSchemes.sort((a, b) => b.matchScore - a.matchScore);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        eligibleCount: eligibleSchemes.length,
        eligibleSchemes: eligibleSchemes,
        ineligibleCount: ineligibleSchemes.length,
        ineligibleSchemes: ineligibleSchemes,
        userData: {
          age,
          income,
          occupation,
          state,
          category,
          gender,
          area
        }
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

/**
 * Calculate match score (0-100)
 */
function calculateMatchScore(scheme, userData) {
  let score = 50;

  // State relevance
  if (scheme.state === userData.state) {
    score += 25;
  } else if (scheme.state === 'All India') {
    score += 15;
  }

  // Income bracket relevance
  if (userData.income <= 200000) {
    score += 15;
  } else if (userData.income <= 500000) {
    score += 10;
  } else if (userData.income <= 1000000) {
    score += 5;
  }

  // Category priority
  const categoryPriority = {
    'Agriculture': ['farmer'],
    'Health': ['all'],
    'Housing': ['all'],
    'Business': ['business', 'self-employed'],
    'Education': ['student', 'unemployed'],
    'Finance': ['business', 'self-employed', 'farmer']
  };

  const relevantOccupations = categoryPriority[scheme.category] || [];
  if (relevantOccupations.includes('all') || relevantOccupations.includes(userData.occupation)) {
    score += 10;
  }

  return Math.min(score, 100);
}

/**
 * Get reason for ineligibility
 */
function getIneligibilityReason(schemeId, userData) {
  const reasons = {
    'pm-kisan': () => {
      if (userData.occupation !== 'farmer') return 'Not a farmer';
      if (userData.income > 600000) return 'Income exceeds limit';
      return 'Does not meet criteria';
    },
    'ayushman-bharat': () => {
      if (userData.income > 500000) return 'Income exceeds ₹5 lakh limit';
      return 'Does not meet criteria';
    },
    'pm-awas': () => {
      if (userData.income > 600000) return 'Income exceeds limit';
      if (!['SC', 'ST', 'OBC'].includes(userData.category) && userData.area !== 'rural') {
        return 'Not in eligible category or area';
      }
      return 'Does not meet criteria';
    },
    'startup-india': () => {
      if (!['business', 'self-employed'].includes(userData.occupation)) {
        return 'Not a business owner or self-employed';
      }
      if (userData.age < 18 || userData.age > 55) return 'Age not in range 18-55';
      return 'Does not meet criteria';
    },
    'skill-india': () => {
      if (userData.age < 15 || userData.age > 45) return 'Age not in range 15-45';
      return 'Does not meet criteria';
    },
    'pm-mudra': () => {
      if (!['business', 'self-employed', 'farmer'].includes(userData.occupation)) {
        return 'Occupation not eligible';
      }
      if (userData.income > 1000000) return 'Income exceeds ₹10 lakh limit';
      return 'Does not meet criteria';
    },
    'pm-ujjwala': () => {
      if (userData.gender !== 'female') return 'Only for women';
      if (userData.income > 200000) return 'Income exceeds BPL limit';
      if (userData.area !== 'rural') return 'Only for rural areas';
      return 'Does not meet criteria';
    },
    'sukanya-samriddhi': () => {
      if (userData.age < 18) return 'Must be 18+ to open account';
      if (userData.income > 800000) return 'Income exceeds limit';
      return 'Does not meet criteria';
    }
  };

  const reasonFn = reasons[schemeId];
  return reasonFn ? reasonFn() : 'Does not meet eligibility criteria';
}
