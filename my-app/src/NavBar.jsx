import React, { Component } from "react";
import fire from "./config/Fire";
import ReactDOM from "react-dom"
import Home from "./Home.js"
import UploadPost from "./UploadPost.jsx"

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.goHome = this.goHome.bind(this)
        this.logout = this.logout.bind(this)
        this.goNewPost = this.goNewPost.bind(this)
        this.goProfile = this.goProfile.bind(this)
    }
    
    logout() {
        fire.auth().signOut();
    }
    goHome() {
        ReactDOM.render(<Home />, document.getElementById("root"))
    }
    goProfile() {
        //Change this to Profile component
        ReactDOM.render(<Home />, document.getElementById("root"))
    }
    goNewPost(){
        ReactDOM.render(<UploadPost username={this.props.username}/>, document.getElementById("root"))
    }
    render() {
        return(
            <div>
                <button onClick={this.goHome}>Home</button>
                <button onClick={this.goProfile}>Profile</button>
                <button onClick={this.goNewPost}>Make a new post!</button>
            </div>
            );
    }
}
export default NavBar