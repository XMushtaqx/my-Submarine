import { useState, useMemo } from 'react';

export const useJobFilters = (jobs) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.role.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || job.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredJobs
  };
};