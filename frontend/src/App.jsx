import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/Globalstyles';
import { darkTheme } from './theme/theme';

// Layout & Pages
import MainLayout from "./layouts/Mainlayouts";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Jobs from "./pages/Jobs";

import Analytics from "./pages/Analytics"; // New Analytics Page
import Settings from "./pages/Settings"; // New Settings Page 

// THE DATA CORE
import { JobProvider } from './context/JobContext';

const ProtectedRoute = ({ children }) => {
  // Check for the actual token and the login flag
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // They need BOTH a valid session flag AND a token keycard to enter
  return (isLoggedIn && token) ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* 🌊 JobProvider must be INSIDE ThemeProvider but OUTSIDE Routes */}
      <JobProvider>
        <GlobalStyles />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/analytics" element={<Analytics />} />
           <Route path="/settings" element={<Settings />} />

          </Route>

          {/* 404 Handler */}
          <Route path="*" element={
            <div style={{color: 'white', padding: '100px', textAlign: 'center'}}>
              <h2 style={{color: '#4da6ff'}}>404 - LOST AT SEA</h2>
              <p>The coordinates you entered do not exist.</p>
            </div>
          } />
        </Routes>
      </JobProvider>
    </ThemeProvider>
  );
}

export default App;