import { Outlet } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";
import Footer from "./Components/Shared/Footer";
import Sidebar from "./Components/Shared/Sidebar";
import { useState } from "react";

function App() {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  return (
    <>
      <div className="flex">
        <Sidebar toggleSideBar={toggleSideBar} />
        <Navbar
          toggleSideBar={toggleSideBar}
          setToggleSideBar={setToggleSideBar}
        />
      </div>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
