import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
  const [delayedDeliveries, setDelayedDeliveries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/delivery-agent');
      const delayed = response.data.filter((agent) => agent.timing === 'delay');
      setDelayedDeliveries(delayed);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Alerts</h2>
      <ul>
        {delayedDeliveries.map((agent, index) => (
          <li key={index} className="mb-2 text-red-600">
            {agent.name} - Status: {agent.status} - Timing: {agent.timing}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
