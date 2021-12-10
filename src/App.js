//import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.scss";

import Nav from "./Components/Nav.js";
import PageWelcome from "./Pages/PageWelcome.js";
import PageRegister from "./Pages/PageRegister.js";
import PageLogin from "./Pages/PageLogin.js";
import {
  BrowserRouter as div,
  Route,
  Routes,
  Link,
  NavLink,
} from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const [userNameRegister, setUserNameRegister] = useState("");
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [secondNameRegister, setSecondNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister1, setPasswordRegister1] = useState("");
  const [passwordRegister2, setPasswordRegister2] = useState("");

  const [notYetApprovedUsers, setNotYetApprovedUsers] = useState([]);

  //setNotYetApprovedUsers = notYetApprovedUsers - this.user

  ///////////////////////////
  const loadNotYetApprovedUsers = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      "http://localhost:3003/notyetapprovedusers",
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setNotYetApprovedUsers((prev) => [...data.users]);
    }
  };

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      try {
        const response = await fetch(
          "http://localhost:3003/currentuser",
          requestOptions
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // setCurrentUser((prev) => {
          //   const newUser = { ...prev, ...data };
          //   console.log({ newUser });
          //   return newUser;
          // });
          setCurrentUser(data);
        }
        loadNotYetApprovedUsers();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const currentUserIsInGroup = (accessGroup) => {
    const accessGroupArray = currentUser.accessGroups
      .split(",")
      .map((m) => m.trim());
    return accessGroupArray.includes(accessGroup);
  };

  ///////////////////////////////
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
      setUserNameRegister("");
      setFirstNameRegister("");
      setSecondNameRegister("");
      setEmailRegister("");
      setPasswordRegister1("");
      setPasswordRegister2("");
    }
  };
  /////////////////////////////
  const handle_approveUserButton = async (id) => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(
      "http://localhost:3003/approveuser",
      requestOptions
    );
    if (response.ok) {
      await response.json();
      loadNotYetApprovedUsers();
    }
  };

  const handleLogoutButton = async (e) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      "http://localhost:3003/logout",
      requestOptions
    );
    if (response.ok) {
      setUsername("");
      setPassword("");
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };

  //! Return
  //* Starts
  //? HERE

  return (
    <div className="App">
      <div className="title">Feel the MERN!</div>
      <Nav></Nav>
      <Routes>
        <Route path="/" exact element={<PageWelcome />} />
        <Route path="register" element={<PageRegister />} />
        <Route path="login" element={<PageLogin />} />
      </Routes>
    </div>
  );
}

export default App;
