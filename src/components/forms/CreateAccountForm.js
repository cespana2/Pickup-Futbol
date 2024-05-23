import { useRef, useState } from "react";

import classes from "../../styling/CreateAccountForm.module.css"

const CreateAccount = ({addMember}) => {
  const fnameInputRef = useRef();
  const lnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cpasswordInputRef = useRef();

  // State to manage whether password and confirm password match
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  // Handler to check if password matches or not when it changes 
  const handlePasswordChange = () => {
    if (passwordMismatch) {
      setPasswordMismatch(false);
    }
  };

  // Handler to check if the confirmed password matches or not when it changes
  const handleConfirmPasswordChange = () => {
    if (passwordMismatch) {
      setPasswordMismatch(false);
    }
  };

  // Handler for form submission
  function submitHandler(event) {
    event.preventDefault();

    const enteredFirstName = fnameInputRef.current.value;
    const enteredLastName = lnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = cpasswordInputRef.current.value;

    if (enteredPassword != enteredConfirmPassword) {
      setPasswordMismatch(true)
      return;
    }

    // Creating new acount object with account data
    const newAccountData = {
        fname: enteredFirstName,
        lname: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
        cpassword: enteredConfirmPassword
    }

    addMember(newAccountData);
  }

  return (
    <div className={classes.container}>
      <h1>Become a Member</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          type="text"
          placeholder="First Name"
          ref={fnameInputRef}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          ref={lnameInputRef}
          required
        />
        <input
          type="email"
          placeholder="Email"
          ref={emailInputRef}
          required
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordInputRef}
          onChange={handlePasswordChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          ref={cpasswordInputRef}
          onChange={handleConfirmPasswordChange}
          className={passwordMismatch ? classes.incPass : ""} 
          required
        />
        {passwordMismatch && <p className={classes.error}>Passwords do not match</p>}
        <div>
          <button className={classes.acctBtn}>Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
