import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchDeliveryAgents = () => {
  const [deliveryAgents, setDeliveryAgents] = useState([]); // Array for multiple agents
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      const email = localStorage.getItem('email');
      console.log('Fetched email from localStorage:', email); // Debug log
      if (!email) {
        setError('No email found. Please log in.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/delivery-agent-specific', { name: email });
        console.log('Response from API:', response.data); // Debug log
        setDeliveryAgents(response.data);
      } catch (err) {
        console.error('Error fetching delivery agents:', err);
        setError('Failed to fetch delivery agent details.');
      }
    };

    fetchAgents();
    const intervalId = setInterval(() => {
        fetchAgents();
      }, 10000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
  }, []);

  const handleSaveChanges = async (id, updatedStatus, updatedNotes) => {
    setIsSaving(true);

    try {
      await axios.put(`http://localhost:5000/delivery-agent/status/${id}`, {
        status: updatedStatus,
        notes: updatedNotes,
      });
    } catch (err) {
      console.error('Error saving changes:', err);
      alert('Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Delivery Agents</h1>
      {deliveryAgents.length > 0 ? (
        deliveryAgents.map((agent) => (
          <div key={agent.id} className="bg-gray-100 p-4 rounded mb-4">
            <p><strong>Name:</strong> {agent.name}</p>
            <p><strong>Contact Info:</strong> {agent.contact_info}</p>
            <p><strong>Delivery Info:</strong> {agent.assigned_meals}</p>
            <div className="mb-2">
              <label htmlFor={`status-${agent.id}`} className="block font-bold">Status:</label>
              <select
                id={`status-${agent.id}`}
                className="border rounded p-2 w-full"
                value={agent.status}
                onChange={(e) =>
                  setDeliveryAgents((prevAgents) =>
                    prevAgents.map((a) =>
                      a.id === agent.id ? { ...a, status: e.target.value } : a
                    )
                  )
                }
              >
                <option value="Not Picked">Not Picked</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor={`notes-${agent.id}`} className="block font-bold">Optional Notes:</label>
              <textarea
                id={`notes-${agent.id}`}
                className="border rounded p-2 w-full"
                value={agent.notes || ''}
                onChange={(e) =>
                  setDeliveryAgents((prevAgents) =>
                    prevAgents.map((a) =>
                      a.id === agent.id ? { ...a, notes: e.target.value } : a
                    )
                  )
                }
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              onClick={() => handleSaveChanges(agent.id, agent.status, agent.notes)}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ))
      ) : (
        <p>Loading delivery agent details...</p>
      )}
    </div>
  );
};

export default FetchDeliveryAgents;
