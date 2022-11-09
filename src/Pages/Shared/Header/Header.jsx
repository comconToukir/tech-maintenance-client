import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { signOutUser } from "../../../utils/firebase.utils";
import { UserContext } from "../../../Contexts/UserContext";
import logo from "../../../assets/logo/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogOut = () =>
    signOutUser()
      .then(navigate("/"))
      .catch((err) => console.log(err));

  const menuItems = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="font-semibold">
        <Link to="/services">Services</Link>
      </li>
      {user?.email ? (
        <>
          <li className="font-semibold">
            <Link to="/add-service">Add Service</Link>
          </li>
          <li className="font-semibold">
            <Link to="/my-reviews">My Reviews</Link>
          </li>
          <li className="font-semibold">
            <button
              onClick={handleLogOut}
              className="btn-success hover:bg-emerald-600 text-base-300 transition-all  font-medium py-1 px-4 rounded-md"
            >
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="font-semibold">
            <Link to="/login">Login</Link>
          </li>
          <li className="font-semibold">
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="drawer bg-base-200 h-auto">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="max-w-screen-xl navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <FaBars className="h-6 w-6" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link to="/">
              <img src={logo} className="h-14 lg:h-20" alt="" />
            </Link>
            <Link to="/">
              <h1 className="ml-7 text-xl lg:text-3xl font-semibold tracking-wider lg:tracking-widest">
                TECH MAINTENANCE
              </h1>
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">{menuItems}</ul>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">{menuItems}</ul>
      </div>
    </div>
  );
};

export default Header;
