import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  /* THE FIX: Dynamic offset ensures zero overlap */
  left: ${props => props.sidebarOpen ? '280px' : '80px'};
  width: calc(100% - ${props => props.sidebarOpen ? '280px' : '80px'});
  
  height: 80px;
  background: rgba(15, 30, 60, 0.35);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(77, 166, 255, 0.1);
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 350px;
  
  input {
    width: 100%;
    /* SKEUOMORPHIC INNER SHADOW */
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(77, 166, 255, 0.1);
    box-shadow: inset 2px 2px 8px rgba(0,0,0,0.4);
    
    border-radius: 12px;
    padding: 0.7rem 1rem 0.7rem 2.8rem;
    color: white;
    transition: all 0.3s ease;

    &:focus {
      width: 400px;
      border-color: #4da6ff;
      box-shadow: inset 2px 2px 8px rgba(0,0,0,0.5), 0 0 15px rgba(77, 166, 255, 0.2);
    }
  }
`;

const NavIconBtn = styled.button`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  /* Tactile Button Look */
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.05);
  color: #a0c8ff;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { background: rgba(77, 166, 255, 0.1); color: #4da6ff; }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4d4d;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.7rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(255, 77, 77, 0.6);
`;

export default function Navbar({ sidebarOpen }) {
  return (
    <NavbarContainer sidebarOpen={sidebarOpen}>
      <SearchBox>
        <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)'}}>🔍</span>
        <input type="text" placeholder="Search the depths..." />
      </SearchBox>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavIconBtn>
          🔔 <Badge>3</Badge>
        </NavIconBtn>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '5px 15px', borderRadius: '30px', background: 'rgba(255,255,255,0.05)'}}>
          <div style={{ textAlign: 'right' }}>
            <div style={{fontSize: '0.85rem', fontWeight: 600}}>User_Admin</div>
            <div style={{fontSize: '0.65rem', color: '#4da6ff'}}>Pro Member</div>
          </div>
          <div style={{width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(45deg, #4da6ff, #122a5e)', border: '2px solid rgba(255,255,255,0.2)'}} />
        </div>
      </div>
    </NavbarContainer>
  );
}