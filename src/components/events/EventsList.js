import { firebase } from "../../config/Firebase";
import { useEffect, useState } from "react";
import EventItem from "./EventItem";
import classes from "../../styling/EventsList.module.css";
import CreateEventForm from "../forms/CreateEventForm";

const EventsList = () => {
  // State to store event info
  const [eventInfo, setEventInfo] = useState([]);
  // State of Modal's open or closed status
  const [isOpen, setIsOpen] = useState(false);
  // State to manage selected row
  const [selectedRow, setSelectedRow] = useState(null);

  // Get current authenticated user
  const user = firebase.auth().currentUser;
  const date = new Date();

  // Function to handle adding a new event
  function addEventHandler(eventData) {
    var myRef = firebase
      .database()
      .ref("events")
      .push() // Create a new reference in "events"
    var key = myRef.key // Get the unique key for the new event
    const event = {
      name: eventData.eventName,
      date: eventData.eventDate.toString(),
      address: eventData.eventAddress,
      description: eventData.eventDescription,
      adminUid: user.uid,
      attendeeUids: [user.uid],
      eventId: key
    };

    myRef.set(event).catch((error) => {
      console.log(error.message);
    });
    // Create a chat room linked to the new event
    addChatRoomHandler(eventData, key)
    // Close the modal
    setIsOpen(!isOpen)

  }

  // Function to create a chat room linked to event
  function addChatRoomHandler(eventData, eventKey) {
    var myRef = firebase.database().ref("chatRooms").child(eventKey); // Create a new instance in "chatrooms"
    const chatRoom = {
      eventName: eventData.eventName,
      eventId: eventKey,
      messages: [{
        dateSent: date.toLocaleString("en-us", {weekday: "long", month: "short", day: "2-digit" , year: "numeric", hour: "numeric", minute: "numeric", hour12: "true"}),
        uid: "0000000",
        name: "Bot",
        message: "Welcome!"
      }]
    };

    myRef.set(chatRoom).catch((error) => {
      console.log(error.message)
    })

  }

  // Function to handle row click and set the selected row
  const handleRowClick = (idx) => {
    setSelectedRow(idx);
  };
  
  useEffect(() => {
    let currentDate = new Date();
    firebase
      .database()
      .ref("events")
      .once("value", (event) => {
        // Get all events from the database
        const events = event.val(); 
        // Convert the events object into an array and filter to include only upcoming events
        const filteredEvents = Object.values(events).filter(
          (e) => new Date(e.date) >= currentDate
        );
        // Update the event info with the filtered events
        setEventInfo(filteredEvents);
      });
  }, [eventInfo]);

  return (
    <div className={classes.container}>
      <h1 className={classes.list}>Upcoming Events</h1>
      <button 
        className={classes.eventBtn} 
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        data-toggle="modal">
          New Event
      </button>
      {isOpen && (
        <>
          <div className={classes.backdrop} isOpen={isOpen}></div><div className={classes.popUp}>
            {/* <button style={{display: 'block', marginLeft: 'auto', width: '100px'}}>Hi</button> */}
            <span class="material-symbols-outlined" style={{marginLeft: 'auto', marginRight: '10px', cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)}>close</span>
            <CreateEventForm onAddEvent={addEventHandler} setIsOpen={setIsOpen}/>
          </div>
        </>
      )}
      {eventInfo.length === 0 ? (
        <p>There are no events planned.</p>
      ) : (
        <table style={{textAlign: 'left', borderRadius: '10px', border: '1px solid lightgray'}}>
          {/* <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Address</th>
              <th>Players</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead> */}
          <tbody>
            {eventInfo.map((event, idx) => (
              <tr 
                key={idx}
                onClick={() => handleRowClick(idx)}
                className={selectedRow === idx ? 'selected-row' : ''}
                style={{ backgroundColor: selectedRow === idx ? '#ADD8E6' : 'inherit' }}
              >
                <EventItem eventInfo={event} user={user} selected={selectedRow===idx}/>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventsList;
