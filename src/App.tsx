
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import AdminProfile from "./pages/profile/AdminProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/profile" element={<AdminProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
