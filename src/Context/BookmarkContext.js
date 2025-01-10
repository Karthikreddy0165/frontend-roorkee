import { createContext, useState, useContext } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [isBookmarked, setIsBookmarked] = useState({});

  const toggleBookmark = (schemeId, isBookmarked) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [schemeId]: !isBookmarked,
    }));
  };

  return (
    <BookmarkContext.Provider value={{ isBookmarked, setIsBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => useContext(BookmarkContext);