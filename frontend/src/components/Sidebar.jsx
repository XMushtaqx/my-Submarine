import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// FIX: Changed to $sidebarOpen to stop the React console error
const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${props => props.$sidebarOpen ? '280px' : '80px'};
  background: rgba(10, 25, 50, 0.5);
  backdrop-filter: blur(15px);
  border-right: 1px solid rgba(77, 166, 255, 0.15);
  box-shadow: inset -2px 0 15px rgba(0, 0, 0, 0.6), 5px 0 25px rgba(0,0,0,0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1100;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    transform: ${props => props.$sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
    width: 280px;
  }
`;

const LogoSection = styled.div`
  padding: 1.5rem;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(77, 166, 255, 0.1);
  white-space: nowrap; // Prevents logo text from wrapping
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.4rem 1rem;
  border-radius: 14px;
  color: #a0c8ff;
  text-decoration: none;
  transition: all 0.3s ease;
  gap: 1.2rem;
  white-space: nowrap; // Prevents labels from glitching during animation
  
  &.active {
    background: rgba(0, 0, 0, 0.25);
    color: #4da6ff;
    box-shadow: inset 3px 3px 6px rgba(0,0,0,0.5), inset -1px -1px 2px rgba(255,255,255,0.05);
    border: 1px solid rgba(77, 166, 255, 0.1);
  }

  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.03);
    transform: translateX(5px);
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: -10px;
  top: 40px;
  width: 20px;
  height: 40px;
  background: #4da6ff;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(77, 166, 255, 0.5);
  color: white;
  z-index: 10;
`;

const BottomSection = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(77, 166, 255, 0.1);
  margin-top: auto; 
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: calc(100% - 2rem);
  padding: 1rem 1.5rem;
  margin: 0.5rem 1rem;
  border-radius: 14px;
  background: rgba(255, 77, 77, 0.05);
  color: #ff8585;
  border: 1px solid rgba(255, 77, 77, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 1.2rem;
  font-family: inherit;
  /* Use the $ prop here too */
  justify-content: ${props => props.$sidebarOpen ? 'flex-start' : 'center'};
  white-space: nowrap;

  &:hover {
    background: rgba(255, 77, 77, 0.15);
    box-shadow: 0 0 15px rgba(255, 77, 77, 0.2);
    transform: translateX(5px);
  }
`;

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/', icon: '🏠', label: 'Dashboard' },
    { path: '/jobs', icon: '📁', label: 'Jobs' },
    { path: '/analytics', icon: '📊', label: 'Analytics' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/login');
  };

  return (
    /* Pass the prop with the $ prefix to the container */
    <SidebarContainer $sidebarOpen={sidebarOpen}>
      <LogoSection>
        <span style={{fontSize: '1.5rem'}}>🌊</span>
        {sidebarOpen && <span style={{fontWeight: 800, color: '#4da6ff'}}>OCEAN DEPTHS</span>}
      </LogoSection>

      <ToggleButton onClick={toggleSidebar}>{sidebarOpen ? '◀' : '▶'}</ToggleButton>

      <div style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
        {menuItems.map(item => (
          <NavItem key={item.path} to={item.path}>
            <span style={{minWidth: '24px', textAlign: 'center'}}>{item.icon}</span>
            {sidebarOpen && <span>{item.label}</span>}
          </NavItem>
        ))}
      </div>

      <BottomSection>
        {/* Pass the prop with the $ prefix to the button */}
        <LogoutButton onClick={handleLogout} $sidebarOpen={sidebarOpen}>
          <span style={{minWidth: '24px', textAlign: 'center'}}>🚪</span>
          {sidebarOpen && <span>Logout</span>}
        </LogoutButton>
      </BottomSection>
    </SidebarContainer>
  );
}