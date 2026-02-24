import React from 'react';
import styled from 'styled-components';
import { useJobs } from '../context/JobContext';
import { FaGlobe, FaComments, FaAward, FaChevronRight } from 'react-icons/fa';

// --- ADVANCED SKEUOMORPHIC COMPONENTS ---

const DashboardWrapper = styled.div`
  animation: fadeIn 0.8s ease-out;
`;

const HeaderSection = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const StatCard = styled.div`
  ${props => props.theme.glassmorphism.card};
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border: 1px solid rgba(77, 166, 255, 0.15);
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.3),
    0 10px 30px rgba(0, 0, 0, 0.5);
  
  /* Apply the Float Animation */
  animation: ${props => props.theme.animations.keyframes.float} 6s infinite ease-in-out;
  animation-delay: ${props => props.delay || '0s'};
  
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 4px;
    background: ${props => props.color || props.theme.colors.cyan};
    box-shadow: 0 0 15px ${props => props.color || props.theme.colors.cyan};
  }

  &:hover {
    border-color: ${props => props.color || props.theme.colors.cyan};
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  color: rgba(160, 200, 255, 0.6);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 800;
  margin: 0;
`;

const Count = styled.div`
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  font-family: 'JetBrains Mono', monospace;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
`;

const VisualRing = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  circle {
    fill: none;
    stroke-width: 6;
    stroke-linecap: round;
  }

  .bg { stroke: rgba(255, 255, 255, 0.05); }
  .progress { 
    stroke: ${props => props.color || props.theme.colors.cyan}; 
    stroke-dasharray: 226;
    stroke-dashoffset: ${props => 226 - (226 * props.percentage) / 100};
    transition: stroke-dashoffset 1s ease-out;
    filter: drop-shadow(0 0 5px ${props => props.color || props.theme.colors.cyan});
  }

  .icon {
    position: absolute;
    color: white;
    font-size: 1.2rem;
    opacity: 0.8;
  }
`;

const MissionLogPreview = styled.div`
  ${props => props.theme.glassmorphism.card};
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid rgba(77, 166, 255, 0.1);
  
  h4 {
    color: #4da6ff;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

// --- DASHBOARD COMPONENT ---

export default function Dashboard() {
  const { jobs } = useJobs();

  // Dynamic Intelligence
  const totalMissions = jobs.length;
  const interviews = jobs.filter(j => j.status === 'Interview').length;
  const offers = jobs.filter(j => j.status === 'Offer').length;
  
  // Percentages for the Rings
  const interviewRate = totalMissions > 0 ? (interviews / totalMissions) * 100 : 0;
  const offerRate = totalMissions > 0 ? (offers / totalMissions) * 100 : 0;

  return (
    <DashboardWrapper>
      <HeaderSection>
        <div>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>
            COMMAND CENTER
          </h1>
          <p style={{ color: 'rgba(77, 166, 255, 0.5)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            Mission Briefing // Live Telemetry
          </p>
        </div>
      </HeaderSection>

      <Container>
        {/* Total Apps Card */}
        <StatCard delay="0s" color="#4da6ff">
          <Info>
            <Title>Total Deployments</Title>
            <Count>{totalMissions}</Count>
          </Info>
          <VisualRing color="#4da6ff" percentage={100}>
            <svg>
              <circle className="bg" cx="40" cy="40" r="36" />
              <circle className="progress" cx="40" cy="40" r="36" />
            </svg>
            <FaGlobe className="icon" />
          </VisualRing>
        </StatCard>

        {/* Interviews Card */}
        <StatCard delay="0.5s" color="#4ade80">
          <Info>
            <Title>Active Comms</Title>
            <Count>{interviews}</Count>
          </Info>
          <VisualRing color="#4ade80" percentage={interviewRate}>
            <svg>
              <circle className="bg" cx="40" cy="40" r="36" />
              <circle className="progress" cx="40" cy="40" r="36" />
            </svg>
            <FaComments className="icon" />
          </VisualRing>
        </StatCard>

        {/* Offers Card */}
        <StatCard delay="1s" color="#facc15">
          <Info>
            <Title>Targets Secured</Title>
            <Count>{offers}</Count>
          </Info>
          <VisualRing color="#facc15" percentage={offerRate}>
            <svg>
              <circle className="bg" cx="40" cy="40" r="36" />
              <circle className="progress" cx="40" cy="40" r="36" />
            </svg>
            <FaAward className="icon" />
          </VisualRing>
        </StatCard>
      </Container>

      {/* QUICK STATUS BAR */}
      <MissionLogPreview>
        <h4><FaChevronRight size={12}/> SYSTEM STATUS</h4>
        <div style={{ display: 'flex', gap: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
           <span>{totalMissions} Records Found</span>
           <span>|</span>
           <span style={{color: '#4ade80'}}>{interviews} Pending Interviews</span>
           <span>|</span>
           <span style={{color: '#facc15'}}>{offers} Successful Extractions</span>
        </div>
      </MissionLogPreview>
    </DashboardWrapper>
  );
}