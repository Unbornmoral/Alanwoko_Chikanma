'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const adminStatus = localStorage.getItem('adminMode') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/get-data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (newData) => {
    try {
      const response = await fetch('/api/update-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        setData(newData);
        return true;
      }
    } catch (error) {
      console.error('Error updating portfolio data:', error);
    }
    return false;
  };

  const toggleAdmin = (status) => {
    setIsAdmin(status);
    localStorage.setItem('adminMode', status ? 'true' : 'false');
  };

  return (
    <PortfolioContext.Provider value={{ data, setData, updateData, isAdmin, toggleAdmin, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
