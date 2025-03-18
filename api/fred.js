import axios from 'axios';

export default async function handler(req, res) {
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

  const { query } = req;
  
  try {
    console.log('FRED API request with params:', query);
    
    const response = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
      params: {
        ...query,
        api_key: process.env.REACT_APP_FRED_API_KEY
      }
    });
    
    console.log('FRED API response status:', response.status);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('FRED API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
} 