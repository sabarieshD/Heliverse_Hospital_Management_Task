// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientForm from "../components/patientDetails";

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);

  const fetchPatients = async () => {
    const response = await axios.get('http://localhost:5000/patients');
    setPatients(response.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
  };

  const handleSubmit = () => {
    setCurrentPatient(null);
    fetchPatients();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/patients/${id}`);
    fetchPatients();
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl mb-6">Patient Management</h1>
      <PatientForm patient={currentPatient} onSubmit={handleSubmit} />
      
      <h2 className="text-2xl mt-6 mb-4">Patient List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Diseases</th>
            <th className="border px-4 py-2">Allergies</th>
            <th className="border px-4 py-2">Room Number</th>
            <th className="border px-4 py-2">Bed Number</th>
            <th className="border px-4 py-2">Floor Number</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Contact Info</th>
            <th className="border px-4 py-2">Emergency contact</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="border px-4 py-2">{patient.name}</td>
              <td className="border px-4 py-2">{patient.diseases}</td>
              <td className="border px-4 py-2">{patient.allergies}</td>
              <td className="border px-4 py-2">{patient.room_number}</td>
              <td className="border px-4 py-2">{patient.bed_number}</td>
              <td className="border px-4 py-2">{patient.floor_number}</td>
              <td className="border px-4 py-2">{patient.age}</td>
              <td className="border px-4 py-2">{patient.gender}</td>
              <td className="border px-4 py-2">{patient.contact_info}</td>
              <td className="border px-4 py-2">{patient.emergency_contact}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(patient)}
                  className="bg-yellow-500 text-white p-1 rounded mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
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

export default PatientPage;
