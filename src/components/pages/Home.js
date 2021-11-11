import { useEffect, useState } from "react";
import classes from "../../styling/Home.module.css";
import { firebase } from "../../config/Firebase";

const Home = () => {
  const [memberInfo, setMemberInfo] = useState({});

  function getUserData(uid) {
    firebase
      .database()
      .ref("users/" + uid)
      .once("value", (user) => {
        setMemberInfo(user.val());
      });
  }

  function authListener() {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        getUserData(authUser.uid);
      }
    });
  }

  useEffect(() => {
    authListener();
  });

  return (
    <div className={classes.container}>
      <h1 className={classes.welcome}>
        Welcome {memberInfo.fname} {memberInfo.lname}
      </h1>
      <p style={{ textAlign: "center" }}>
        Click on the events tab to checkout upcoming events or create one!
      </p>
    </div>
  );
};

export default Home;
