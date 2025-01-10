// src/components/PantryStaffForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PantryStaffForm = ({ pantryStaff, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: pantryStaff?.name || '',
    contact_info: pantryStaff?.contact_info || '',
    location: pantryStaff?.location || '',
    assigned_tasks: pantryStaff?.assigned_tasks?.join(', ') || '', 
    status: pantryStaff?.status || '',
    special_instruction: pantryStaff?.special_instruction || '',
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
    
    // Convert assigned_tasks back to an array before submitting if it's a string
    const assignedTasksArray = formData.assigned_tasks.split(',').map(task => task.trim());

    const updatedData = { ...formData, assigned_tasks: assignedTasksArray };

    try {
      if (pantryStaff) {
        await axios.put(`http://localhost:5000/pantry-staff/${pantryStaff.id}`, updatedData);
      } else {
        await axios.post('http://localhost:5000/pantry-staff', updatedData);
      }
      onSubmit();  // Callback to handle form submission success
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{pantryStaff ? 'Edit' : 'Add'} Pantry Staff</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Staff Name"
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
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input-field"
        />
        <input
          type="text"
          name="assigned_tasks"
          value={formData.assigned_tasks}
          onChange={handleChange}
          placeholder="Assigned Tasks (comma-separated)"
          className="input-field"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input
          type="text"
          name="special_instruction"
          value={formData.special_instruction}
          onChange={handleChange}
          placeholder="Special Instruction"
          className="input-field"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        {pantryStaff ? 'Update Pantry Staff' : 'Add Pantry Staff'}
      </button>
    </form>
  );
};

export default PantryStaffForm;
