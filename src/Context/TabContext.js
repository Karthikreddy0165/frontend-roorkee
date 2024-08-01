// TabContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Schemes'); // Default active tab
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(()=>{
    const currentURL = new URLSearchParams(window.location.search);
    const tab = currentURL.get("tab");
    if(tab){
      setActiveTab(tab);
    }
  },[activeTab])
  // const setTab = (tab) => {
  //   setActiveTab(tab);
  // };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, searchQuery, setSearchQuery }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => useContext(TabContext);
