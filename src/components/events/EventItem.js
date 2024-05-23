import classes from "../../styling/EventItem.module.css";
import { firebase } from "../../config/Firebase";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const EventItem = ({ eventInfo, user, selected }) => {

  // Updates array of attendees for event, depending on whether the user registered or unregistered for it
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

  // Changes register button depending on whether the user is registered, unregistered or is the creator of the event
  let registerBtn;
  if (eventInfo.adminUid === user.uid) {
    registerBtn = (
      <>
        {/* <p>Admin</p> */}
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

  // Function that pushes new array of attendeeUIDs to DB including the user that registered
  function registerHandler() {
    let uidArr = eventInfo.attendeeUids;
    uidArr.push(user.uid);

    updateDBArr(eventInfo, uidArr);
    alert(`You are now registered for this event.`);
  }

  // Function that pushes new array of attendeeUIDs to DB removing the user that unregistered
  function unregHandler() {
    let filteredArr = eventInfo.attendeeUids.filter((uid) => user.uid !== uid);

    updateDBArr(eventInfo, filteredArr);
    alert(`You are no longer registered for this event.`);
  }

  return (
    <React.Fragment>
        <Link to={{
          pathname: "/events",
          state: {
            event: eventInfo
          }
        }} className={classes.evtBtn}>
          <td style={{textAlign: 'left', paddingLeft: '10px'}}>
            <p style={{fontSize: '20px', fontWeight: "bold", color: 'black', marginBottom: 0}}>{eventInfo.name}</p>
            <p style={{fontSize: '12px', fontWeight: "normal", color: selected ? 'black' :'gray', paddingLeft: '5px'}}>{eventInfo.date}</p>
          </td>
        </Link>
      {/* <td>{eventInfo.date}</td> */}
      {/* <td>{eventInfo.address}</td> */}
      {/* <td>{eventInfo.attendeeUids ? eventInfo.attendeeUids.length : 0}</td> */}
      {/* <td>{eventInfo.description}</td> */}
      <td style={{width: "20%"}}>{registerBtn}</td>
    </React.Fragment>
  );
};

export default EventItem;
