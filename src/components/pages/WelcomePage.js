import classes from "../../styling/WelcomePage.module.css";
import pickupFutbolImg from "../../images/goldengg.jpeg";
import soccerPlayer from "../../images/soccer-player.png"
import CreateAccount from "../forms/CreateAccountForm";
import { useHistory } from "react-router-dom";

const WelcomePage = () => {

  // Handler function that navigates the user to the create account page
  const history = useHistory();
  const createAccountHandler = () => {
    const path = '/create-account'
    history.push(path)
  }

  return (
    // <div className={classes.background}>
    //   {/* <section className={classes.container}>  */}
    //   {/* <section>
    //     <img
    //       className={classes.image}
    //       src={pickupFutbolImg}
    //       alt="pickup-futbol"
    //     />
    //   </section> */}
    //   <div className={classes.mainContainer}>
    //   <div className={classes.container}>
    //       <h1 className={classes.title}>Welcome to Pickup Futbol</h1>
    //       <br />
    //       <p className={classes.description}>Sign up to access upcoming soccer matches, organize your own games, and engage in conversations with fellow participants attending the match!</p>
    //       <button className={classes.button} onClick={createAccountHandler}>Create Account</button>
    //     </div>

    //     <div className={classes.soccerBall}>
    //         <img
    //           src={soccerPlayer}
    //           alt="soccer-player"
    //           width="400px"
    //         />
    //   </div>
    //   </div>

    <div className={classes.background}>
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <h1 className={classes.title}>Welcome to Pickup Futbol</h1>
          <p className={classes.description}>
            Sign up to access upcoming pickup soccer matches, organize your own games, and engage in conversations with fellow participants attending the match!
          </p>
          <button className={classes.button} onClick={createAccountHandler}>
            Create Account
          </button>
        </div>
        <div className={classes.soccerBall}>
          <img
            src={soccerPlayer}
            alt="soccer-player"
            width="100%"
          />
        </div>
      </div>
    </div>

      
      
    //   {/* <h1>Welcome Soccer Fanatics!</h1> */}

    //   {/* <div className={classes.container}> */}
    //     {/* <h1>
    //       Pickup Futbol is all about finding pick up soccer games around the bay
    //       area!
    //     </h1> */}
    //     {/* <h1>
    //       Create an account to view upcoming games, start an event and chat with players
    //       attending the same event!
    //     </h1>
    //   </div> */}

    // </div>
  );
};

export default WelcomePage;
