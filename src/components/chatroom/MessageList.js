import classes from "../../styling/MessageList.module.css";
import { firebase } from "../../config/Firebase";
import ChatBox from "./ChatBox";
import { useEffect, useState, useRef } from "react";

const MessageList = ({ playerInfo, event, currentUser }) => {
  const user = firebase.auth().currentUser;
  const [chatLog, setChatLog] = useState([]);
  const [chatMsgs, setChatMsgs] = useState([]);
  const messagesEndRef = useRef(null)

  useEffect(() => {
    firebase
      .database()
      .ref("chatRooms/" + event.eventId)
      .once("value", (chatInfo) => {
        const chat = chatInfo.val();
        const chatList = [];
        chatList.push(chat);
        setChatLog(chatList);
      });

    chatLog.forEach((info) => {
      setChatMsgs(info.messages);
    });

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [chatLog, event.eventId]);

  return (
    <div>
      <ul className={classes.chatUi}>
        {chatMsgs.map((chat, idx) => (
          <li
            key={idx}
            className={chat.uid === user.uid ? classes.myMsg : classes.msgList}
          >
            <div className={classes.name}>{chat.name}</div>
            <div className={chat.uid === user.uid ? classes.myMsgText : classes.msg}>{chat.message}</div>
          </li>
        ))}
        <div ref={messagesEndRef}/>
      </ul>
      <section onClick>
        <ChatBox
          chatLog={chatMsgs}
          user={user}
          chatInfo={event}
          playerInfo={playerInfo}
          currentUser={currentUser}
        />
      </section>
    </div>
  );
};

export default MessageList;
