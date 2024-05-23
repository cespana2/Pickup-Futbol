import { useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";

import classes from "../../styling/CreateEventForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const CreateEventForm = ({onAddEvent}) => {
  // State to manage the selected date
  const [date, setDate] = useState(new Date());

  
  // Refs to get the input values directly from the DOM
  const eventNameInputRef = useRef();
  const eventAddressInputRef = useRef();
  const eventDescriptionInputRef = useRef();

  // Handler to update the date state when the date picker value changes
  function dateChange(date) {
    setDate(date);
  }

  // Handler for form submission
  function submitHandler(event) {
    event.preventDefault();

    // Getting the values entered in the form inputs
    const enteredEventName = eventNameInputRef.current.value.trim();
    const enteredAddress = eventAddressInputRef.current.value.trim();
    const enteredDescription = eventDescriptionInputRef.current.value.trim();

    // Creating a new event object with the entered data
    const newEventData = {
      eventName: enteredEventName,
      eventDate: date.toLocaleString("en-us", {weekday: "long", month: "short", day: "2-digit" , year: "numeric", hour: "numeric", minute: "numeric", hour12: "true"}),
      eventAddress: enteredAddress,
      eventDescription: enteredDescription,
    };

    // Passing the new event data to the parent component's handler
    onAddEvent(newEventData);

    // Clearing the input fields after submission
    eventNameInputRef.current.value = "";
    eventAddressInputRef.current.value = "";
    eventDescriptionInputRef.current.value = "";


  }
  return (
    <div>
      <h1 className={classes.welcome}>Create a New Event</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label>Event Name</label>
        <input type="text" placeholder="Event Name" ref={eventNameInputRef} required/>
        <div className={classes.formGroup}>
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
            calendarClassName={classes.datePicker}
          />
        </div>
        <label>Event Address</label>
        <input type="text" placeholder="Address" ref={eventAddressInputRef} required/>
        <label>Event Description</label>
        <textarea id="description" required rows="3" ref={eventDescriptionInputRef}></textarea>
        <div>
          <button className={classes.evtBtn}>Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
