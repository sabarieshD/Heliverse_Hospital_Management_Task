import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoleBasedContent = () => {
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/patients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContent(response.data.message);
        setRole(localStorage.getItem('role'));
      } catch (error) {
        setContent('You are not authorized to view this content.');
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Role-Based Content</h1>
      <div>{content}</div>
      <div>Your role: {role}</div>
    </div>
  );
};

export default RoleBasedContent;
