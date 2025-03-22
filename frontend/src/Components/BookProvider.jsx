import { createContext, useState } from "react";

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useState({});

  return (
    <BookContext.Provider value={{ bookData, setBookData }}>
      {children}
    </BookContext.Provider>
  );
};
