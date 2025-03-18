import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req;
  
  try {
    const response = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
      params: {
        ...query,
        api_key: process.env.REACT_APP_FRED_API_KEY
      }
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('FRED API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
} 