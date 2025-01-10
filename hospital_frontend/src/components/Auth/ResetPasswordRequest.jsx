import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPasswordRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { email });
      setMessage('Password reset email has been sent.');
      setTimeout(() => navigate(`/reset-password/${response.data.token}`), 30000); // Navigate after success
    } catch (err) {
      setMessage('Error sending reset email');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {message && <div className="text-green-500 mb-2">{message}</div>}
      <form onSubmit={handleResetPasswordRequest}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordRequest;
