import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "../../styling/NavBar.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { firebase } from "../../config/Firebase";

const NavBar = () => {
  const [authUser, setAuthUser] = useState(null);
  

  function authListener() {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser(null);
      }
    });
  }

  useEffect(() => {
    authListener();
  });

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Succesfully Logged Out.");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  if (authUser) {
    return (
      <header className={classes.header}>
        <div className={classes.logo}>Pickup Futbol</div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/" onClick={signOut}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  } 

  return (
    <header className={classes.header}>
      <div>
        <Link className={classes.logo} to="/">
          Pickup Futbol
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
