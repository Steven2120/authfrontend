import React from "react";
import { Outlet, Link } from "react-router-dom";
import { getUserToken, logoutUser } from "../Auth";
import { useState, useEffect } from "react";

const NavBar = (props) => {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const localUserToken = getUserToken();
    setUserToken(localUserToken);
  }, [props.isAuthLoading]);
  return (
    <div>
      <nav>
        <h3>NavBar</h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!userToken && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
            </>
          )}
        </ul>
        {userToken && (
          <>
            <span>
              <strong>You Are Logged In</strong>
            </span>
            <br />
            <button
              onClick={async () => {
                props.setIsAuthLoading(true);
                const logoutSuccess = await logoutUser();
                if (logoutSuccess) {
                  props.setIsAuthLoading(false);
                }
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
