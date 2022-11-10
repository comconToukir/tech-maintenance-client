import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";
import logo from "../../../assets/logo/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 mt-12 bg-base-200 text-base-content rounded">
      <div className="grid grid-flow-col gap-4">
        <Link className="link link-hover">About us</Link>
        <Link className="link link-hover">Contact</Link>
        <Link to="/services" className="link link-hover">
          Services
        </Link>
        <Link to="/blogs" className="link link-hover">
          Blogs
        </Link>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <Link to="/">
            <img src={logo} className="h-24 rounded-sm" alt="" />
          </Link>
        </div>
      </div>
      <div>
        <p>
          Copyright © 2022 - All right reserved by Tech Maintenance Services Ltd
        </p>
      </div>
      <div className="grid grid-flow-col gap-4 ">
        <Link>
          <FaTwitter className="h-6 w-6" />
        </Link>
        <Link>
          <FaYoutube className="h-6 w-6" />
        </Link>
        <Link>
          <FaFacebookF className="h-6 w-6" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
