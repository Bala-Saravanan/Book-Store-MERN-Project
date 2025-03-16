import { navItems, socialIcons } from "../../Constants/constants";
import { Link } from "react-router-dom";
import Logo from "../UI/Logo";

const Footer = () => {
  return (
    <>
      <div className="flex justify-between bg-bg absolute bottom-10 left-0 right-0">
        <div className="">
          {/* company logo */}
          <Logo />
        </div>
        <div>
          {/* Navigation */}
          <ul className="flex justify-center items-center cursor-pointer border-b my-3">
            {navItems.map(({ link, path }, idx) => (
              <Link
                key={idx}
                to={path}
                className="text-lg uppercase font-semibold text-secondary hover:text-primary mx-4 my-2"
              >
                {link}
              </Link>
            ))}
          </ul>
          {/* social icons */}
          <p className="text-sm text-secondary text-center font-semibold">
            find us on
          </p>
          <ul className="flex justify-center items-center gap-7 my-2">
            {socialIcons.map(({ Icon, path }, idx) => (
              <li key={idx}>
                <Link to={path} target="_blank" rel="noopener noreferrer">
                  <Icon className="text-2xl text-secondary hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-center bg-secondary text-bg p-2 mt-5 absolute bottom-0 left-0 right-0">
        &copy; All Rights are Reserved.
      </p>
    </>
  );
};
export default Footer;
