import { useRef } from "react";

import classes from "../../styling/CreateAccountForm.module.css"

const CreateAccount = ({addMember}) => {
  const fnameInputRef = useRef();
  const lnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cpasswordInputRef = useRef();
  

  function submitHandler(event) {
    event.preventDefault();

    const enteredFirstName = fnameInputRef.current.value;
    const enteredLastName = lnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = cpasswordInputRef.current.value;

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
      <h1 className={classes.welcome}>Become a Member</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          ref={fnameInputRef}
        />
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          ref={lnameInputRef}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          ref={emailInputRef}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          ref={passwordInputRef}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          ref={cpasswordInputRef}
          className={cpasswordInputRef !== passwordInputRef ? classes.incPass : "input"} 
        />
        <div className={classes.btnContainer}>
          <button>Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
