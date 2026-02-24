import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@700;800&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    font-family: ${props => props.theme.typography.fontFamily.primary};
    /* Bottom Layer */
    background: ${props => props.theme.colors.gradientPrimary}; 
    color: ${props => props.theme.colors.textPrimary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    position: relative;
    overflow-y: auto;
    background-attachment: fixed;
  }

  /* Layer -3: Starry Background (Deepest) */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -3; 
    background-image: 
      radial-gradient(white 1px, transparent 1px),
      radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
      radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px);
    background-size: 50px 50px, 30px 30px, 20px 20px;
    background-position: 0 0, 15px 15px, 5px 5px;
    opacity: 0.2;
  }

  /* Layer -2: Depth Lines (Middle) */
  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -2; 
    background: repeating-linear-gradient(
      180deg,
      transparent,
      transparent 2px,
      rgba(15, 35, 80, 0.1) 2px,
      rgba(15, 35, 80, 0.1) 4px
    );
    opacity: 0.15;
  }

  /* NOTE: Floating Bubbles should be at z-index: -1 
     This puts them ABOVE the stars/lines but BEHIND your UI.
  */

  /* --- UI Transparency Fixes --- */
  #root, .app-container, main, section {
    background: transparent !important;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(10, 25, 50, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.cyan}44;
    border-radius: 10px;
    border: 1px solid rgba(77, 166, 255, 0.2);
    backdrop-filter: blur(5px);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.cyan}88;
  }

  /* Selection Color */
  ::selection {
    background: ${props => props.theme.colors.cyan};
    color: ${props => props.theme.colors.abyss};
  }

  /* Global Reset for Buttons & Inputs */
  button, input, textarea {
    font-family: inherit;
  }

  /* Animation Classes */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;