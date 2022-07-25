import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../Auth";

export const RegistrationPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      RegistrationPage
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => {
            const newUserName = event.target.value;
            setUsername(newUserName);
          }}
        ></input>
        <br />
        <br />
        <label>Password:</label>
        <input
          type="text"
          value={password}
          onChange={(event) => {
            const newPassword = event.target.value;
            setPassword(newPassword);
          }}
        ></input>
        <button
          id="signup"
          type="submit"
          onClick={async (isAuthLoading, setIsAuthLoading) => {
            setIsAuthLoading(true);
            const isUserRegistered = await registerUser(username, password);
            if (isUserRegistered) {
              const isUserLoggedIn = await loginUser(username, password);
              if (isUserLoggedIn) {
                props.setIsAuthLoading(false);
                navigate("/");
              }
            }
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
