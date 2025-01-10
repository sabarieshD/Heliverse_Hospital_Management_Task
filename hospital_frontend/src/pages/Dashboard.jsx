import React from 'react';
import Alerts from '../components/Alerts';
import Summary from '../components/Summary';
import OrderChart from '../components/OrderChart';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Delivery Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Summary />
        <Alerts />
        <OrderChart />
      </div>
      
    </div>
  );
};

export default Dashboard;
