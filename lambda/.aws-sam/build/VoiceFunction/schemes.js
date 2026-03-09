import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'schemes';

// CORS headers for API Gateway
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
};

/**
 * Lambda handler for scheme operations
 * Supports: GET all schemes, GET by ID, GET by eligibility
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle OPTIONS for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const path = event.path || event.rawPath || '';
    const method = event.httpMethod || event.requestContext?.http?.method || 'GET';
    const queryParams = event.queryStringParameters || {};
    const pathParams = event.pathParameters || {};

    // Route: GET /schemes - Get all schemes with optional filters
    if (method === 'GET' && path.endsWith('/schemes')) {
      return await getAllSchemes(queryParams);
    }

    // Route: GET /schemes/{id} - Get scheme by ID
    if (method === 'GET' && pathParams.id) {
      return await getSchemeById(pathParams.id);
    }

    // Route: POST /schemes/eligible - Get schemes by eligibility
    if (method === 'POST' && path.includes('/eligible')) {
      const body = JSON.parse(event.body || '{}');
      return await getEligibleSchemes(body);
    }

    // Route not found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

/**
 * Get all schemes with optional filtering
 */
async function getAllSchemes(queryParams) {
  try {
    const { state, category, limit } = queryParams;

    const params = {
      TableName: TABLE_NAME
    };

    if (limit) {
      params.Limit = parseInt(limit);
    }

    const command = new ScanCommand(params);
    const result = await docClient.send(command);

    let schemes = result.Items || [];

    // Apply filters
    if (state && state !== 'All India') {
      schemes = schemes.filter(s => 
        s.state === state || s.state === 'All India'
      );
    }

    if (category) {
      schemes = schemes.filter(s => s.category === category);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        count: schemes.length,
        schemes: schemes
      })
    };

  } catch (error) {
    console.error('Error fetching schemes:', error);
    throw error;
  }
}

/**
 * Get scheme by ID
 */
async function getSchemeById(schemeId) {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { schemeId }
    };

    const command = new GetCommand(params);
    const result = await docClient.send(command);

    if (!result.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Scheme not found'
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        scheme: result.Item
      })
    };

  } catch (error) {
    console.error('Error fetching scheme:', error);
    throw error;
  }
}

/**
 * Get eligible schemes based on user criteria
 */
async function getEligibleSchemes(userData) {
  try {
    const { age, income, occupation, state, category, gender, area } = userData;

    // Validate required fields
    if (!age || !income || !occupation || !state || !category) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields: age, income, occupation, state, category'
        })
      };
    }

    // Fetch all schemes
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const result = await docClient.send(command);
    const allSchemes = result.Items || [];

    // Eligibility rules for each scheme
    const eligibilityRules = {
      'pm-kisan': (user) => 
        user.occupation === 'farmer' && user.income <= 600000,
      
      'ayushman-bharat': (user) => 
        user.income <= 500000,
      
      'pm-awas': (user) => 
        user.income <= 600000 && 
        (user.category === 'SC' || user.category === 'ST' || user.category === 'OBC' || user.area === 'rural'),
      
      'startup-india': (user) => 
        (user.occupation === 'business' || user.occupation === 'self-employed') && 
        user.age >= 18 && user.age <= 55,
      
      'skill-india': (user) => 
        user.age >= 15 && user.age <= 45 && 
        (user.occupation === 'student' || user.occupation === 'unemployed' || user.income <= 300000),
      
      'pm-mudra': (user) => 
        (user.occupation === 'business' || user.occupation === 'self-employed' || user.occupation === 'farmer') && 
        user.income <= 1000000,
      
      'pm-ujjwala': (user) => 
        user.gender === 'female' && user.income <= 200000 && user.area === 'rural',
      
      'sukanya-samriddhi': (user) => 
        user.age >= 18 && user.income <= 800000
    };

    // Filter eligible schemes
    const eligibleSchemes = allSchemes.filter(scheme => {
      const rule = eligibilityRules[scheme.schemeId];
      if (!rule) return false;
      
      try {
        return rule(userData);
      } catch (error) {
        console.error(`Error checking eligibility for ${scheme.schemeId}:`, error);
        return false;
      }
    });

    // Calculate eligibility score for each scheme
    const schemesWithScores = eligibleSchemes.map(scheme => ({
      ...scheme,
      eligibilityScore: calculateEligibilityScore(scheme, userData)
    }));

    // Sort by eligibility score (highest first)
    schemesWithScores.sort((a, b) => b.eligibilityScore - a.eligibilityScore);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        count: schemesWithScores.length,
        eligibleSchemes: schemesWithScores,
        userData: {
          age,
          income,
          occupation,
          state,
          category
        }
      })
    };

  } catch (error) {
    console.error('Error checking eligibility:', error);
    throw error;
  }
}

/**
 * Calculate eligibility score (0-100)
 */
function calculateEligibilityScore(scheme, userData) {
  let score = 50; // Base score

  // State match
  if (scheme.state === userData.state) {
    score += 20;
  } else if (scheme.state === 'All India') {
    score += 10;
  }

  // Category match
  if (scheme.category && userData.category) {
    const categoryMatch = {
      'Agriculture': ['farmer'],
      'Health': ['all'],
      'Housing': ['all'],
      'Business': ['business', 'self-employed'],
      'Education': ['student', 'unemployed'],
      'Finance': ['business', 'self-employed', 'farmer'],
      'Energy': ['all'],
      'Savings': ['all']
    };

    const matchingOccupations = categoryMatch[scheme.category] || [];
    if (matchingOccupations.includes('all') || matchingOccupations.includes(userData.occupation)) {
      score += 15;
    }
  }

  // Income relevance
  if (userData.income <= 300000) {
    score += 15; // High priority for low income
  } else if (userData.income <= 600000) {
    score += 10;
  } else if (userData.income <= 1000000) {
    score += 5;
  }

  return Math.min(score, 100);
}
