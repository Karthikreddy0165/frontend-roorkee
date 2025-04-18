import React, { createContext, useState, useContext, useEffect } from 'react';

const PrivacyContext = createContext();

export const PrivacyProvider = ({ children }) => {
  const [cookiesConsent, setCookiesConsent] = useState(false);
  const [infoUsage, setInfoUsage] = useState(false);
  const [infoSharing, setInfoSharing] = useState(false);

  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('privacyPreferences');
      if (savedPreferences) {
        const { cookiesConsent, infoUsage, infoSharing } = JSON.parse(savedPreferences);
        setCookiesConsent(cookiesConsent || false);
        setInfoUsage(infoUsage || false);
        setInfoSharing(infoSharing || false);
      }
    } catch (error) {
      console.error('Error loading privacy preferences:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('privacyPreferences', JSON.stringify({
        cookiesConsent,
        infoUsage,
        infoSharing,
      }));
    } catch (error) {
      console.error('Error saving privacy preferences:', error);
    }
  }, [cookiesConsent, infoUsage, infoSharing]);

  const handleRejectAll = () => {
    setCookiesConsent(false);
    setInfoUsage(false);
    setInfoSharing(false);
  };

  const value = {
    cookiesConsent,
    setCookiesConsent,
    infoUsage,
    setInfoUsage,
    infoSharing,
    setInfoSharing,
    handleRejectAll,
  };

  return (
    <PrivacyContext.Provider value={value}>
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => useContext(PrivacyContext);


