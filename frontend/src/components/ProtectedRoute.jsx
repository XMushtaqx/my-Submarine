import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user has a token in storage
  const token = localStorage.getItem('token');

  // If no token exists, redirect to the login page
  if (!token) {
    console.warn("🛡️ Access Denied: No mission clearance detected. Redirecting...");
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children (the actual page)
  return children;
};

export default ProtectedRoute;