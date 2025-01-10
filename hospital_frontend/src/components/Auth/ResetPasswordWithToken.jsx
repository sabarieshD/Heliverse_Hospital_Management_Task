import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordWithToken = () => {
  const { token } = useParams();  // Get token from URL params
  const navigate = useNavigate();
  const [emailToken, setEmailToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [validToken, setValidToken] = useState(false);

  // Validate token when the component mounts
  useEffect(() => {
    const validateToken = async () => {
      try {
        // Make an API call to validate the token
        const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`);
        setValidToken(true);
        setMessage('Token is valid. You can now set your new password.');
      } catch (err) {
        setMessage('Invalid or expired token');
      }
    };

    if (token) {
      validateToken();
    }
  }, [token]);

  // Handle form submission to reset password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validToken) {
      setMessage('Please provide a valid token first');
      return;
    }

    try {
      // Send the new password to the backend to update the password
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${emailToken}`, { newPassword });
      setMessage('Password updated successfully');
      navigate('/login');  // Redirect to login page after successful password reset
    } catch (err) {
      setMessage('Error updating password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Reset Password</h1>

      {message && <div className="text-center text-red-500 mb-4">{message}</div>}

      {validToken ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Token Input Field */}
          <div>
            <label htmlFor="emailToken" className="block text-sm font-medium text-gray-700">
              Token (Received in Email)
            </label>
            <input
              type="text"
              id="emailToken"
              value={emailToken}
              onChange={(e) => setEmailToken(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* New Password Input Field */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      ) : (
        <div className="text-center text-red-500 mt-4">Please wait while we validate your token...</div>
      )}
    </div>
  );
};

export default ResetPasswordWithToken;
