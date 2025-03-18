const axios = require('axios');

const handler = async (req, res) => {
  console.log('FRED API route hit:', {
    method: req.method,
    query: req.query,
    headers: req.headers
  });

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }

  const { series_id } = req.query;
  if (!series_id) {
    console.log('Missing series_id parameter');
    return res.status(400).json({ error: 'series_id is required' });
  }

  try {
    const fredApiKey = process.env.FRED_API_KEY;
    if (!fredApiKey) {
      console.log('FRED API key not configured in environment');
      throw new Error('FRED API key not configured');
    }

    const baseUrl = 'https://api.stlouisfed.org/fred/series/observations';
    const params = new URLSearchParams({
      ...req.query,
      api_key: fredApiKey,
      file_type: 'json'
    });

    const url = `${baseUrl}?${params}`;
    console.log('Making request to FRED API:', url.replace(fredApiKey, '[REDACTED]'));

    const response = await axios.get(url);
    console.log('FRED API response status:', response.status);
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('FRED API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config ? {
        url: error.config.url?.replace(/(api_key=)[^&]+/, '$1[REDACTED]'),
        method: error.config.method,
        headers: error.config.headers
      } : null
    });
    
    res.status(error.response?.status || 500).json({
      error: 'Error fetching data from FRED API',
      details: error.response?.data || error.message
    });
  }
};

module.exports = handler; 