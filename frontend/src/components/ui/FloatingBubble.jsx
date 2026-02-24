import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// 1. Natural Fluid Movement
const riseAndDrift = keyframes`
  0% {
    transform: translateY(0) translateX(0) scale(0.5);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  50% {
    /* Slight horizontal drift to simulate water currents */
    transform: translateY(-50vh) translateX(30px) scale(1);
  }
  85% {
    opacity: 1;
  }
  100% {
    /* Ensures it clears the top of the screen */
    transform: translateY(-110vh) translateX(-15px) scale(1.2);
    opacity: 0;
  }
`;

// 2. The Star Twinkle Effect
const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const BubbleWrapper = styled.div`
  position: absolute;
  bottom: -100px; /* Start below the viewport */
  left: ${props => props.left || '50%'};
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  pointer-events: none;
  z-index: -1;

  /* SKEUOMORPHIC STYLE: 
     - Radial gradient for the shell
     - Backdrop filter for 'Refraction' (blurring background)
     - Inner shadow for volume
  */
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(77, 166, 255, 0.1) 40%,
    rgba(12, 45, 100, 0) 70%
  );
  
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  
  box-shadow: 
    0 0 20px rgba(77, 166, 255, 0.2),
    inset -3px -3px 8px rgba(0, 0, 0, 0.3);

  /* Applying the Rise Animation */
  animation: ${css`${riseAndDrift} ${props => props.duration || '15s'} infinite linear`};
  animation-delay: ${props => props.delay || '0s'};

  /* The "Bioluminescent Star" inside the bubble */
  &::after {
    content: '';
    position: absolute;
    top: 25%;
    left: 25%;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px white;
    animation: ${twinkle} 2s infinite ease-in-out;
  }
`;

export default function FloatingBubble({ size, left, duration, delay }) {
  return (
    <BubbleWrapper 
      size={size} 
      left={left} 
      duration={duration} 
      delay={delay} 
    />
  );
}