import { useHistory } from "react-router";

import CreateAccountForm from "../forms/CreateAccountForm";
import {firebase} from "../../config/Firebase";

const CreateAccount = () => {
  const history = useHistory();

  function writeUserData(user) {
    firebase.database().ref("users/" + user.uid).set(user).catch(error => {
      console.log(error.message)
    });
  }

  function addMemberHandler(memberData) {
    firebase.auth().createUserWithEmailAndPassword(memberData.email, memberData.password)
    .then((u) => {
      const user = {
        fname: memberData.fname,
        lname: memberData.lname,
        uid: u.user.uid,
        email: memberData.email
      }
      writeUserData(user)

      history.push("/home")
    })
    .catch((err) => {
      console.log("Error: " + err.toString());
    })
  }

  return (
    <div style={{background: 'rgb(2, 0, 36)',background: 'linear-gradient(90deg,rgba(2, 0, 36, 1) 0%,rgba(9, 9, 121, 1) 16%,rgba(0, 212, 255, 1) 100%)', minHeight: '100vh', display: 'flex'}}>
      <CreateAccountForm addMember={addMemberHandler}/>
    </div>
  );
};

export default CreateAccount;
