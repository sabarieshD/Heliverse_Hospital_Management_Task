// src/components/PatientForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = ({ patient, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    diseases: patient?.diseases || '',
    allergies: patient?.allergies || '',
    roomNumber: patient?.roomNumber || '',
    bedNumber: patient?.bedNumber || '',
    floorNumber: patient?.floorNumber || '',
    age: patient?.age || '',
    gender: patient?.gender || '',
    contactInfo: patient?.contactInfo || '',
    emergencyContact: patient?.emergencyContact || '',
    others: patient?.others || '',
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
    if (patient) {
      await axios.put(`http://localhost:5000/patients/${patient.id}`, formData);
    } else {
      await axios.post('http://localhost:5000/patients', formData);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{patient ? 'Edit' : 'Add'} Patient</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Patient Name"
          className="input-field"
        />
        <input
          type="text"
          name="diseases"
          value={formData.diseases}
          onChange={handleChange}
          placeholder="Diseases"
          className="input-field"
        />
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Allergies"
          className="input-field"
        />
        <input
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          className="input-field"
        />
        <input
          type="text"
          name="bedNumber"
          value={formData.bedNumber}
          onChange={handleChange}
          placeholder="Bed Number"
          className="input-field"
        />
        <input
          type="text"
          name="floorNumber"
          value={formData.floorNumber}
          onChange={handleChange}
          placeholder="Floor Number"
          className="input-field"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="input-field"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          placeholder="Contact Information"
          className="input-field"
        />
        <input
          type="text"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          placeholder="Emergency Contact"
          className="input-field"
        />
        <input
          type="text"
          name="others"
          value={formData.others}
          onChange={handleChange}
          placeholder="Others"
          className="input-field"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        {patient ? 'Update Patient' : 'Add Patient'}
      </button>
    </form>
  );
};

export default PatientForm;
