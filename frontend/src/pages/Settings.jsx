import React, { useState, useEffect } from 'react';
// 🛠️ FIX 1: Use your centralized API instance, NOT raw axios
import API from '../api/api'; 
import styled, { keyframes } from 'styled-components';
import { 
  FaPowerOff, FaMicrochip, FaUserAstronaut, FaCompass, FaSave,
  FaUserNinja, FaUserSecret, FaUserShield, FaSkullCrossbones,
  FaAnchor, FaLifeRing, FaRobot, FaLock, FaEnvelope
} from 'react-icons/fa';

// --- ANIMATIONS ---
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

// --- STYLED COMPONENTS ---
const SettingsWrapper = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  color: white;
  font-family: 'JetBrains Mono', monospace;
`;

const MainConsole = styled.div`
  background: rgba(10, 25, 50, 0.4);
  border: 2px solid rgba(77, 166, 255, 0.3);
  border-radius: 30px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(77, 166, 255, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: rgba(77, 166, 255, 0.5);
    animation: ${scanline} 8s linear infinite;
    opacity: 0.1;
  }
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
`;

const TactilePanel = styled.div`
  background: rgba(0, 15, 30, 0.6);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(77, 166, 255, 0.2);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(77, 166, 255, 0.5);
  }
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

const AvatarSticker = styled.div`
  aspect-ratio: 1;
  background: ${props => props.$selected ? 'rgba(77, 166, 255, 0.2)' : 'rgba(0,0,0,0.3)'};
  border: 2px solid ${props => props.$selected ? '#4da6ff' : 'rgba(77, 166, 255, 0.1)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.$selected ? '#4da6ff' : 'rgba(255,255,255,0.3)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #4da6ff;
    border-color: #4da6ff;
  }
`;

const Label = styled.label`
  font-size: 0.7rem;
  color: #4da6ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const GlassInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(77, 166, 255, 0.2);
  padding: 12px;
  border-radius: 10px;
  color: white;
  margin-bottom: 15px;
  outline: none;
  &:focus { border-color: #4da6ff; }
`;

const HeavyToggle = styled.div`
  width: 60px;
  height: 30px;
  background: ${props => props.$on ? 'rgba(74, 222, 128, 0.2)' : 'rgba(0,0,0,0.4)'};
  border-radius: 15px;
  border: 2px solid ${props => props.$on ? '#4ade80' : '#2a3038'};
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    left: ${props => props.$on ? '32px' : '4px'};
    top: 3px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
  }
`;

const SaveButton = styled.button`
  background: linear-gradient(145deg, #0055ff, #0033aa);
  color: white;
  padding: 15px 40px;
  border-radius: 15px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  &:disabled { opacity: 0.5; }
`;

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [pilotName, setPilotName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [stealthMode, setStealthMode] = useState(false);

  const avatars = [
    { id: 0, icon: <FaUserAstronaut />, label: "Commanding Officer" },
    { id: 1, icon: <FaAnchor />, label: "Deep Sea Specialist" },
    { id: 2, icon: <FaUserShield />, label: "Tactical Security" },
    { id: 3, icon: <FaUserNinja />, label: "Infiltration Unit" },
    { id: 4, icon: <FaUserSecret />, label: "Intelligence Agent" },
    { id: 5, icon: <FaRobot />, label: "Tech Specialist" },
    { id: 6, icon: <FaLifeRing />, label: "Vessel Pilot" },
    { id: 7, icon: <FaSkullCrossbones />, label: "Ghost Crew" }
  ];

  // 🛰️ LOAD DATA FROM BACKEND
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // API instance automatically handles baseURL and Headers
        const res = await API.get('/user/me'); 
        setPilotName(res.data.name);
        setUserEmail(res.data.email);
        setSelectedAvatar(res.data.avatarId || 0);
        setStealthMode(res.data.stealthMode || false);
      } catch (err) {
        console.error("HQ Sync Error:", err);
      }
    };
    fetchProfile();
  }, []);

  // 🚀 COMMIT CHANGES TO BACKEND
  const handleCommitSettings = async () => {
    setLoading(true);
    try {
      const payload = { 
        name: pilotName, 
        avatarId: selectedAvatar, 
        stealthMode 
      };
      
      // Only send password if the user typed something
      if (password.trim().length >= 6) {
        payload.password = password;
      }

      // Hits http://localhost:5000/api/v1/user/update-profile
      await API.patch('/user/update-profile', payload);
      
      alert("✅ TELEMETRY UPDATED: Pilot credentials stored.");
      setPassword(""); 
    } catch (err) {
      console.error("Update Error:", err);
      alert("❌ COMMS FAILURE: " + (err.response?.data?.message || "Check Console"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsWrapper>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ letterSpacing: '5px', fontWeight: '900' }}>SYSTEM CONTROL</h1>
        <p style={{ color: '#4da6ff', fontSize: '0.8rem', opacity: 0.7 }}>PRIMARY CONFIGURATION INTERFACE</p>
      </header>

      <MainConsole>
        <ModuleGrid>
          {/* PROFILE MODULE */}
          <TactilePanel>
            <Label><FaUserAstronaut /> Pilot Designation</Label>
            <GlassInput 
              value={pilotName} 
              onChange={(e) => setPilotName(e.target.value)} 
              placeholder="PILOT_ID"
            />
            <Label><FaEnvelope /> Comms Frequency</Label>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}>
              {userEmail || "NO_DATA@HQ"}
            </div>
          </TactilePanel>

          {/* AVATAR SELECTION */}
          <TactilePanel>
            <Label><FaMicrochip /> Platoon Insignia</Label>
            <AvatarGrid>
              {avatars.map((avatar) => (
                <AvatarSticker 
                  key={avatar.id} 
                  $selected={selectedAvatar === avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                >
                  {avatar.icon}
                </AvatarSticker>
              ))}
            </AvatarGrid>
            <p style={{ fontSize: '0.7rem', color: '#4ade80', marginTop: '10px', textAlign: 'center' }}>
              {avatars[selectedAvatar].label}
            </p>
          </TactilePanel>

          {/* SECURITY & STEALTH */}
          <TactilePanel>
            <Label><FaLock /> Access Encryption</Label>
            <GlassInput 
              type="password" 
              placeholder="NEW_PASSWORD_MIN_6" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label><FaCompass /> Stealth Protocols</Label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
               <span style={{ fontSize: '0.7rem' }}>{stealthMode ? "CLOAKING ACTIVE" : "BROADCAST ON"}</span>
               <HeavyToggle $on={stealthMode} onClick={() => setStealthMode(!stealthMode)} />
            </div>
          </TactilePanel>

          {/* DANGER ZONE */}
          <TactilePanel style={{ border: '1px solid rgba(248, 113, 113, 0.3)', background: 'rgba(50, 0, 0, 0.2)' }}>
            <Label style={{ color: '#f87171' }}><FaPowerOff /> Emergency Eject</Label>
            <button 
              onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
              style={{ background: 'transparent', border: '1px solid #f87171', color: '#f87171', padding: '12px', width: '100%', borderRadius: '12px', cursor: 'pointer', marginTop: '10px' }}
            >
              INITIATE PURGE
            </button>
          </TactilePanel>
        </ModuleGrid>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <SaveButton onClick={handleCommitSettings} disabled={loading}>
            {loading ? "SYNCING..." : <><FaSave /> COMMIT SETTINGS</>}
          </SaveButton>
        </div>
      </MainConsole>
    </SettingsWrapper>
  );
}