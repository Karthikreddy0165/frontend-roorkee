import React, { createContext, useState, useContext, useEffect } from 'react';

const PrivacyContext = createContext();

export const PrivacyProvider = ({ children }) => {
  const [cookiesConsent, setCookiesConsent] = useState(true);
  const [infoUsage, setInfoUsage] = useState(true);
  const [infoSharing, setInfoSharing] = useState(true);


  const handleSubmitChoices = () => {
    try {
      localStorage.setItem('privacyPreferences', JSON.stringify({
        cookiesConsent,
        infoUsage,
        infoSharing,
      }));
    } catch (error) {
      console.error('Error saving privacy preferences:', error);
    }
  };
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
    handleSubmitChoices,
  };

  return (
    <PrivacyContext.Provider value={value}>
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => useContext(PrivacyContext);


