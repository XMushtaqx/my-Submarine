import styled, { keyframes } from 'styled-components';

const liquidFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const WaveDivider = styled.div`
  height: ${props => props.height || '4px'};
  width: 100%;
  margin: ${props => props.margin || '2rem 0'};
  border-radius: 10px;
  
  /* Animated Liquid Gradient */
  background: linear-gradient(90deg, 
    rgba(77, 166, 255, 0) 0%, 
    rgba(77, 166, 255, 0.8) 50%, 
    rgba(77, 166, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: ${liquidFlow} 4s infinite linear;
  
  /* Skeuomorphic Shadow */
  box-shadow: 0 0 15px rgba(77, 166, 255, 0.3);
  position: relative;

  /* Floating bioluminescent droplet */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 12px white;
    animation: pulse 2s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.5; }
    50% { transform: translateY(-50%) scale(1.5); opacity: 1; }
  }
`;