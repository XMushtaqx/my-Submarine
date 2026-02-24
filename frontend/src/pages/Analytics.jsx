import React from 'react';
import styled from 'styled-components';
import { useJobs } from '../context/JobContext';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { FaChartLine, FaSatellite, FaBullseye, FaRadiation } from 'react-icons/fa';

// --- STYLED COMPONENTS ---

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  animation: fadeIn 0.8s ease-out;
`;

const StatCard = styled.div`
  ${props => props.theme.glassmorphism.card};
  padding: 1.5rem;
  border: 1px solid rgba(77, 166, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);

  h3 { 
    color: rgba(160, 200, 255, 0.6); 
    font-size: 0.7rem; 
    letter-spacing: 2px; 
    text-transform: uppercase; 
    margin-bottom: 0.5rem; 
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .value { 
    color: #4da6ff; 
    font-size: 2.5rem; 
    font-weight: 800; 
    font-family: 'JetBrains Mono', monospace; 
    text-shadow: 0 0 15px rgba(77, 166, 255, 0.5); 
  }
`;

const ChartContainer = styled.div`
  ${props => props.theme.glassmorphism.card};
  padding: 2rem;
  grid-column: span 2;
  border: 1px solid rgba(77, 166, 255, 0.15);
  min-height: 400px;
  box-shadow: inset 0 0 30px rgba(0,0,0,0.3);

  @media (max-width: 1100px) {
    grid-column: span 1;
  }
`;

const Heading = styled.h1`
  color: white;
  font-size: 2.2rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0;
`;

const SubText = styled.p`
  color: rgba(160, 200, 255, 0.5);
  letter-spacing: 2px;
  font-size: 0.8rem;
  margin-top: 5px;
  text-transform: uppercase;
`;

// --- MAIN COMPONENT ---

export default function Analytics() {
  const { jobs } = useJobs();

  // 1. Calculate Status Counts for Charts
  const statusData = [
    { name: 'Applied', value: jobs.filter(j => j.status === 'Applied').length, color: '#4da6ff' },
    { name: 'Interview', value: jobs.filter(j => j.status === 'Interview').length, color: '#4ade80' },
    { name: 'Offer', value: jobs.filter(j => j.status === 'Offer').length, color: '#facc15' },
    { name: 'Rejected', value: jobs.filter(j => j.status === 'Rejected').length, color: '#f87171' },
  ].filter(d => d.value > 0); 

  // 2. Calculate Stats
  const totalJobs = jobs.length;
  const successes = jobs.filter(j => j.status === 'Offer' || j.status === 'Interview').length;
  const successRate = totalJobs > 0 ? Math.round((successes / totalJobs) * 100) : 0;
  const rejections = jobs.filter(j => j.status === 'Rejected').length;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* HEADER SECTION - FIXED TAGS HERE */}
      <header style={{ marginBottom: '3rem' }}>
        <Heading>
          <FaSatellite style={{ color: '#4da6ff' }} /> ANALYTICS SONAR
        </Heading>
        <SubText>DATA INTERCEPT // REAL-TIME FREQUENCY</SubText>
      </header>

      {/* TOP STATS ROW */}
      <AnalyticsGrid style={{ marginBottom: '2rem' }}>
        <StatCard>
          <h3><FaBullseye /> Total Intercepts</h3>
          <div className="value">{totalJobs}</div>
        </StatCard>
        <StatCard>
          <h3><FaChartLine /> Success Probability</h3>
          <div className="value">{successRate}%</div>
        </StatCard>
        <StatCard>
          <h3><FaRadiation /> Critical Failures</h3>
          <div className="value">{rejections}</div>
        </StatCard>
      </AnalyticsGrid>

      {/* CHARTS ROW */}
      <AnalyticsGrid>
        {/* PIE CHART / SONAR */}
        <ChartContainer>
          <h3 style={{ color: 'white', marginBottom: '2rem', fontSize: '0.8rem', letterSpacing: '2px' }}>
            DEPLOYMENT DISTRIBUTION
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ filter: `drop-shadow(0 0 12px ${entry.color}88)` }} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#0a1932', 
                    border: '1px solid #4da6ff', 
                    borderRadius: '8px',
                    color: 'white' 
                  }}
                  itemStyle={{ color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* LEGEND */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '1.5rem' }}>
            {['Applied', 'Interview', 'Offer', 'Rejected'].map(status => {
              const data = statusData.find(d => d.name === status);
              if (!data) return null;
              return (
                <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: 'white' }}>
                  <div style={{ width: '10px', height: '10px', background: data.color, borderRadius: '50%', boxShadow: `0 0 10px ${data.color}` }} />
                  {status.toUpperCase()}
                </div>
              );
            })}
          </div>
        </ChartContainer>

        {/* BAR CHART / FREQUENCY */}
        <ChartContainer>
          <h3 style={{ color: 'white', marginBottom: '2rem', fontSize: '0.8rem', letterSpacing: '2px' }}>
            MISSION FREQUENCY
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(77, 166, 255, 0.1)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(160, 200, 255, 0.5)" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                  contentStyle={{ background: '#0a1932', border: '1px solid #4da6ff', borderRadius: '8px' }} 
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]}
                  barSize={45}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </AnalyticsGrid>
    </div>
  );
}