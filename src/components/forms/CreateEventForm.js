import { useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";

import classes from "../../styling/CreateEventForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const CreateEventForm = ({onAddEvent}) => {
  const [date, setDate] = useState(new Date());
  const eventNameInputRef = useRef();
  const eventAddressInputRef = useRef();
  const eventDescriptionInputRef = useRef();

  function dateChange(date) {
    setDate(date);
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredEventName = eventNameInputRef.current.value;
    const enteredAddress = eventAddressInputRef.current.value;
    const eneteredDescription = eventDescriptionInputRef.current.value;

    const newEventData = {
      eventName: enteredEventName,
      eventDate: date.toLocaleString("en-us", {weekday: "long", month: "short", day: "2-digit" , year: "numeric", hour: "numeric", minute: "numeric", hour12: "true"}),
      eventAddress: enteredAddress,
      eventDescription: eneteredDescription,
    };

    onAddEvent(newEventData);
    eventNameInputRef.current.value = "";
    eventAddressInputRef.current.value = "";
    eventDescriptionInputRef.current.value = "";
  }
  return (
    <div>
      <h1 className={classes.welcome}>Create a New Event</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label>Event Name</label>
        <input type="text" placeholder="Event Name" ref={eventNameInputRef} />
        <div className="form-group">
          <label>Date of Event</label>
          <ReactDatePicker
            selected={date}
            onChange={dateChange}
            showTime={{use12hours: true}}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={30}
            timeCaption="Select Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <label>Event Address</label>
        <input type="text" placeholder="Address" ref={eventAddressInputRef} />
        <label>Event Description</label>
        <textarea id="description" required rows="3" ref={eventDescriptionInputRef}></textarea>
        <div className={classes.btnContainer}>
          <button>Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
