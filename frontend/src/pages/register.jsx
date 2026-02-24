import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { OceanButton } from "../components/ui/OceanButton.jsx";
import OceanBackground from "../components/ui/OceanBackground.jsx";
import API from '../api/api'; 

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;

  label {
    font-size: 0.875rem;
    color: #4da6ff;
    font-weight: 500;
  }

  input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(77, 166, 255, 0.2);
    border-radius: 12px;
    padding: 0.8rem 1rem;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4da6ff;
      box-shadow: 0 0 10px rgba(77, 166, 255, 0.3);
      background: rgba(0, 0, 0, 0.4);
    }
    &::placeholder {
      color: rgba(77, 166, 255, 0.3);
    }
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  background-color: transparent; 
`;

export default function Register() {
  const navigate = useNavigate();
  // --- ADDED NAME STATE ---
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // 🔗 Payload now includes 'name' to satisfy Auth Controller
      const response = await API.post('/auth/register', {
        name,
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isLoggedIn", "true");
      
      console.log("Account created and token secured.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Uplink failed. Try a different ID.");
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <OceanBackground />

      <GlassCard style={{ maxWidth: '450px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ textAlign: 'center', color: 'white' }}>Create Account</h1>
          <p className="text-blue-300/70" style={{ textAlign: 'center', color: 'rgba(147, 197, 253, 0.7)' }}>Join the deep ocean community</p>
        </div>

        {error && (
          <div style={{ 
            marginBottom: '1rem', padding: '0.75rem', borderRadius: '8px', 
            background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', 
            color: '#fca5a5', fontSize: '0.875rem', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* --- NEW NAME FIELD --- */}
          <InputGroup>
            <label>Pilot Name</label>
            <input 
              type="text" 
              placeholder="e.g. Captain Nemo" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </InputGroup>

          <InputGroup>
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </InputGroup>

          <InputGroup>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </InputGroup>

          <InputGroup>
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </InputGroup>

          <OceanButton 
            variant="primary" 
            type="submit"
            disabled={isLoading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {isLoading ? "Synchronizing..." : "Create Account"}
          </OceanButton>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'rgba(147, 197, 253, 0.6)' }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: '#22d3ee', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
        </p>
      </GlassCard>
    </PageContainer>
  );
}