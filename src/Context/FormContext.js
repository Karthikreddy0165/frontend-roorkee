import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const useFormData = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState({});

  const updateFormData = (newState) => {
    setFormState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <FormContext.Provider value={{ formData: formState, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
