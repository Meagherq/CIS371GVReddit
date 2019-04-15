import React, { Component } from "react";
import fire from "./config/Fire";
import Post from "./post.jsx";
import NavBar from "./NavBar.jsx"


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

  logout() {
    fire.auth().signOut();
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
  }

   
  render() {
    return (
        //Dont modify app modify base elementbyid
        <div>
        <div className="NavBar">
            <NavBar username={this.state.username}/>
        </div>
      <div id="base">
        <p id="title">CIS 371 GVReddit</p>
        <br />
        <p id="authors">By: Quinn Meagher, Nolan Gustafson, and Jake Young</p>
        <br />
        <h1>Welcome to Home</h1>
        <div className ="ContentTitle">
          <PostList username={this.state.username}/>
          {/* <Post postid="template(ID)" username={this.state.username}/>
          <Post postid="template(ID)" username={this.state.username}/> */}
        </div>
        <button onClick={this.logout}>Logout</button>
      </div>
      </div>
    );
  }
}
export default Home;
