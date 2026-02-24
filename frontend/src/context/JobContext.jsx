import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/api';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🛠️ INTERNAL HELPER: Maps backend (position/pending) to your Frontend (role/Applied)
  // This ensures your CSS classes and table data match perfectly.
  const mapToUI = (job) => ({
    ...job,
    role: job.position || "", 
    status: job.status === 'pending' ? 'Applied' : 
            job.status === 'declined' ? 'Rejected' : 
            job.status === 'interview' ? 'Interview' : 
            job.status === 'offer' ? 'Offer' : 'Applied'
  });

  // 🛠️ INTERNAL HELPER: Maps UI (role/Applied) back to Backend keys (position/pending)
  const mapToBackend = (data) => ({
    company: data.company,
    position: data.role || data.position, // Backend needs 'position'
    status: data.status === 'Applied' ? 'pending' : 
            data.status === 'Rejected' ? 'declined' : 
            data.status.toLowerCase(),
    notes: data.notes || ""
  });

  // 🛰️ FETCH: Load all missions
  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await API.get('/jobs');
      // Handle different response structures
      const fetchedJobs = response.data.jobs || response.data.data || (Array.isArray(response.data) ? response.data : []);
      setJobs(fetchedJobs.map(mapToUI));
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Auth Failure: Token is invalid or expired.");
      }
      console.error("Sonar Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchJobs();
  }, []);

  // 🚀 ADD: Deploy new mission
  const addJob = async (jobData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Authentication Token Missing. Please Log In Again.");
        return;
      }

      const payload = mapToBackend(jobData);
      console.log("🛰️ Deploying Payload:", payload);

      const response = await API.post('/jobs', payload);
      
      if (response.status === 200 || response.status === 201) {
        console.log("✅ Mission Logged Successfully");
        await fetchJobs(); // Refresh list from server
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log out and back in.");
      } else {
        console.error("❌ Deployment Error:", error.response?.data || error.message);
        alert(`Mission Failed: ${error.response?.data?.message || "Server error"}`);
      }
    }
  };

  // 🛠️ UPDATE: Modify existing mission
  const updateJob = async (id, updatedData) => {
    try {
      const payload = mapToBackend(updatedData);
      console.log(`📡 Modifying Mission ${id}...`, payload);

      const response = await API.patch(`/jobs/${id}`, payload);
      
      if (response.status === 200) {
        console.log("✅ Modification Confirmed");
        await fetchJobs();
      }
    } catch (error) {
      console.error("Modification Error", error.response?.data || error.message);
      alert("Failed to update mission data.");
    }
  };

  // 🗑️ DELETE: Remove mission
  const deleteJob = async (id) => {
    if(!window.confirm("CRITICAL: Are you sure you want to scrub this mission data?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      // Optimistic update for speed
      setJobs(prev => prev.filter(j => (j._id || j.id) !== id));
      console.log("🗑️ Mission scrubbed from database.");
    } catch (error) {
      console.error("Cleanup Error", error);
      alert("Failed to delete mission.");
      fetchJobs(); // Re-sync if it failed
    }
  };

  // ⚡ STATUS UPDATE: Quick status toggle (Dropdown in table)
  const updateStatus = async (id, newStatus) => {
    try {
      const backendStatus = newStatus === 'Applied' ? 'pending' : 
                           newStatus === 'Rejected' ? 'declined' : 
                           newStatus.toLowerCase();
      
      console.log(`⚡ Changing status to: ${backendStatus}`);
      await API.patch(`/jobs/${id}`, { status: backendStatus });
      
      // Update UI immediately so color changes are instant
      setJobs(prev => prev.map(j => (j._id === id || j.id === id) ? { ...j, status: newStatus } : j));
    } catch (error) {
      console.error("Status Change Error", error);
      fetchJobs(); // Re-sync with server if patch failed
    }
  };

  return (
    <JobContext.Provider value={{ jobs, isLoading, fetchJobs, addJob, updateJob, deleteJob, updateStatus }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);