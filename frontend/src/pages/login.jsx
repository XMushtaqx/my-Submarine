import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FaGoogle, FaApple, FaGithub, FaFingerprint } from "react-icons/fa";
import { GlassCard } from "../components/ui/GlassCard";
import { OceanButton } from "../components/ui/OceanButton";
import OceanBackground from "../components/ui/OceanBackground.jsx"; 
import API from '../api/api';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background: transparent;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  width: 100%;

  label {
    font-size: 0.85rem;
    color: #4da6ff;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  input {
    background: rgba(0, 15, 45, 0.4);
    border: 1px solid rgba(77, 166, 255, 0.2);
    border-radius: 12px;
    padding: 1rem;
    color: white;
    font-size: 1rem;
    width: 100%;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4da6ff;
      background: rgba(0, 15, 45, 0.6);
      box-shadow: 0 0 15px rgba(77, 166, 255, 0.2);
    }
  }
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialIconButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(77, 166, 255, 0.2);
  border-radius: 12px;
  padding: 0.8rem;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;

  &:hover {
    background: rgba(77, 166, 255, 0.15);
    border-color: #4da6ff;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 77, 77, 0.1);
  border: 1px solid rgba(255, 77, 77, 0.3);
  color: #ff4d4d;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added password state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Added error handling

  const handleNext = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
        setError("");
        setStep("password");
    } else {
        setError("Please enter a valid Submarine ID");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 🔗 Hit the backend login route
      const response = await API.post('/auth/login', { email, password });
      
      // 💾 Store the token and login status
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("isLoggedIn", "true");
      
      // 🚀 Navigate to home/dashboard
      navigate("/");
    } catch (err) {
      // 🛑 Catch and show backend errors
      setError(err.response?.data?.message || "Uplink failed. Verify credentials.");
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <OceanBackground />

      <GlassCard style={{ 
        maxWidth: '420px', 
        width: '100%', 
        padding: '2.5rem', 
        position: 'relative', 
        zIndex: 10 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', letterSpacing: '2px' }}>WELCOME BACK</h1>
          <p style={{ color: 'rgba(160, 200, 255, 0.6)', fontSize: '0.9rem' }}>Re-establish deep-sea connection</p>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={step === "email" ? handleNext : handleLogin}>
          {step === "email" ? (
            <InputGroup>
              <label>Submarine ID</label>
              <input 
                type="email" 
                placeholder="commander@depths.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </InputGroup>
          ) : (
            <>
              <div style={{ marginBottom: '1rem', color: '#4da6ff', fontSize: '0.8rem' }}>
                LOGGING IN AS: <b style={{color: 'white'}}>{email}</b>
                <button 
                  type="button"
                  onClick={() => { setStep("email"); setError(""); }} 
                  style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#4da6ff', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Change
                </button>
              </div>
              <InputGroup>
                <label>Security Key</label>
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    autoFocus 
                />
              </InputGroup>
            </>
          )}

          <OceanButton variant="primary" type="submit" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? "AUTHORIZING..." : step === "email" ? "CONTINUE" : "ACCESS TERMINAL"}
          </OceanButton>
        </form>

        <div style={{ position: 'relative', margin: '2rem 0', textAlign: 'center' }}>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(77, 166, 255, 0.2)' }} />
          <span style={{ 
            position: 'absolute', 
            top: '-10px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            background: '#0a1932', 
            padding: '0 10px', 
            fontSize: '0.7rem', 
            color: 'rgba(77, 166, 255, 0.5)' 
          }}>
            OR UPLINK VIA
          </span>
        </div>

        <SocialGrid>
          <SocialIconButton type="button" title="Google"><FaGoogle /></SocialIconButton>
          <SocialIconButton type="button" title="GitHub"><FaGithub /></SocialIconButton>
          <SocialIconButton type="button" title="Fingerprint"><FaFingerprint /></SocialIconButton>
        </SocialGrid>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(160, 200, 255, 0.5)' }}>
          New explorer? <Link to="/register" style={{ color: '#4da6ff', fontWeight: 'bold' }}>JOIN US!</Link>
        </div>
      </GlassCard>
    </PageWrapper>
  );
}