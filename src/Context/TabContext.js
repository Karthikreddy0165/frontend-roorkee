// TabContext.js

import React, { createContext, useState, useContext } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Schemes'); // Default active tab
  const [searchQuery, setSearchQuery] = useState('');

  const setTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TabContext.Provider value={{ activeTab, setTab, searchQuery, setSearchQuery }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => useContext(TabContext);
