import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "../../styling/NavBar.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { firebase } from "../../config/Firebase";
import logo from "../../images/Pickup Futbol1.png"
import Hamburger from "hamburger-react";

const NavBar = () => {
  const [authUser, setAuthUser] = useState(null);
  const [navVisible, setNavVisible] = useState(false);
  

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
  }, [authUser]);

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

  function toggleNav() {
    setNavVisible(!navVisible)
  }

  if (authUser) {
    return (
      <header className={classes.header}>
        <div className={classes.logo}>
          <img
            src={logo}
            alt="pickup-logo"
            width="120px"
          />
        </div>
        <nav className={`${navVisible ? ' ' : classes.nav}`}>
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
        <div className={classes.respNav}>
          <Hamburger onToggle={() => toggleNav()} size={30}/>
        </div>
        {/* <div className={`${navVisible ? classes.togRespList : classes.respList}`}>
          
        </div> */}
      </header>
    );
  } 

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <img
              src={logo}
              alt="pickup-logo"
              width="120px"
          />        
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
