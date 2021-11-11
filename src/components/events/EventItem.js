import classes from "../../styling/EventItem.module.css";
import { firebase } from "../../config/Firebase";
import { Link } from "react-router-dom";
import React from "react";

const EventItem = ({ eventInfo, user }) => {

  function updateDBArr(event, array) {
    firebase
      .database()
      .ref("events/" + event.eventId + "/attendeeUids")
      .set(array)
      .catch((error) => {
        console.log(error.message);
      });
  }

  function deleteHandler() {
    alert("Function not implemented yet.")
  }

  let registerBtn;
  if (eventInfo.adminUid === user.uid) {
    registerBtn = (
      <>
        <p>Admin</p>
        <button className={classes.btn} onClick={deleteHandler}>Delete</button>
      </>
    );
  } else if (eventInfo.attendeeUids.includes(user.uid)) {
    registerBtn = (
      <button className={classes.btn} onClick={unregHandler}>
        UnRegister
      </button>
    );
  } else {
    registerBtn = (
      <button className={classes.btn} onClick={registerHandler}>
        Register
      </button>
    );
  }

  function registerHandler() {
    let uidArr = eventInfo.attendeeUids;
    uidArr.push(user.uid);

    updateDBArr(eventInfo, uidArr);
    alert(`You are now registered for this event ${eventInfo.name}`);
  }

  function unregHandler() {
    let filteredArr = eventInfo.attendeeUids.filter((uid) => user.uid !== uid);

    updateDBArr(eventInfo, filteredArr);
    alert(`Registration for ${eventInfo.name} has been cancelled`);
  }

  return (
    <React.Fragment>
      <td>
        <Link to={{
          pathname: "/event-info",
          state: {
            event: eventInfo
          }
        }} className={classes.evtBtn}>{eventInfo.name}</Link>
      </td>
      <td>{eventInfo.date}</td>
      <td>{eventInfo.address}</td>
      <td>{eventInfo.attendeeUids ? eventInfo.attendeeUids.length : 0}</td>
      <td>{eventInfo.description}</td>
      <td>{registerBtn}</td>
    </React.Fragment>
  );
};

export default EventItem;
