// context/SchemeContext.js
import React, { createContext, useContext } from "react";

const SchemeContext = createContext();

export const SchemeProvider = ({ children }) => {
  const saveScheme = async (scheme_id, authState) => {
    console.log("aa rahi hai", scheme_id, authState)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authState.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      scheme_id: scheme_id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save_scheme/`,
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        return true;
      } else {
        console.error("Failed to save scheme");
        return false;
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return false;
    }
  };

  return (
    <SchemeContext.Provider value={{ saveScheme }}>
      {children}
    </SchemeContext.Provider>
  );
};

// Custom hook to use the SchemeContext
export const useScheme = () => useContext(SchemeContext);
