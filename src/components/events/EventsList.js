import { firebase } from "../../config/Firebase";
import { useEffect, useState } from "react";
import EventItem from "./EventItem";
import classes from "../../styling/EventsList.module.css";

const EventsList = () => {
  const [eventInfo, setEventInfo] = useState([]);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    let currentDate = new Date();
    firebase
      .database()
      .ref("events")
      .once("value", (event) => {
        const events = event.val();
        const eventList = [];
        for (let id in events) {
          eventList.push(events[id]);
        }
        const filteredEvents = eventList.filter(
          (e) => new Date(e.date) >= currentDate
        );
        setEventInfo(filteredEvents);
      });
  });

  return (
    <div className={classes.container}>
      <h1 className={classes.list}>List of Upcoming Events</h1>
      {eventInfo.length === 0 ? (
        <p>There are no events planned.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Address</th>
              <th>Players</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {eventInfo.map((event, idx) => (
              <tr key={idx}>
                <EventItem eventInfo={event} user={user} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventsList;
