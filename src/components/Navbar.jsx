import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast("Logged out successfully", {
          position: "top-center",
          autoClose: 1000,
        });
      })
      .catch(console.error);
  };

  const navlink = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allJobs">All Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/addJob">Add a Job</NavLink>
      </li>
      <li>
        <NavLink to="/myAcceptedTasks">My Accepted Tasks</NavLink>
      </li>
      <li>
        <NavLink to="/myAddedJobs">My Added Job</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-300 shadow-sm px-5 md:px-10">
      {/* Left: Logo + Mobile Dropdown */}
      <div className="navbar-start flex items-center gap-2">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="cursor-pointer btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
          >
            {navlink}
          </ul>
        </div>

        <Link to="/" className="flex items-center">
          <img className="w-24 sm:w-32 pl-5" src="/Logo2.png" alt="Logo" />
        </Link>
      </div>

      {/* Middle: Navlinks for desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlink}</ul>
      </div>

      {/* Right: Theme toggle + User */}
      <div className="navbar-end flex items-center gap-4">
        <strong className="max-sm:hidden">MODE</strong>
        <input
          onChange={(e) => handleTheme(e.target.checked)}
          type="checkbox"
          defaultChecked={localStorage.getItem("theme") === "dark"}
          className="toggle"
        />

        {user ? (
          <div className="relative flex items-center gap-4">
            <img
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              src={user.photoURL}
              alt="Profile"
              className="sm:w-12 sm:h-12 max-sm:w-8 max-sm:h-8 rounded-full border-2 border-accent cursor-pointer"
            />

            {open && (
              <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="absolute right-0 top-12 w-56 bg-base-200 shadow-lg rounded-xl p-4 text-center z-50"
              >
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-12 h-12 mx-auto rounded-full border-4 border-accent"
                />
                <p className="mt-2 font-semibold">{user.displayName}</p>
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary btn-sm mt-3 w-full border"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm sm:btn-md">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
