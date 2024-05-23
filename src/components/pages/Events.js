import EventsList from "../events/EventsList";
import CreateEventForm from "../forms/CreateEventForm";
import classes from "../../styling/Events.module.css";
import { firebase } from "../../config/Firebase";
import EventInfo from "./EventInfo";
import { useLocation } from "react-router";
import { useEffect } from "react";


const Events = () => {
  const location = useLocation();
  const event = location.state?.event;

  // const user = firebase.auth().currentUser;
  // const date = new Date();


  // function addChatRoomHandler(eventData, eventKey) {
  //   var myRef = firebase.database().ref("chatRooms").child(eventKey);
  //   const chatRoom = {
  //     eventName: eventData.eventName,
  //     eventId: eventKey,
  //     messages: [{
  //       dateSent: date.toLocaleString("en-us", {weekday: "long", month: "short", day: "2-digit" , year: "numeric", hour: "numeric", minute: "numeric", hour12: "true"}),
  //       uid: "0000000",
  //       name: "Bot",
  //       message: "Welcome!"
  //     }]
  //   };

  //   myRef.set(chatRoom).catch((error) => {
  //     console.log(error.message)
  //   })

  // }

  // function addEventHandler(eventData) {
  //   var myRef = firebase
  //     .database()
  //     .ref("events")
  //     .push()
  //   var key = myRef.key
  //   const event = {
  //     name: eventData.eventName,
  //     date: eventData.eventDate.toString(),
  //     address: eventData.eventAddress,
  //     description: eventData.eventDescription,
  //     adminUid: user.uid,
  //     attendeeUids: [user.uid],
  //     eventId: key
  //   };

  //   myRef.set(event).catch((error) => {
  //     console.log(error.message);
  //   });
  //   addChatRoomHandler(eventData, key)

  // }

  return (
    <div className={classes.mainContainer}>
      <section className={classes.eventsContainer}>
        <EventsList />
      </section>
      <section className={classes.container}>
        {/* <CreateEventForm onAddEvent={addEventHandler} /> */}
        {event ? <EventInfo /> : <p style={{textAlign: "center", marginTop: "15px"}}>No event selected.</p>}
      </section>
    </div>
  );
};

export default Events;
