// src/Context/PageContext.jsx
import { createContext, useContext, useState } from 'react';

const PageContext = createContext();

// export const usePageContext = () => useContext(PageContext);

function PageProvider({ children }){
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccess ,setShowSuccess] = useState(false);
  const [removeSaved, setRemoveSaved] = useState(true);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, showSuccess, setShowSuccess, removeSaved, setRemoveSaved }}>
      {children}
    </PageContext.Provider>
  );
};
export default PageContext;
export {PageProvider};