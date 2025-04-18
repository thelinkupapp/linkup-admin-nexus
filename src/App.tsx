
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import AdminProfile from "./pages/profile/AdminProfile";
import LinkupStats from './pages/linkups/Stats';
import Linkups from './pages/Linkups';
import UserManagement from './pages/users/Management';
import LinkupManagement from './pages/linkups/Management';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminProfile />} />
        
        {/* User routes */}
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/management" element={<UserManagement />} />
        
        {/* Profile routes */}
        <Route path="/profile" element={<AdminProfile />} />
        
        {/* Linkup routes */}
        <Route path="/linkups" element={<Linkups />} />
        <Route path="/linkups/statistics" element={<LinkupStats />} />
        <Route path="/linkups/management" element={<LinkupManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
