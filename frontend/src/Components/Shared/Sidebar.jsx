import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../../Constants/constants";
import { GrLogout } from "react-icons/gr";
import { useContext } from "react";
import { userContext } from "../../main";
import { toast } from "sonner";

const Sidebar = ({ toggleSideBar }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(userContext);
  const clickHandler = (event) => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged Out Successfully!");
    navigate("/login");
  };
  return (
    <>
      {toggleSideBar ? (
        <div className="w-72 bg-bg fixed h-full border-r z-10">
          {/* Navigation */}
          <ul className="mt-24 text-secondary text-xl font-bold">
            {navItems.map(({ Icon, link, path }, idx) => (
              <Link
                key={idx}
                to={path}
                className="mb-2 mx-2 rounded flex items-center gap-3 p-5 hover:bg-primary"
              >
                <Icon className="w-6 h-6 mr-2"></Icon>
                {link}
              </Link>
            ))}
            <li className=" hover:bg-primary mb-2 mx-2 rounded">
              <button
                onClick={clickHandler}
                className="flex items-center justify-center gap-3 p-5"
              >
                <GrLogout className="text-2xl cursor-pointer" />
                <p className="mx-2">Logout</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <div className="bg-bg w-24 fixed h-full border-r">
            <ul className="mt-24 text-secondary text-xl font-bold">
              {navItems.map(({ Icon, path }, idx) => (
                <Link
                  key={idx}
                  to={path}
                  className="mb-2 mx-2 rounded flex items-center justify-center gap-3 p-5 hover:bg-primary"
                >
                  <Icon className="w-6 h-6 text-secondary z-50"></Icon>
                </Link>
              ))}
              <li>
                <button
                  onClick={clickHandler}
                  className="mb-2 mx-2 rounded flex items-center justify-center gap-3 p-5 hover:bg-primary"
                >
                  <GrLogout className="text-2xl ms-2 cursor-pointer" />
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};
export default Sidebar;
