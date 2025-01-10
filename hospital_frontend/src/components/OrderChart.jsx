import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from 'react-chartjs-2';

const OrderChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch and update chart data
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders/last5days');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      // Get the last 5 days
      const today = new Date();
      const lastFiveDays = [];
      for (let i = 4; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        lastFiveDays.push(date.toLocaleDateString()); // Store the dates in the format (MM/DD/YYYY)
      }

      // Initialize ordersPerDay object with 0 for each of the last 5 days
      const ordersPerDay = {};
      lastFiveDays.forEach((date) => {
        ordersPerDay[date] = 0;
      });

      // Count the number of orders delivered based on the date field
      data.forEach((item) => {
        const orderDate = new Date(item.date).toLocaleDateString();
        if (ordersPerDay[orderDate] !== undefined) {
          ordersPerDay[orderDate] += parseInt(item.orders_delivered);
        }
      });

      // Convert ordersPerDay to chart data
      const labels = lastFiveDays;
      const values = lastFiveDays.map((date) => ordersPerDay[date]);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Orders Delivered Per Day',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up short polling to fetch data every 10 seconds (10000 ms)
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // Adjust the polling interval as per your need

    // Cleanup interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const options = {
    maintainAspectRatio: false,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Orders Delivered Per Day (Last 5 Days)</h2>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OrderChart;
