const axios = require('axios');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Get the query parameters
  const { series_id, file_type, observation_start, frequency, sort_order, limit } = req.query;
  
  if (!series_id) {
    return res.status(400).json({ error: 'series_id is required' });
  }

  try {
    console.log('FRED API request with series_id:', series_id);
    
    const response = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
      params: {
        series_id,
        file_type: file_type || 'json',
        observation_start: observation_start || '2020-01-01',
        frequency: frequency || 'm',
        sort_order: sort_order || 'desc',
        limit: limit || '100',
        api_key: process.env.REACT_APP_FRED_API_KEY
      }
    });
    
    console.log('FRED API response status:', response.status);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('FRED API Error:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
}; 