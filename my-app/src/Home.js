import React, { Component } from "react";
import fire from "./config/Fire";
import NavBar from "./NavBar.jsx"
import PostList from "./postList.jsx"
import logo from "./logo.png"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username : fire.auth().currentUser.email.substring(0, fire.auth().currentUser.email.indexOf('@'))
    }
    // this.logout = this.logout.bind(this);
    var tempUser = fire.auth().currentUser;
    var database = fire.database();
    var userRef = database.ref();
    fire.database().ref('/Users/' + tempUser.uid).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            userRef = snapshot.val();
            console.log(userRef.email);
        } else {

            fire.database().ref('Users/' + tempUser.uid).set({
                email: tempUser.email,
                username: fire.auth().currentUser.email.substring(0, fire.auth().currentUser.email.indexOf('@')),
                totalUpvotes: 0,
                totalDownvotes: 0,
            }).then( () => {
                userRef = fire.database().ref('Users/' + tempUser.uid);
            });
        }
    });
    
}
    componentDidMount() {

        
    }

//   logout() {
//     fire.auth().signOut();
//     // eslint-disable-next-line no-restricted-globals
//     location.reload(true);
//   }

   
  render() {
    return (
        <div>
        <div className="NavBar">
            <NavBar username={this.state.username}/>
        </div>
      <div id="base">
        <img src={logo} id="logoimg" alt=""/>
        <p id="siteAuthors" className="textStyle" >By: Quinn Meagher, Nolan Gustafson, and Jake Young</p>
        <div className ="ContentTitle">
          <PostList username={this.state.username}/>
        </div>
        {/* <button class="button" onClick={this.logout}>Logout</button> */}
      </div>
      </div>
    );
  }
}
export default Home;
