import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../../../Contexts/UserContext";
import logo from "../../../assets/logo/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(UserContext);

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
    <div className="drawer w-full bg-base-200">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="max-w-screen-xl navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <img src={logo} className="h-24" alt="" />
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* <!-- Navbar menu content here --> */}
              {menuItems}
            </ul>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        <div className="max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">
          {/* <!-- Sidebar content here --> */}
          {menuItems}
        </ul>
      </div>
    </div>
  );
};

export default Header;
