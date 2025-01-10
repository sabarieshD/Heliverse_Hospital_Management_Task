// src/components/DeliveryAgentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryAgentForm = ({ deliveryAgent, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: deliveryAgent?.name || '',
    contact_info: deliveryAgent?.contact_info || '',
    status: deliveryAgent?.status || '',
    assigned_meals: deliveryAgent?.assigned_meals?.join(', ') || '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert assigned_meals back to an array before submitting if it's a string
    const assignedMealsArray = formData.assigned_meals.split(',').map(meal => meal.trim());

    const updatedData = { ...formData, assigned_meals: assignedMealsArray };

    try {
      if (deliveryAgent) {
        await axios.put(`http://localhost:5000/delivery-agent/${deliveryAgent.id}`, updatedData);
      } else {
        await axios.post('http://localhost:5000/delivery-agent', updatedData);
      }
      onSubmit();  // Callback to handle form submission success
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{deliveryAgent ? 'Edit' : 'Add'} Delivery Agent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Agent Name"
          className="input-field"
        />
        <input
          type="text"
          name="contact_info"
          value={formData.contact_info}
          onChange={handleChange}
          placeholder="Contact Information"
          className="input-field"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Status</option>
          <option value="Not Picked">Not Picked</option>
          <option value="In Progress">In Progress</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input
          type="text"
          name="assigned_meals"
          value={formData.assigned_meals}
          onChange={handleChange}
          placeholder="Delivery Info (comma-separated)"
          className="input-field"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        {deliveryAgent ? 'Update Delivery Agent' : 'Add Delivery Agent'}
      </button>
    </form>
  );
};

export default DeliveryAgentForm;
