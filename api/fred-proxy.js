const axios = require('axios');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Get the API key from environment variables
  const FRED_API_KEY = process.env.REACT_APP_FRED_API_KEY;
  
  console.log('FRED API key in serverless function:', FRED_API_KEY ? 'Available (length: ' + FRED_API_KEY.length + ')' : 'Missing');
  
  if (!FRED_API_KEY) {
    console.error('FRED API key is missing in serverless function');
    return res.status(500).json({
      error: 'API key is missing in server configuration',
      details: 'Please check Vercel environment variables'
    });
  }

  try {
    // Get series_id from query parameters
    const seriesId = req.query.series_id;
    
    if (!seriesId) {
      return res.status(400).json({
        error: 'Missing series_id parameter'
      });
    }
    
    // Construct a direct request to FRED API
    const fredUrl = 'https://api.stlouisfed.org/fred/series/observations';
    const params = {
      series_id: seriesId,
      api_key: FRED_API_KEY,
      file_type: 'json',
      observation_start: '2020-01-01',
      frequency: 'm',
      sort_order: 'desc',
      limit: '100'
    };
    
    console.log(`Making direct FRED API request for series ${seriesId}`);
    
    const response = await axios.get(fredUrl, { params });
    
    console.log('FRED API direct response status:', response.status);
    console.log('Response data has observations:', 
      response.data && response.data.observations ? 
      `Yes (${response.data.observations.length} items)` : 'No');
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in direct FRED API request:', error.message);
    
    let errorDetails = {
      message: error.message,
    };
    
    if (error.response) {
      errorDetails.status = error.response.status;
      errorDetails.statusText = error.response.statusText;
      errorDetails.data = error.response.data;
    }
    
    console.error('Error details:', JSON.stringify(errorDetails, null, 2));
    
    return res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
}; 