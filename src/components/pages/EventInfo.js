import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { firebase } from "../../config/Firebase";
import MessageList from "../chatroom/MessageList";
import classes from "../../styling/EventInfo.module.css";

const EventInfo = () => {
  const [playerUids, setPlayerUids] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const user = firebase.auth().currentUser
  const location = useLocation();
  const { event } = location.state;
  const playerArr = event.attendeeUids;

  useEffect(() => {
    const playerList = [];
    firebase
      .database()
      .ref("users")
      .once("value", (playerInfo) => {
        const players = playerInfo.val();
        const keys = Object.keys(players);
        playerArr.forEach((player) => {
          keys.forEach((key) => {
            if(key === player) {
              playerList.push(players[key]);
            }
            else if(key === user.uid) {
              setCurrentUserInfo(players[key]);

            }
          })
        })
        setPlayerUids(playerList);
      }); 
  }, [playerArr, user.uid]);

  return (
    <div className={classes.container}>
      <h1>{event.name} Player List</h1>
      <table className={classes.playerTbl}>
        <thead>
          <th>Player Names</th>
        </thead>
        <tbody>
          {playerUids.map((player, idx) => (
            <tr key={idx}>
              <td>{player.fname + " " + player.lname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className={classes.chatCtr}>
        <h2>Pick Up Game Chat</h2>
        <MessageList
          playerInfo={playerUids}
          currentUser={currentUserInfo}
          event={event}
        />
      </section>
    </div>
  );
};

export default EventInfo;
