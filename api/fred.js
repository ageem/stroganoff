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

  try {
    // Get the path after /api/fred
    const fredPath = req.url.replace(/^\/api\/fred[\/]?/, '');
    
    // Extract query parameters
    const queryParams = new URLSearchParams();
    Object.entries(req.query || {}).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    
    // Log the API request details for debugging
    console.log('FRED API request details:', {
      path: fredPath,
      params: Object.fromEntries(queryParams.entries()),
      hasApiKey: queryParams.has('api_key') && queryParams.get('api_key').length > 0
    });

    // Construct the URL for the FRED API
    const fredUrl = `https://api.stlouisfed.org/${fredPath}?${queryParams}`;
    
    console.log('Proxying request to FRED API');
    
    // Make the request to the FRED API
    const response = await axios.get(fredUrl);
    
    console.log('FRED API response status:', response.status);
    console.log('FRED API response has observations:', 
      response.data && response.data.observations ? 
      `Yes (${response.data.observations.length} items)` : 'No');
    
    // Return the response from the FRED API
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error proxying to FRED API:', error.message);
    
    let errorDetails = {
      message: error.message,
      stack: error.stack,
    };
    
    if (error.response) {
      errorDetails.status = error.response.status;
      errorDetails.statusText = error.response.statusText;
      errorDetails.data = error.response.data;
      errorDetails.url = error.config?.url;
    }
    
    console.error('Error details:', JSON.stringify(errorDetails, null, 2));
    
    // Return error details
    return res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
}; 