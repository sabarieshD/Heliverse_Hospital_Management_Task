import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryAgentForm from "../components/DeliveryAgentForm";

const DeliveryAgentPage = () => {
  const [deliveryAgentList, setDeliveryAgentList] = useState([]);
  const [currentDeliveryAgent, setCurrentDeliveryAgent] = useState(null);

  const fetchDeliveryAgents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/delivery-agent');
      console.log(response.data);
      setDeliveryAgentList(response.data);
    } catch (error) {
      console.error("Error fetching delivery agents:", error);
    }
  };

  useEffect(() => {
    fetchDeliveryAgents();

    // Set up short polling every 5 seconds
    const intervalId = setInterval(() => {
      fetchDeliveryAgents();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleEdit = (agent) => {
    setCurrentDeliveryAgent(agent);
  };

  const handleSubmit = () => {
    setCurrentDeliveryAgent(null);
    fetchDeliveryAgents();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delivery-agent/${id}`);
      fetchDeliveryAgents();
    } catch (error) {
      console.error("Error deleting delivery agent:", error);
    }
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl mb-6">Delivery Agent Management</h1>
      <DeliveryAgentForm deliveryAgent={currentDeliveryAgent} onSubmit={handleSubmit} />

      <h2 className="text-2xl mt-6 mb-4">Delivery Agent List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Contact Info</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Assigned Meals</th>
            <th className="border px-4 py-2">Timing</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveryAgentList.map((agent) => (
            <tr key={agent.id}>
              <td className="border px-4 py-2">{agent.name}</td>
              <td className="border px-4 py-2">{agent.contact_info}</td>
              <td className="border px-4 py-2">{agent.status}</td>
              <td className="border px-4 py-2">{agent.assigned_meals}</td>
              <td className="border px-4 py-2">{agent.timing}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(agent)}
                  className="bg-yellow-500 text-white p-1 rounded mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(agent.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryAgentPage;
