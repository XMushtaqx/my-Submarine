import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import FloatingBubble from '../components/ui/FloatingBubble.jsx'; // Use the polished component!
import styled, { createGlobalStyle } from 'styled-components';

const LayoutGlobalOverride = createGlobalStyle`
  body {
    overflow-y: auto;
    position: relative;
    /* Ensure no solid colors block the view */
    background: transparent !important; 
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  /* This ensures the container creates a new stacking context */
  z-index: 0; 
  background: transparent;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-left: ${props => props.sidebarOpen ? '280px' : '80px'};
  margin-top: 70px;
  background: transparent; /* CRITICAL */
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const BubbleBackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1; /* Sits exactly between the Starry Body and the UI */
`;

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <>
      <LayoutGlobalOverride />
      <LayoutContainer>
        {/* THE EFFECT LAYER */}
        <BubbleBackgroundLayer>
          {[...Array(20)].map((_, i) => (
            <FloatingBubble
              key={i}
              size={`${Math.random() * 50 + 15}px`}
              left={`${Math.random() * 100}%`}
              duration={`${Math.random() * 10 + 12}s`}
              delay={`${Math.random() * 10}s`}
              opacity={0.4}
            />
          ))}
        </BubbleBackgroundLayer>

        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Navbar sidebarOpen={sidebarOpen} />
          <MainContent sidebarOpen={sidebarOpen}>
            <Outlet />
          </MainContent>
        </div>
      </LayoutContainer>
    </>
  );
}