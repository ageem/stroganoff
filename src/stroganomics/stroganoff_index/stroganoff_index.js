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

const commodityIds = {
  beef: 'PCU3116113116111',
  wheat: 'WPU02120301',
  milk: 'APU0000701111',
  vegetables: 'PCU311421311421',
  grapes: 'WPU011102283'
};

const weights = {
  beef: 0.5,
  wheat: 0.24,
  milk: 0.08,
  vegetables: 0.14,
  grapes: 0.04
};

const fetchCommodityData = async (commodityId) => {
  try {
    console.log(`Request URL: /api/fred/series/observations?series_id=${commodityId}&api_key=${FRED_API_KEY}&file_type=json`);
    const response = await axios.get(
      `/api/fred/series/observations?series_id=${commodityId}&api_key=${FRED_API_KEY}&file_type=json`
    );
    console.log(`Data fetched for ${commodityId}:`, response.data.observations);
    return response.data.observations.map(obs => ({
      date: obs.date,
      value: parseFloat(obs.value)
    }));
  } catch (error) {
    console.error('Error fetching commodity data:', error);
    return [];
  }
};

const calculateStroganoffIndex = (data, weights) => {
  const combinedData = {};
  data.forEach((commodityData, index) => {
    commodityData.forEach(obs => {
      if (!combinedData[obs.date]) combinedData[obs.date] = 0;
      combinedData[obs.date] += obs.value * Object.values(weights)[index];
    });
  });
  const result = Object.entries(combinedData).map(([date, value]) => ({ date, value }));
  console.log('Calculated Stroganoff Index:', result);
  return result;
};

const StroganoffIndex = () => {
  const [indexData, setIndexData] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);
  const [recentChange, setRecentChange] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = Object.values(commodityIds).map(fetchCommodityData);
      const data = await Promise.all(dataPromises);
      const stroganoffIndex = calculateStroganoffIndex(data, weights);
      setIndexData(stroganoffIndex);
      if (stroganoffIndex.length > 1) {
        setCurrentValue(stroganoffIndex[stroganoffIndex.length - 1].value);
        setRecentChange(stroganoffIndex[stroganoffIndex.length - 1].value - stroganoffIndex[stroganoffIndex.length - 2].value);
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
      borderColor: 'rgba(75,192,192,1)'
    }]
  };

  return (
    <div>
      <h2>Stroganoff Index</h2>
      {currentValue && <div>Current Value: {currentValue.toFixed(2)}</div>}
      {recentChange !== null && <div>Recent Change: {recentChange.toFixed(2)}</div>}
      <Line data={chartData} />
    </div>
  );
};

export default StroganoffIndex;
