import { useState } from "react";
import { registerUser, loginUser } from "../Auth";
import { useNavigate } from "react-router-dom";
import React from "react";

const RegistrationPage = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <h2>Registration Page</h2>
      <label>USER NAME: </label>
      <input
        value={username}
        onChange={(e) => {
          const inputUserName = e.target.value;
          setUserName(inputUserName);
          console.log(inputUserName);
        }}
      ></input>
      <br></br>
      <label>Password: </label>
      <input
        value={password}
        onChange={(e) => {
          const inputUserPassword = e.target.value;
          setPassword(inputUserPassword);
          console.log(inputUserPassword);
        }}
      ></input>
      <br></br>
      <button
        onClick={async () => {
          props.setIsAuthLoading(true);
          console.log("USERNAME: ", username, "PASSWORD: ", password);
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
  );
};

export default RegistrationPage;
