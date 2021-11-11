import { useRef } from "react";
import classes from "../../styling/ChatBox.module.css";
import { firebase } from "../../config/Firebase";


const ChatBox = ({ chatLog, user, chatInfo, playerInfo, currentUser }) => {
  const messageInputRef = useRef();

  function writeToDb(array) {
    firebase
    .database()
    .ref("chatRooms/" + chatInfo.eventId + "/messages")
    .set(array)
    .catch((error) => {
      console.log(error.message);
    });
  }

  function newMessage(event) {
    event.preventDefault();
    let userName;
    playerInfo.forEach((player) => {
        if (user.uid === player.uid) {
          userName = player.fname;
        }
      });

    const enteredMessage = messageInputRef.current.value;
    const newMessage = {
      dateSent: new Date().toLocaleString("en-us", {
        weekday: "long",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: "true",
      }),
      uid: user.uid,
      name: userName,
      message: enteredMessage,
    };

    chatLog.push(newMessage);
    writeToDb(chatLog)
    messageInputRef.current.value = "";
  }

  return (
    <form onSubmit={newMessage}>
      <input
        placeholder="Chat Here"
        className={classes.chatBox}
        ref={messageInputRef}
        type="text"
      />
    </form>
  );
};

export default ChatBox;
