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
  console.log(location)

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
         {/* <div className={classes.events}>
           <h2>Upcoming Events</h2>
         </div> */}
         <div className={classes.chat}>
         <h1 style={{marginBottom: '20px'}}>{event.name}</h1>
           <section className={classes.chatCtr}>
             <MessageList
               playerInfo={playerUids}
               currentUser={currentUserInfo}
               event={event}
             />
           </section>
         </div>
         <div className={classes.details}>
           <section>
           <h2>Details</h2>
             <p><strong>Date: </strong>{event.date}</p>
             <p><strong>Location: </strong>{event.address}</p>
             <p><strong>Description: </strong>{event.description}</p>
           </section>
           <div>
           <h2>Player List</h2>
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
         </div>
         </div>
    </div>
    
  );
};

export default EventInfo;
