// src/components/PriceCard.js
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PriceCard = ({ currency, symbol }) => {
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState('');
  const [rateFloat, setRateFloat] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`);
        const data = await response.json();
        const currencyData = data.bpi[currency];
        setPrice(currencyData.rate);
        setDescription(currencyData.description);
        setRateFloat(currencyData.rate_float);
        if (currencyData.chartName === 'Bitcoin') {
          setChartData(currencyData.chart);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]); // Fetch data for the specified currency (e.g., USD, EUR, GBP)

  const createChart = () => {
    const ctx = document.getElementById(`${currency}-chart`);
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.map(item => item.time),
        datasets: [{
          label: 'Price',
          data: chartData.map(item => item.price),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          tension: 0.4,
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    if (chartData.length > 0) {
      createChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  return (
    <div className="price-card">
      <h2>{symbol}</h2>
      <p>Description: {description}</p>
      <p>Price: {price}</p>
      <p>Rate Float: {rateFloat}</p>
      <canvas id={`${currency}-chart`} width="400" height="200"></canvas>
    </div>
  );
};

export default PriceCard;
