import React, { Component } from "react";
//import ContentTitle from "./ContentTitle";
import fire from "./config/Fire";
import Post from "./post.jsx";
import NavBar from "./NavBar";


//states are local variables read/write
//props are input parameters read only
class Profile extends Component {
  constructor(props) {
    super(props);
    this.username = this.props.username;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      posts: [],
      user: {},
    }
  }

  componentDidMount() {
    var p = [];
    fire.database().ref("/Posts/").on('child_added', ((snapshot) => {
      if(snapshot.val().userID === this.username) {
        p.push({...snapshot.val(), postkey: snapshot.key});
        this.setState({posts: p})
      }
    }))
    var u = {};
    fire.database().ref("/Users/").on('child_added', ((snapshot) => {
      if(snapshot.val().username === this.username) {
        u = snapshot.val();
        this.setState({user: u});
      }
    }))
  }

  render() {

    return (
        <React.Fragment>
          <div className="NavBar">
            <NavBar username={this.username} />
          </div>
          <div className="textStyle profileText">
            <h1>{this.username}'s Page</h1>
            <h2>{this.username}'s upvotes: {this.state.user.totalUpvotes}</h2><hr></hr>
            <h2>{this.username}'s downvotes: {this.state.user.totalDownvotes}</h2><hr></hr>
            <h1>Posts:</h1>
            <ul>
              {this.state.posts.map((x) => {
                return(<div><li key={x.postkey}><Post postid={x.postkey} username={this.username}/></li><hr></hr></div>);
              })}
            </ul>
          </div>
        </React.Fragment>
    );
  }
}
export default Profile;