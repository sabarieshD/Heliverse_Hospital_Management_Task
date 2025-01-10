import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const Summary = () => {
  const [patientsCount, setPatientsCount] = useState(0);
  const [deliveryAgentsCount, setDeliveryAgentsCount] = useState(0);
  const [pantryStaffCount, setPantryStaffCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const patients = await axios.get('http://localhost:5000/patients');
      const deliveryAgents = await axios.get('http://localhost:5000/delivery-agent');
      const pantryStaff = await axios.get('http://localhost:5000/pantry-staff');

      setPatientsCount(patients.data.length);
      setDeliveryAgentsCount(deliveryAgents.data.length);
      setPantryStaffCount(pantryStaff.data.length);
    };
    fetchCounts();
  }, []);

  const pieData = {
    labels: ['Delivered', 'In Progress', 'Not Picked'],
    datasets: [
      {
        data: [10, 5, 3],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  return (
<div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3 lg:gap-8">
  {/* Cards */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 lg:col-span-3 lg:gap-6">
    <div className="bg-blue-100 flex flex-col items-center justify-center p-6 w-full lg:w-1/3 rounded-lg shadow-md">
      <h3 className="text-sm font-semibold text-center">Patients</h3>
      <p className="text-xl text-center">{patientsCount}</p>
    </div>
    <div className="bg-green-100 flex flex-col items-center justify-center p-6 w-full lg:w-1/3 rounded-lg shadow-md">
      <h3 className="text-sm font-semibold text-center">Delivery Agents</h3>
      <p className="text-xl text-center">{deliveryAgentsCount}</p>
    </div>
    <div className="bg-yellow-100 flex flex-col items-center justify-center p-6 w-full lg:w-1/3 rounded-lg shadow-md">
      <h3 className="text-sm font-semibold text-center">Pantry Staff</h3>
      <p className="text-xl text-center">{pantryStaffCount}</p>
    </div>
  </div>

  {/* Pie Chart */}
  <div className="col-span-1 lg:col-span-3">
  <div className="bg-white shadow-md rounded-lg p-6 lg:px-8 flex flex-col items-center justify-center">
    <h2 className="text-lg font-semibold mb-4 text-center">Delivery Status Breakdown</h2>
    <div className="h-64 flex items-center justify-center">
      <Pie data={pieData} />
    </div>
  </div>
 </div>
</div>

  );
};

export default Summary;
