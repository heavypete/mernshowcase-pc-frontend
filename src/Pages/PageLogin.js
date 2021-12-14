import { useState, useContext } from "react";
import AppContext from "../AppContext";

const PageLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser, currentUserIsInGroup } = useContext(AppContext);

  const [userNameRegister, setUserNameRegister] = useState("");
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [secondNameRegister, setSecondNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister1, setPasswordRegister1] = useState("");
  const [passwordRegister2, setPasswordRegister2] = useState("");
  const handleUsername = (e) => {
    const _username = e.target.value;
    setUsername(_username);
  };

  const handlePassword = (e) => {
    const _password = e.target.value;
    setPassword(_password);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch("http://localhost:3003/login", requestOptions);
    const _currentUser = await response.json();
    setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
  };

  return (
    <form>
      <fieldset>
        <legend className="legend">Login</legend>
        <div className="row">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handlePassword}
            value={password}
          />
        </div>
        <div className="buttonRow">
          <button onClick={handleLoginButton}>Login</button>
        </div>
      </fieldset>
    </form>
  );
};

export default PageLogin;
