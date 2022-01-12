import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./App.scss";
import AppContext from "./AppContext";
import Nav from "./Components/Nav.js";
import PageWelcome from "./Pages/PageWelcome.js";
import PageRegister from "./Pages/PageRegister.js";
import PageLogin from "./Pages/PageLogin.js";

function App() {
  const { setCurrentUser, currentUser, currentUserIsInGroup } =
    useContext(AppContext);

  useEffect(() => {
    console.log("useEffect");
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
          console.log(data);
          console.log(data.username);
          setCurrentUser((prev) => ({ ...prev, ...data }));
        }
        //loadNotYetApprovedUsers();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      {currentUser.username && (
        <>
          {/* [ {currentUser.username} 'blue'] */}
          <div className="title">Feel the MERN!</div>
          {currentUserIsInGroup("loggedInUsers") && (
            <h2>
              Nice to see you again, {currentUser.firstName}{" "}
              {currentUser.lastName}
            </h2>
          )}
          <Nav></Nav>
          <Routes>
            <Route path="/" exact element={<PageWelcome />} />
            <Route path="register" element={<PageRegister />} />
            <Route path="login" element={<PageLogin />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
