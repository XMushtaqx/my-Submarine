import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaPlus, FaEdit, FaTrash, FaBriefcase, FaTimes, FaSave, FaSearch, FaFilter } from "react-icons/fa";
import { OceanButton } from "../components/ui/OceanButton"; 
import { useJobs } from "../context/JobContext";

// --- STYLED COMPONENTS (RESTORED EXACTLY) ---

const ControlBar = styled.div`
  ${props => props.theme.glassmorphism.card};
  display: flex;
  gap: 1.5rem;
  padding: 1.2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(77, 166, 255, 0.15);
  align-items: center;
  flex-wrap: wrap;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.3);
`;

const SearchWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 15px;
    color: #4da6ff;
    opacity: 0.6;
  }

  input {
    width: 100%;
    background: rgba(0, 15, 45, 0.5);
    border: 1px solid rgba(77, 166, 255, 0.2);
    padding: 0.8rem 1rem 0.8rem 2.8rem;
    border-radius: 10px;
    color: white;
    outline: none;
    font-family: 'JetBrains Mono', monospace;
    transition: all 0.3s ease;

    &:focus {
      border-color: #4da6ff;
      box-shadow: 0 0 15px rgba(77, 166, 255, 0.2);
    }
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  label {
    color: rgba(160, 200, 255, 0.5);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }

  select {
    background: rgba(0, 15, 45, 0.8);
    border: 1px solid rgba(77, 166, 255, 0.3);
    color: white;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    font-size: 0.8rem;

    option { background: #020617; }
  }
`;

const JobGridCard = styled.div`
  ${props => props.theme.glassmorphism.card};
  padding: 0; 
  overflow: hidden;
  border: 1px solid rgba(77, 166, 255, 0.15);
  box-shadow: inset 0 0 30px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.5);
  margin-top: 1rem;
`;

const StatusSelect = styled.select`
  background: rgba(0, 15, 45, 0.8);
  color: ${props => {
    switch (props.value) {
      case 'Interview': return '#4ade80';
      case 'Applied': return '#4da6ff';
      case 'Rejected': return '#f87171';
      case 'Offer': return '#facc15';
      default: return 'white';
    }
  }};
  border: 1px solid currentColor;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  transition: all 0.3s ease;
  option { background-color: #020617; color: white; padding: 10px; }
  &:hover { filter: brightness(1.2); box-shadow: 0 0 15px currentColor; }
`;

const ActionButtonContainer = styled.div`
  display: flex; gap: 12px;
  .action-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white; width: 35px; height: 35px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s ease;
    box-shadow: 3px 3px 6px rgba(0,0,0,0.4), inset 1px 1px 1px rgba(255,255,255,0.1);
    &:hover { transform: translateY(-2px); border-color: #4da6ff; color: #4da6ff; box-shadow: 0 0 10px rgba(77, 166, 255, 0.4); }
    &.delete:hover { border-color: #f87171; color: #f87171; box-shadow: 0 0 10px rgba(248, 113, 113, 0.4); }
  }
`;

const StyledTable = styled.table`
  width: 100%; border-collapse: collapse;
  th {
    background: rgba(0, 15, 45, 0.6); text-align: left; padding: 1.2rem;
    color: ${props => props.theme.colors.cyan}; text-transform: uppercase;
    font-size: 0.7rem; letter-spacing: 2px; border-bottom: 2px solid rgba(77, 166, 255, 0.2);
  }
  td { padding: 1.2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.03); color: white; font-family: 'JetBrains Mono', monospace; }
  tr:hover td { background: rgba(77, 166, 255, 0.03); }
`;

const ModalOverlay = styled.div`
  position: fixed; inset: 0; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.3s ease;
`;

const ModalCard = styled.div`
  ${props => props.theme.glassmorphism.card};
  width: 90%; max-width: 500px; padding: 2rem; border: 1px solid rgba(77, 166, 255, 0.3);
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;
  label { color: #4da6ff; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
  input, select, textarea {
    background: rgba(0, 15, 45, 0.5); border: 1px solid rgba(77, 166, 255, 0.2);
    border-radius: 8px; padding: 0.8rem; color: white; font-size: 0.9rem; outline: none;
    &:focus { border-color: #4da6ff; }
    option { background-color: #0a192f; color: white; }
  }
`;

// --- MAIN COMPONENT ---

export default function Jobs() {
  const { jobs = [], addJob, updateJob, deleteJob, updateStatus } = useJobs();

  // Local state for UI controls to prevent crashes
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formState, setFormState] = useState({
    company: "", role: "", status: "Applied", 
    appliedDate: new Date().toISOString().split('T')[0], notes: ""
  });

  // Filter logic handled directly in the component to avoid hook-related blank screens
  const filteredJobs = jobs.filter(job => {
    const company = job.company || "";
    const role = job.role || job.position || "";
    const status = job.status || "";

    const matchesSearch = company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingId(job._id || job.id);
      setFormState({
        company: job.company || "",
        role: job.role || job.position || "",
        status: job.status || "Applied",
        appliedDate: job.appliedDate || new Date().toISOString().split('T')[0],
        notes: job.notes || ""
      });
    } else {
      setEditingId(null);
      setFormState({ 
        company: "", role: "", status: "Applied", 
        appliedDate: new Date().toISOString().split('T')[0], notes: "" 
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateJob(editingId, formState);
      } else {
        await addJob(formState);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Form Submission Error:", err);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaBriefcase style={{color: '#4da6ff'}}/> MISSION LOGS
          </h1>
          <p style={{ color: 'rgba(160, 200, 255, 0.5)', letterSpacing: '1px' }}>SECTOR 7-G // ACTIVE DEPLOYMENTS</p>
        </div>
        
        <OceanButton onClick={() => handleOpenModal()}>
          <FaPlus /> DEPLOY NEW APP
        </OceanButton>
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <ControlBar>
        <SearchWrapper>
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search by entity or designation..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <FilterWrapper>
          <FaFilter size={12} style={{color: '#4da6ff'}}/>
          <label>Filter By Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </FilterWrapper>
      </ControlBar>

      {/* MISSION TABLE */}
      <JobGridCard>
        <StyledTable>
          <thead>
            <tr>
              <th>ENTITY</th>
              <th>DESIGNATION</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job._id || job.id}>
                  <td style={{ fontWeight: '700', color: '#4da6ff' }}>{job.company}</td>
                  <td>{job.role || job.position}</td>
                  <td>
                    <StatusSelect 
                      value={job.status} 
                      onChange={(e) => updateStatus(job._id || job.id, e.target.value)}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </StatusSelect>
                  </td>
                  <td style={{ opacity: 0.6 }}>{job.appliedDate || new Date(job.createdAt).toLocaleDateString()}</td>
                  <td>
                    <ActionButtonContainer>
                      <button className="action-btn" title="Edit Entry" onClick={() => handleOpenModal(job)}>
                        <FaEdit />
                      </button>
                      <button className="action-btn delete" title="Delete Entry" onClick={() => deleteJob(job._id || job.id)}>
                        <FaTrash />
                      </button>
                    </ActionButtonContainer>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', opacity: 0.3 }}>
                  NO MATCHING MISSIONS DETECTED
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </JobGridCard>

      {/* MODAL WINDOW */}
      {isModalOpen && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <ModalCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'white', margin: 0 }}>{editingId ? "MODIFY DATA" : "NEW DEPLOYMENT"}</h2>
              <FaTimes style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
            </div>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Entity / Company</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Intercept target..."
                  value={formState.company} 
                  onChange={(e) => setFormState({...formState, company: e.target.value})} 
                />
              </FormGroup>

              <FormGroup>
                <label>Designation / Role</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Mission role..."
                  value={formState.role} 
                  onChange={(e) => setFormState({...formState, role: e.target.value})} 
                />
              </FormGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <label>Initial Status</label>
                  <select value={formState.status} onChange={(e) => setFormState({...formState, status: e.target.value})}>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Deployment Date</label>
                  <input 
                    type="date" 
                    value={formState.appliedDate} 
                    onChange={(e) => setFormState({...formState, appliedDate: e.target.value})} 
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <label>Mission Notes</label>
                <textarea 
                  rows="3" 
                  placeholder="Additional intel..."
                  value={formState.notes} 
                  onChange={(e) => setFormState({...formState, notes: e.target.value})}
                  style={{ resize: 'none' }}
                />
              </FormGroup>

              <OceanButton type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
                <FaSave /> {editingId ? "COMMIT CHANGES" : "INITIALIZE DEPLOYMENT"}
              </OceanButton>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}
    </div>
  );
}