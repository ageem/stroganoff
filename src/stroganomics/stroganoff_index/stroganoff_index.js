import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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

// Test if the API key is available
console.log('FRED API key available:', !!FRED_API_KEY);

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
    
    if (!FRED_API_KEY) {
      console.error('FRED API key is missing. Check environment variables.');
      throw new Error('FRED API key is missing. Check environment variables.');
    }
    
    // Use the direct endpoint instead
    const url = `/api/fred/direct?series_id=${commodityId}`;
    console.log(`Making request to ${url}`);

    const response = await axios.get(url);
    console.log(`Response received for ${commodityId}:`, response.status);
    
    if (!response.data) {
      console.error(`No data returned for ${commodityId}`);
      throw new Error(`No data returned for ${commodityId}`);
    }
    
    if (!response.data.observations) {
      console.error(`Invalid response format for ${commodityId}:`, response.data);
      throw new Error(`Invalid response format for ${commodityId}: observations not found`);
    }

    const filteredData = response.data.observations
      .filter(obs => obs.value !== '.' && !isNaN(parseFloat(obs.value)))
      .map(obs => ({
        date: obs.date,
        value: parseFloat(obs.value)
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (filteredData.length === 0) {
      console.warn(`No usable data points for ${commodityId}`);
    } else {
      console.log(`Successfully processed ${filteredData.length} data points for ${commodityId}`);
    }
    
    return filteredData;
  } catch (error) {
    console.error(`Error fetching data for ${commodityId}:`, error.message);
    if (error.response) {
      console.error(`Response details for ${commodityId}:`, {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    throw error; // Re-throw to let the parent handler deal with it
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

const DATE_RANGE_PRESETS = {
  '3M': { label: 'Last 3 Months', days: 90 },
  '6M': { label: 'Last 6 Months', days: 180 },
  '1Y': { label: 'Last Year', days: 365 },
  'ALL': { label: 'All Time', days: null }
};

const StroganoffIndex = () => {
  const [indexData, setIndexData] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);
  const [recentChange, setRecentChange] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(2020, 0, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPreset, setSelectedPreset] = useState('ALL');

  const handlePresetClick = (presetKey) => {
    setSelectedPreset(presetKey);
    const preset = DATE_RANGE_PRESETS[presetKey];
    
    let newStartDate;
    if (presetKey === 'YTD') {
      newStartDate = new Date(new Date().getFullYear(), 0, 1);
    } else if (preset.days) {
      newStartDate = new Date();
      newStartDate.setDate(newStartDate.getDate() - preset.days);
    } else {
      newStartDate = new Date(2020, 0, 1); // Default start date
    }
    
    setStartDate(newStartDate);
    setEndDate(new Date());
  };

  const filterDataByDateRange = (data) => {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Starting to fetch commodity data...');
        console.log('Using FRED API Key:', FRED_API_KEY ? 'Key is present (length: ' + FRED_API_KEY.length + ')' : 'Key is missing');
        
        if (!FRED_API_KEY) {
          throw new Error('FRED API key is missing. Please check your environment variables.');
        }
        
        const dataPromises = Object.entries(commodityIds).map(([name, id]) => 
          fetchCommodityData(id)
            .then(data => {
              console.log(`Fetched ${data.length} records for ${name}`);
              return data;
            })
            .catch(error => {
              console.error(`Failed to fetch ${name} data:`, error.message);
              return []; // Return empty array for this commodity to prevent Promise.all from failing
            })
        );

        const data = await Promise.all(dataPromises);
        console.log('All commodity data fetched:', data.map((d, i) => 
          `${Object.keys(commodityIds)[i]}: ${d.length} records`
        ));

        // Count total records
        const totalRecords = data.reduce((sum, arr) => sum + arr.length, 0);
        if (totalRecords === 0) {
          throw new Error('No data available for any commodities. Please check your API key and network connection.');
        }

        const stroganoffIndex = calculateStroganoffIndex(data, weights);
        console.log('Final index data points:', stroganoffIndex.length);
        
        if (stroganoffIndex.length === 0) {
          throw new Error('No data available for the Stroganoff Index. This may be due to missing or invalid commodity data.');
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
      },
      x: {
        grid: {
          display: true
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  const handleExportCSV = () => {
    // Convert filtered data to CSV format
    const csvData = [
      ['Date', 'Stroganoff Index Value'], // Header row
      ...filteredData.map(item => [item.date, item.value.toFixed(2)])
    ].map(row => row.join(',')).join('\n');

    // Create blob and download link
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `stroganoff-index-${startDate.toISOString().split('T')[0]}-to-${endDate.toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const filteredData = filterDataByDateRange(indexData);
  const chartData = {
    labels: filteredData.map(d => d.date),
    datasets: [{
      label: 'Stroganoff Index',
      data: filteredData.map(d => d.value),
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Stroganoff Index</h2>
      
      {/* Date Range Controls - All in one line */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Preset Buttons */}
            {Object.entries(DATE_RANGE_PRESETS).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => handlePresetClick(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${selectedPreset === key
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {label}
              </button>
            ))}

            {/* Date Pickers */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">From:</span>
              <DatePicker
                selected={startDate}
                onChange={date => {
                  setStartDate(date);
                  setSelectedPreset(null);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">To:</span>
              <DatePicker
                selected={endDate}
                onChange={date => {
                  setEndDate(date);
                  setSelectedPreset(null);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Current Value and Recent Change */}
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

      {/* Chart */}
      <div className="w-full h-[500px] relative">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StroganoffIndex;
