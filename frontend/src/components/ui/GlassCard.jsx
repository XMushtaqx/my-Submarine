import styled from 'styled-components';

export const GlassCard = styled.div`
  background: ${props => props.theme.glassmorphism.base.background};
  backdrop-filter: blur(15px); /* Deep refraction */
  -webkit-backdrop-filter: blur(15px);
  
  /* SKEUOMORPHIC EDGE: Brighter on top/left, darker on bottom/right */
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  
  border-radius: ${props => props.theme.borders.radius.lg};
  padding: ${props => props.padding || props.theme.spacing.lg};
  
  /* INNER DEPTH: Makes the card look like a thick slab */
  box-shadow: 
    ${props => props.theme.glassmorphism.base.boxShadow},
    inset 2px 2px 10px rgba(255, 255, 255, 0.05),
    inset -2px -2px 10px rgba(0, 0, 0, 0.2);
    
  transition: all ${props => props.theme.animations.duration.normal} cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: ${props => props.hoverable ? 'translateY(-6px) scale(1.01)' : 'none'};
    background: rgba(20, 45, 100, 0.45);
    box-shadow: 0 20px 50px rgba(0, 10, 30, 0.9), 0 0 30px rgba(77, 166, 255, 0.2);
  }

  ${props => props.fullWidth && 'width: 100%;'}
  ${props => props.centered && 'margin: 0 auto;'}
`;