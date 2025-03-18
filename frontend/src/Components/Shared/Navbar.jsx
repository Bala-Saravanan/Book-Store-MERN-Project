import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import Logo from "../UI/Logo";
// import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/Button";
import { useContext } from "react";
import { userContext } from "../../main";

const Navbar = ({ toggleSideBar, setToggleSideBar }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(userContext);
  const clickHandle = () => {
    navigate("/login");
  };
  return (
    <div className="flex w-full fixed border-b z-10">
      <div className="bg-bg w-96">
        <Logo />
      </div>
      <hr />
      <div className={`flex justify-between bg-bg px-4 py-3`}>
        <div className="flex items-center text-xl">
          <FaBars
            onClick={() => setToggleSideBar(!toggleSideBar)}
            className="text-secondary me-4 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-5 bg-bg w-full h-22">
        <div className="relative md:w-65">
          <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 outline-none md:text-secondary">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            name=""
            id=""
            className="w-full px-4 py-2 pl-12 bg-white rounded-3xl shadow outline-none hidden md:block"
          />
        </div>
      </div>
      <div className="relative  flex justify-center items-center bg-bg pe-6">
        {isLoggedIn ? (
          <>
            <FaUser className="w-6 h-6 text-secondary" />
          </>
        ) : (
          <>
            <Button onClick={clickHandle}>Log In</Button>
          </>
        )}
        {/* <button
          onClick={() => navigate("/register")}
          className="bg-tertiary text-bg font-semibold text-nowrap px-5 py-2 m-2 rounded-xl border-none ring-1 cursor-pointer z-50"
        >
          Sign Up
        </button>
        */}
      </div>
    </div>
  );
};
export default Navbar;
