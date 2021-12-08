import { useState, useEffect } from "react";
import "./App.scss";

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
      const response = await fetch(
        "http://localhost:3003/currentuser",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentUser((prev) => ({ ...prev, ...data.user }));
      }
      loadNotYetApprovedUsers();
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

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      const response = await fetch(
        "http://localhost:3003/currentuser",
        requestOptions
      );
      if (response.ok) {
        const _currentUser = await response.json();
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      }
    })();
  }, []);
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

  return (
    <div className="App">
      {currentUser.username && (
        <div>
          <div className="title">MERN Showcase App</div>

          {currentUserIsInGroup("loggedInUsers") && (
            <h2>
              Current User: {currentUser.firstName} {currentUser.lastName}
            </h2>
          )}
          {currentUserIsInGroup("loggedOutUsers") && (
            <form>
              <fieldset>
                <legend>Login</legend>
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
          )}
          {currentUserIsInGroup("loggedInUsers") && (
            <div>
              <button onClick={handleLogoutButton}>Logout</button>
            </div>
          )}
          {currentUserIsInGroup("loggedOutUsers") && (
            <div className="panel">Welcome to this site.</div>
          )}
          {currentUserIsInGroup("notApprovedUsers") && (
            <div className="panel">
              <h3>Thank you for registering!</h3>
              An administrator will approve your account as soon as possible.
            </div>
          )}
          {currentUserIsInGroup("members") && (
            <div className="panel">
              <h3>Current Site News for Members</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
                explicabo voluptate quia asperiores sit! Vel molestiae labore
                ratione non dolores? Exercitationem soluta quo id laboriosam,
                autem perferendis? Fuga, suscipit ipsa.
              </p>
            </div>
          )}
          {currentUserIsInGroup("contentEditors") && (
            <div className="panel">
              <h3>Content Editor Section:</h3>
              <div>
                <button>Edit Welcome Page</button>
              </div>
              <div>
                <button>Create New Page</button>
              </div>
            </div>
          )}
          {currentUserIsInGroup("admins") && (
            <div className="panel">
              <h3>Admin Section:</h3>
              <h4>{notYetApprovedUsers.length} Users to Approve</h4>
              <table className="minimalListBlack">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {notYetApprovedUsers.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                          <button
                            onClick={() => handle_approveUserButton(user._id)}
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div>
                <button>Create users</button>
              </div>
              <div>
                <button>Edit users</button>
              </div>
              <div>
                <button>Delete users</button>
              </div>
            </div>
          )}
        </div>
      )}
      <p className="legend">REGISTER</p>
      <form>
        <fieldset>
          <legend>Register</legend>
          <div className="row">
            <label htmlFor="firstname">Name</label>
            <input
              type="text"
              id="firstNameRegister"
              value={firstNameRegister}
              onChange={handleFirstNameRegister}
              placeholder="Enter your firstname"
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
    </div>
  );
}

export default App;
