import styled, { keyframes, css } from "styled-components";

// 1. The Sonar Animation
const sonar = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;

export const OceanButton = styled.button`
  position: relative; /* Essential for the sonar ring positioning */
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #4da6ff;
  background: rgba(0, 15, 45, 0.6);
  color: #4da6ff;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  overflow: visible; /* Allows the pulse to expand outside the button */
  transition: all 0.3s ease;
  z-index: 1;

  /* The Hover Glow */
  &:hover {
    background: rgba(77, 166, 255, 0.2);
    box-shadow: 0 0 20px rgba(77, 166, 255, 0.4);
    color: white;
  }

  /* 2. The Sonar Ring */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    border: 2px solid #4da6ff;
    opacity: 0;
    z-index: -1;
  }

  /* 3. Trigger Sonar on Hover or Loading */
  &:hover::after {
    animation: ${sonar} 1.2s infinite ease-out;
  }

  /* 4. Pulse faster when isLoading is true */
  ${props => props.disabled && css`
    opacity: 0.7;
    cursor: not-allowed;
    &::after {
      animation: ${sonar} 0.8s infinite ease-out;
    }
  `}
`;