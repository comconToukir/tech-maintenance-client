import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "./../../../Contexts/AuthContext";
import logo from "../../../assets/logo/154-1547715_handyman-logo-png.png";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogOut = () =>
    signOutUser()
      .then(navigate("/"))
      .catch((err) => console.log(err));

  const menuItems = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      {user?.email ? (
        <>
          <li className="font-semibold">
            <Link to="/orders">Orders</Link>
          </li>
          <li className="font-semibold">
            <button onClick={handleLogOut}>Log Out</button>
          </li>
        </>
      ) : (
        <li className="font-semibold">
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 mb-3">
        <div className="navbar-start h-28 ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="">
            <img className="" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        </div>
        <div className="navbar-end">
          <Link className="btn btn-outline btn-warning">Appointment</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
