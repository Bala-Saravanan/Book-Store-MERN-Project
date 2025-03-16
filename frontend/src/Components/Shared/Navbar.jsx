import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import Logo from "../UI/Logo";

const Navbar = ({ toggleSideBar, setToggleSideBar }) => {
  return (
    <div className="flex w-full border-b z-10">
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
        <FaUser className="w-6 h-6 text-secondary" />
      </div>
    </div>
  );
};
export default Navbar;
