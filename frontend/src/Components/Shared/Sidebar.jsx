import { Link } from "react-router-dom";
import { navItems } from "../../Constants/constants";
import Logo from "../UI/Logo";

const Sidebar = ({ toggleSideBar }) => {
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
            </ul>
          </div>
        </>
      )}
    </>
  );
};
export default Sidebar;
