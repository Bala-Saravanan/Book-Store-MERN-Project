import { createContext, StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Routes/appRouter";
import { Toaster } from "sonner";

export const userContext = createContext(null);

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token
    if (token) {
      setIsLoggedIn(true); // Set logged-in state
    }
  }, []);

  return (
    <StrictMode>
      <userContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <RouterProvider router={appRouter} />
      </userContext.Provider>
      <Toaster />
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
