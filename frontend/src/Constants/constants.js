import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { FaHeart } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";

export const navItems = [
  { Icon: FaEye, link: "Discover", path: "/" },
  { Icon: SiBookstack, link: "My Books", path: "/my-books" },
  { Icon: FaHeart, link: "Favorites", path: "/favourites" },
  { Icon: FaBlog, link: "Blog", path: "/blog" },
];

export const socialIcons = [
  { Icon: FaFacebook, path: "https://www.facebook.com" },
  { Icon: FaInstagram, path: "https://www.instagram.com" },
  { Icon: FaSquareXTwitter, path: "https://www.x.com" },
];
