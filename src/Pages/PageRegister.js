import { useState, useContext } from "react";
import AppContext from "../AppContext";
//import { Link } from "react-router-dom";

const PageRegister = () => {
  const { setCurrentUser, currentUserIsInGroup, backendUrl } =
    useContext(AppContext);
  const [userNameRegister, setUserNameRegister] = useState("");
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [secondNameRegister, setSecondNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister1, setPasswordRegister1] = useState("");
  const [passwordRegister2, setPasswordRegister2] = useState("");

  const { siteStatus, toggleStatus } = useContext(AppContext);
  const handleFirstNameRegister = (e) => {
    const firstNameRegister = e.target.value;
    setFirstNameRegister(firstNameRegister);
  };

  const handleSecondNameRegister = (e) => {
    const secondNameRegister = e.target.value;
    setSecondNameRegister(secondNameRegister);
  };
  const handleUserNameRegister = (e) => {
    const userNameRegister = e.target.value;
    setUserNameRegister(userNameRegister);
  };
  const handleEmailRegister = (e) => {
    const emailRegister = e.target.value;
    setEmailRegister(emailRegister);
  };

  const handlePasswordRegister1 = (e) => {
    const passwordRegister1 = e.target.value;
    setPasswordRegister1(passwordRegister1);
  };

  const handlePasswordRegister2 = (e) => {
    const passwordRegister2 = e.target.value;
    setPasswordRegister2(passwordRegister2);
  };
  ////////////////////////////////

  const handleRegisterButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          username: userNameRegister,
          firstName: firstNameRegister,
          lastName: secondNameRegister,
          email: emailRegister,
          password1: passwordRegister1,
          password2: passwordRegister2,
        },
      }),
    };
    const response = await fetch(
      "http://localhost:3003/createuser",
      requestOptions
    );
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      // setSignupFormField_login("");
      setPasswordRegister1("");
      setPasswordRegister2("");
      setFirstNameRegister("");
      setSecondNameRegister("");
      setEmailRegister("");
    }
  };
  return (
    <div>
      <form>
        <fieldset>
          <legend className="legend">Register</legend>
          <div className="row">
            <label htmlFor="firstname">Name</label>
            <input
              type="text"
              id="firstNameRegister"
              value={firstNameRegister}
              onChange={handleFirstNameRegister}
              placeholder="Enter your first name"
            />
          </div>
          <div className="row">
            <label htmlFor="secondname">Last Name</label>
            <input
              type="text"
              id="secondNameRegister"
              value={secondNameRegister}
              onChange={handleSecondNameRegister}
              placeholder="Enter your lastname"
            />
          </div>
          <div className="row">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="username"
              value={userNameRegister}
              onChange={handleUserNameRegister}
              placeholder="Enter your username *"
            />
          </div>

          <div className="row">
            <label htmlFor="emailRegister">Email</label>
            <input
              type="text"
              id="emailregister"
              value={emailRegister}
              onChange={handleEmailRegister}
              placeholder="Enter your email *"
            />
          </div>

          <div className="row">
            <label htmlFor="password">Password1</label>
            <input
              type="text"
              id="passwordRegister1"
              value={passwordRegister1}
              onChange={handlePasswordRegister1}
              placeholder="Enter your password *"
            />
          </div>
          <div className="row">
            <label htmlFor="password">Password2</label>
            <input
              type="text"
              id="passwordRegister2"
              value={passwordRegister2}
              onChange={handlePasswordRegister2}
              placeholder="Your password same like the first one *"
            />
          </div>
          <div className="buttonRow">
            <button onClick={handleRegisterButton}>Register</button>
            <div className="buttonRow">
              <button className="button">Reset</button>
            </div>
          </div>
        </fieldset>
      </form>
      <p>
        The current status is: <span className="highlight">{siteStatus}</span>
      </p>
    </div>
  );
};

export default PageRegister;
