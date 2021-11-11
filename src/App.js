import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import Events from "./components/pages/Events";
import WelcomePage from "./components/pages/WelcomePage";
import EventInfo from "./components/pages/EventInfo";
import { firebase } from "./config/Firebase";

function App() {
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

  return (
    <Layout>
      {authUser ? (
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/event-info">
            <EventInfo />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create-account">
            <CreateAccount />
          </Route>
        </Switch>
      )}
    </Layout>
  );
}

export default App;
