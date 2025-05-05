'use client';

import { createContext, useContext, useState } from 'react';

const SortContext = createContext();

export function SortProvider({ children }) {
  const [ordering, setOrdering] = useState('latest');

  return (
    <SortContext.Provider value={{ ordering, setOrdering }}>
      {children}
    </SortContext.Provider>
  );
}

export function useSort() {
  return useContext(SortContext);
}
