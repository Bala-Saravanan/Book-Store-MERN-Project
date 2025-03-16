import { PiBookBookmarkFill } from "react-icons/pi";

const Logo = () => {
  return (
    <div className="flex space-x-1 items-center">
      <PiBookBookmarkFill className="text-5xl text-secondary m-5" />
      <div className="hidden md:block">
        <p className="text-2xl">
          Clever <span>Books</span>
        </p>
        <span className="text-sm font-light">
          Your Personalized Book Partner.
        </span>
      </div>
    </div>
  );
};
export default Logo;
