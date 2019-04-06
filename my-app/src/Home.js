import React, { Component } from "react";
//import ContentTitle from "./ContentTitle";
import fire from "./config/Fire";

//states are local variables read/write
//props are input parameters read only
class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    var tempUser = fire.auth().currentUser;
    var database = fire.database();
    var userRef = database.ref();
    fire.database().ref('/Users/' + tempUser.uid).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            userRef = snapshot.val();
            alert(snapshot.val().email);
            console.log(userRef.email);
        } else {
            //push all the user properties
            //fire.database().ref('Users/' + tempUser.uid);
            //writeUser(currentUser);
            fire.database().ref('Users/' + tempUser.uid).set({
                email: tempUser.email,
                username: fire.auth().currentUser.email.substring(0, fire.auth().currentUser.email.indexOf('@')),
                totalUpvotes: 0,
                totalDownvotes: 0,
            });
        }
    });
  }   
    
// topRef.child("Users").once(tempUser, function(snapshot) {
//     if (snapshot.exists()) {
//         var mainRef = snapshot.val();
//         alert(snapshot.val().email);
//         console.log(mainRef.email);
//     } else {
//         //push all the user properties
//         fire.database().ref('Users/' + tempUser.uid);
//         //writeUser(currentUser);
//         fire.database().ref('Users/' + tempUser.uid).set({
//             email: tempUser.email,
//             username: tempUser.email.substring(0, tempUser.email.indexOf('@')),
//             totalUpvotes: 0,
//             totalDownvotes: 0,
//         });
//     }
//     });
//     writeUser(x) {
//     fire.database().ref('Users/' + this.currentUser.uid).set({
//         email: x.email,
//         username: x.email.substring(0, x.email.indexOf('@')),
//     });
//   }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
        <React.Fragment>
      <div>
        <p id="title">CIS 371 GVReddit</p>
        <br />
        <p id="authors">By: Quinn Meagher, Nolan Gustafson, and Jake Young</p>
        <br />
        <h1>Welcome to Home</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
      <div className ="ContentTitle">
        <ol>
          {/* <li><ContentTitle /></li>
          <li><ContentTitle /></li>
          <li><ContentTitle /></li>
          <li><ContentTitle /></li>
          <li><ContentTitle /></li> */}
        </ol>
      </div>
      </React.Fragment>
    );
  }
}
export default Home;
