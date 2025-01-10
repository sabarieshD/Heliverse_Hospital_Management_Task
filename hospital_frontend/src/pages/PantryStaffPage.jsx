// src/pages/PantryStaffPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PantryStaffForm from "../components/PantryStaffForm";

const PantryStaffPage = () => {
  const [pantryStaffList, setPantryStaffList] = useState([]);
  const [currentPantryStaff, setCurrentPantryStaff] = useState(null);

  const fetchPantryStaff = async () => {
    const response = await axios.get('http://localhost:5000/pantry-staff');
    setPantryStaffList(response.data);
  };

  useEffect(() => {
    fetchPantryStaff();
  }, []);

  const handleEdit = (staff) => {
    setCurrentPantryStaff(staff);
  };

  const handleSubmit = () => {
    setCurrentPantryStaff(null);
    fetchPantryStaff();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/pantry-staff/${id}`);
    fetchPantryStaff();
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl mb-6">Pantry Staff Management</h1>
      <PantryStaffForm pantryStaff={currentPantryStaff} onSubmit={handleSubmit} />
      
      <h2 className="text-2xl mt-6 mb-4">Pantry Staff List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Contact Info</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Assigned Tasks</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Special Instruction</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pantryStaffList.map((staff) => (
            <tr key={staff.id}>
              <td className="border px-4 py-2">{staff.name}</td>
              <td className="border px-4 py-2">{staff.contact_info}</td>
              <td className="border px-4 py-2">{staff.location}</td>
              <td className="border px-4 py-2">{staff.assigned_tasks}</td>
              <td className="border px-4 py-2">{staff.status}</td>
              <td className="border px-4 py-2">{staff.special_instruction}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(staff)}
                  className="bg-yellow-500 text-white p-1 rounded mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(staff.id)}
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

export default PantryStaffPage;
