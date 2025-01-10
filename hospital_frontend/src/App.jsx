import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import PatientPage from './pages/PatientPage';
import PantryStaffPage from './pages/PantryStaffPage';
import DeliveryAgentPage from './pages/DeliveryAgentPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPasswordRequest';
import RoleBasedContent from './pages/RoleBasedComponent';
import ResetPasswordWithToken from './components/Auth/ResetPasswordWithToken';
import FetchDeliveryAgent from './pages/FetchDeliveryAgent';
import Dashboard from './pages/Dashboard';

function App() {
  // const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Synchronize localStorage with state
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = (newToken, newRole, email) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    localStorage.setItem('email', email);
    setToken(newToken);
    setRole(newRole);
    
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setToken(null);
    setRole(null);
    navigate('/login', { replace: true });
  };

  const isAuthenticated = token && role;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        {/* Navigation */}
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <li><Link to="/profile">Profile</Link></li>
                {role === 'admin' && (
                  <>
                    <li><Link to="/Dashboard">Dashboard</Link></li>
                    <li><Link to="/patients">Patient Management</Link></li>
                    <li><Link to="/pantryStaff">Pantry Staff Management</Link></li>
                    <li><Link to="/deliveryAgent">Delivery Agent Management</Link></li>
                  </>
                )}
                {role === 'pantrystaff' && (
                  <>
                    <li><Link to="/pantryStaff">Pantry Staff Management</Link></li>
                    <li><Link to="/deliveryAgent">Delivery Agent Management</Link></li>
                  </>
                )}
                {role === 'deliveryagent' && (
                  <li><Link to="/deliveryAgent">Delivery Agent Management</Link></li>
                )}
                
                <li><button onClick={handleLogout}>Logout</button></li>
                
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/reset-password">Reset Password</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password/:token" element={<ResetPasswordWithToken />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Protected Routes */}
              {role === 'admin' && (
                <>
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/patients" element={<PatientPage />} />
                  <Route path="/pantryStaff" element={<PantryStaffPage />} />
                  <Route path="/deliveryAgent" element={<DeliveryAgentPage />} />
                </>
              )}
              {role === 'pantrystaff' && (
                <>
                  <Route path="/pantryStaff" element={<PantryStaffPage />} />
                  <Route path="/deliveryAgent" element={<DeliveryAgentPage />} />
                </>
              )}
              {role === 'deliveryagent' && (
                <Route path="/deliveryAgent" element={<FetchDeliveryAgent />} />
              )}
              <Route path="*" element={<Navigate to="/profile" replace />} />
            </>
          )}

          {/* Fallback Route */}
          <Route path="/profile" element={<RoleBasedContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
