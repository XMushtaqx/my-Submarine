import React from "react";
import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% { 
    transform: translateY(100vh) scale(0.5); 
    opacity: 0; 
  }
  50% { 
    opacity: 0.8; 
  }
  100% { 
    transform: translateY(-20vh) scale(1.2); 
    opacity: 0; 
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0; /* Keeping it at 0 so we can see it for now */
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, #0a192f 0%, #020617 100%);
`;

const Bubble = styled.div`
  position: absolute;
  bottom: -100px;
  background: rgba(77, 166, 255, 0.6); /* Increased opacity from 0.15 to 0.6 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Added a border to make them visible */
  border-radius: 50%;
  filter: blur(2px); /* Reduced blur so they are sharper */
  animation: ${float} infinite linear;
`;

const OceanBackground = () => {
  // Creating a simple array for testing
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    width: Math.random() * 40 + 20,
    left: Math.random() * 100,
    duration: Math.random() * 5 + 5, // Faster speed for testing
    delay: Math.random() * 5,
  }));

  return (
    <BackgroundContainer>
      {/* Test Text */}
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(77,166,255,0.2)', fontSize: '5rem', fontWeight: 'bold', pointerEvents: 'none'}}>
        WATER LAYER
      </div>

      {bubbles.map((b) => (
        <Bubble
          key={b.id}
          style={{
            width: `${b.width}px`,
            height: `${b.width}px`,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default OceanBackground;