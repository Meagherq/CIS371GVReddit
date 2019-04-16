import React, { Component } from "react";
import fire from "./config/Fire";
import ReactDOM from "react-dom"
import Home from "./Home.js"
import UploadPost from "./UploadPost.jsx"
import Profile from "./Profile.js"

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.goHome = this.goHome.bind(this)
        this.logout = this.logout.bind(this)
        this.goNewPost = this.goNewPost.bind(this)
        this.goProfile = this.goProfile.bind(this)
    }
    goHome() {
        ReactDOM.render(<Home />, document.getElementById("root"))
    }
    goProfile() {
        ReactDOM.render(<Profile username={this.props.username} />, document.getElementById("root"))
    }
    goNewPost(){
        ReactDOM.render(<UploadPost username={this.props.username}/>, document.getElementById("root"))
    }

    logout() {
        fire.auth().signOut();
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
      }

    render() {
        return(
            <div>
                <button className="button" onClick={this.goHome}>Home</button>
                <button className="button" onClick={this.goProfile}>Profile</button>
                <button className="button" onClick={this.goNewPost}>Make a new post!</button>
                <button className="button" onClick={this.logout}>Logout</button>
            </div>
            );
    }
}
export default NavBar   