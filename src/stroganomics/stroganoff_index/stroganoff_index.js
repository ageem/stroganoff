import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FRED_API_KEY = process.env.REACT_APP_FRED_API_KEY;

// Updated commodity IDs with simpler FRED series
const commodityIds = {
  beef: 'WPU022104',      // Producer Price Index by Commodity: Processed Foods and Feeds: Beef and Veal
  wheat: 'WPU0212',       // Producer Price Index by Commodity: Farm Products: Grains
  milk: 'APU0000709112',  // Average Price: Milk, Fresh, Whole, Fortified, per gal
  vegetables: 'WPU019',   // Producer Price Index by Commodity: Farm Products: Fresh and Dry Vegetables
  wine: 'APU0000720311'   // Average Price: Wine, Red and White Table
};

const weights = {
  beef: 0.5,
  wheat: 0.24,
  milk: 0.08,
  vegetables: 0.14,
  wine: 0.04
};

const fetchCommodityData = async (commodityId) => {
  try {
    console.log(`Fetching data for commodity ID ${commodityId}`);
    
    // Construct the URL with parameters
    const baseUrl = '/api/fred/series/observations';
    const params = new URLSearchParams({
      series_id: commodityId,
      api_key: FRED_API_KEY,
      file_type: 'json',
      observation_start: '2020-01-01',
      frequency: 'm',
      sort_order: 'desc',
      limit: '100'
    });

    const url = `${baseUrl}?${params}`;
    console.log('Request URL:', url);

    const response = await axios.get(url);
    console.log(`Response received for ${commodityId}:`, response.status);
    
    if (!response.data || !response.data.observations) {
      console.error(`Invalid response format for ${commodityId}:`, response.data);
      return [];
    }

    const filteredData = response.data.observations
      .filter(obs => obs.value !== '.' && !isNaN(parseFloat(obs.value)))
      .map(obs => ({
        date: obs.date,
        value: parseFloat(obs.value)
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(`Successfully processed ${filteredData.length} data points for ${commodityId}`);
    return filteredData;
  } catch (error) {
    console.error(`Error fetching data for ${commodityId}:`, error.message);
    if (error.response) {
      console.error(`Response details for ${commodityId}:`, {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config.url
      });
    }
    return [];
  }
};

const calculateStroganoffIndex = (data, weights) => {
  if (!data || data.length === 0) {
    console.error('No data available for index calculation');
    return [];
  }

  const combinedData = {};
  data.forEach((commodityData, index) => {
    if (!commodityData || commodityData.length === 0) return;
    
    commodityData.forEach(obs => {
      if (!combinedData[obs.date]) combinedData[obs.date] = 0;
      combinedData[obs.date] += obs.value * Object.values(weights)[index];
    });
  });

  const result = Object.entries(combinedData)
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => a.date.localeCompare(b.date)); // Sort by date

  console.log('Calculated Stroganoff Index:', result);
  return result;
};

const StroganoffIndex = () => {
  const [indexData, setIndexData] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);
  const [recentChange, setRecentChange] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Starting to fetch commodity data...');
        console.log('Using FRED API Key:', FRED_API_KEY ? 'Key is present' : 'Key is missing');
        
        const dataPromises = Object.entries(commodityIds).map(([name, id]) => 
          fetchCommodityData(id).then(data => {
            console.log(`Fetched ${data.length} records for ${name}`);
            return data;
          })
        );

        const data = await Promise.all(dataPromises);
        console.log('All commodity data fetched:', data.map((d, i) => 
          `${Object.keys(commodityIds)[i]}: ${d.length} records`
        ));

        const stroganoffIndex = calculateStroganoffIndex(data, weights);
        console.log('Final index data points:', stroganoffIndex.length);
        
        if (stroganoffIndex.length === 0) {
          throw new Error('No data available for the Stroganoff Index. Check console for details.');
        }

        setIndexData(stroganoffIndex);
        if (stroganoffIndex.length > 1) {
          setCurrentValue(stroganoffIndex[stroganoffIndex.length - 1].value);
          setRecentChange(stroganoffIndex[stroganoffIndex.length - 1].value - stroganoffIndex[stroganoffIndex.length - 2].value);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: indexData.map(d => d.date),
    datasets: [{
      label: 'Stroganoff Index',
      data: indexData.map(d => d.value),
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stroganoff Index Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Stroganoff Index</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentValue && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Current Value</h3>
            <p className="text-2xl font-bold text-amber-600">{currentValue.toFixed(2)}</p>
          </div>
        )}
        {recentChange !== null && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Recent Change</h3>
            <p className={`text-2xl font-bold ${recentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {recentChange >= 0 ? '+' : ''}{recentChange.toFixed(2)}
            </p>
          </div>
        )}
      </div>
      <div className="w-full h-[400px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StroganoffIndex;
