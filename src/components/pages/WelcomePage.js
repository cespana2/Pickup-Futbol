import classes from "../../styling/WelcomePage.module.css";
import pickupFutbolImg from "../../images/goldengg.jpeg";

const WelcomePage = () => {
  return (
    <div>
      <section className={classes.container}> 
        <img
          className={classes.image}
          src={pickupFutbolImg}
          alt="pickup-futbol"
        />
      </section>
      {/* <h1>Welcome Soccer Fanatics!</h1> */}

      <section className={classes.container}>
        {/* <h1>
          Pickup Futbol is all about finding pick up soccer games around the bay
          area!
        </h1> */}
        <h1>
          Create an account to view upcoming games, start an event and chat with players
          attending the same event!
        </h1>
      </section>

    </div>
  );
};

export default WelcomePage;
