import { createContext, useState } from "react";

const PreferenceContext = createContext();

export const PreferenceProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [category, setCategory] = useState(null);
//   console.log(state, "prefeenrer state")
//   console.log(category, "prefeenrer state")

  return (
    <PreferenceContext.Provider value={{ setState, setCategory }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export default PreferenceContext;
