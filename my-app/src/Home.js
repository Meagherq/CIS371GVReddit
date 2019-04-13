import React, { Component } from "react";
//import ContentTitle from "./ContentTitle";
import fire from "./config/Fire";
import Post from "./post.jsx";
import NavBar from "./NavBar.jsx"

//states are local variables read/write
//props are input parameters read only
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username : fire.auth().currentUser.email.substring(0, fire.auth().currentUser.email.indexOf('@'))
    }
    this.logout = this.logout.bind(this);
    var tempUser = fire.auth().currentUser;
    var database = fire.database();
    var userRef = database.ref();
    fire.database().ref('/Users/' + tempUser.uid).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            userRef = snapshot.val();
            //alert(snapshot.val().email);
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
            }).then( () => {
                userRef = fire.database().ref('Users/' + tempUser.uid);
                //alert(userRef.email);
            });
        }
    });  
}
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
//   getImgUrlFromFirebase() {
//       imgUrl = postRef.imgUrl;
//       return imgUrl
//   }

  render() {
    return (
        //Dont modify app modify base elementbyid
        <div>
        <div className="NavBar">
            <NavBar />
        </div>
      <div id="base">
        <p id="title">CIS 371 GVReddit</p>
        <br />
        <p id="authors">By: Quinn Meagher, Nolan Gustafson, and Jake Young</p>
        <br />
        <h1>Welcome to Home</h1>
        <div className ="ContentTitle">
          <Post postid="template(ID)" username={this.state.username}/>
          <Post postid="template(ID)" username={this.state.username}/>
        </div>
        <button onClick={this.logout}>Logout</button>
      </div>
      </div>
    );
  }
}
export default Home;
