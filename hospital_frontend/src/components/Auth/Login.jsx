import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // localStorage.setItem('email', email);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const history = useHistory();

  // useEffect(() => {
  //   console.log('Current location:', location.pathname);
  // }, [location]);

  const handleLogin = async (e) => {
        e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/authenticate', { email, password });
      // localStorage.setItem('email', response.data.email);
      if (response.status === 200) {
        // Save token and role to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('email',email);
        console.log(response.data.email);
        // localStorage.setItem('email', response.data.email);
        
        // Redirect based on the role
        if (response.data.role === 'admin') {
          console.log("in");
          // localStorage.setItem('email', email);
          // window.location.href = '/patients'; 
          window.history.pushState({}, '', '/patients');
          window.location.replace("/patients");
          // navigate('/patients');
          console.log("out")
        } else if (response.data.role === 'pantrystaff') {
          navigate('/pantryStaff');
          window.history.pushState({}, '', '/Dashboard');
          window.location.replace("/Dashboard");
        } else {
          navigate('/deliveryAgent');
          window.history.pushState({}, '', '/Dashboard');
          window.location.replace("/Dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
