import React, { Component } from "react";
import fire from "./config/Fire";
import ReactDOM from "react-dom"
import Home from "./Home.js"

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.goHome = this.goHome.bind(this)
        this.logout = this.logout.bind(this)
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
    render() {
        return(
            <div>
                <button onClick={this.goHome}>Home</button>
                <button onClick={this.goProfile}>Profile</button>
            </div>
            );
    }
}
export default NavBar