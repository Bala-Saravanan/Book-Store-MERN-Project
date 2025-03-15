import { Outlet } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
