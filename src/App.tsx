
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import AdminProfile from "./pages/profile/AdminProfile";
import LinkupStats from './pages/linkups/Stats';
import Linkups from './pages/Linkups';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/profile" element={<AdminProfile />} />
        {/* Add dashboard as the main starting route */}
        <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
        {/* Make sure nested routes point to their correct components */}
        <Route path="/users/management" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Navigate to="/users/1" replace />} />
        
        {/* Add Linkup routes */}
        <Route path="/linkups" element={<Linkups />} />
        <Route path="/linkups/statistics" element={<LinkupStats />} />
        <Route path="/linkups/management" element={<Navigate to="/linkups" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
