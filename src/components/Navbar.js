import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { getUserToken } from "../Auth";
import { logoutUser } from "../Auth";

export const Navbar = (isAuthLoading, setIsAuthLoading) => {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const localUserToken = getUserToken();
    setUserToken(localUserToken);
  }, [isAuthLoading]);

  return (
    <div>
      <nav>
        <h3>NavBar</h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!userToken && (
            <div>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
            </div>
          )}
        </ul>
        {userToken && (
          <div>
            <span>
              <strong>You Are Logged In</strong>
            </span>
            <button
              onClick={() => {
                logoutUser();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
