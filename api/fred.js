const axios = require('axios');

const handler = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { series_id } = req.query;
  if (!series_id) {
    return res.status(400).json({ error: 'series_id is required' });
  }

  try {
    const fredApiKey = process.env.FRED_API_KEY;
    if (!fredApiKey) {
      throw new Error('FRED API key not configured');
    }

    const baseUrl = 'https://api.stlouisfed.org/fred/series/observations';
    const params = new URLSearchParams({
      ...req.query,
      api_key: fredApiKey,
      file_type: 'json'
    });

    const response = await axios.get(`${baseUrl}?${params}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('FRED API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error fetching data from FRED API',
      details: error.response?.data || error.message
    });
  }
};

module.exports = handler; 