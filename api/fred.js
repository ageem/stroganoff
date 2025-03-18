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

    // Get all query parameters
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(req.query)) {
      queryParams.append(key, value);
    }

    // Construct the URL for the FRED API
    const fredUrl = `https://api.stlouisfed.org/${fredPath}?${queryParams}`;
    
    console.log('Proxying request to:', fredUrl);
    
    // Make the request to the FRED API
    const response = await axios.get(fredUrl);
    
    // Return the response from the FRED API
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error proxying to FRED API:', error.message);
    
    // Return error details
    return res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
}; 