import React, { Component } from 'react';
import fire from './config/Fire';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <p id="title">CIS 371 GVReddit</p><br/>
                <p id="authors">By: Quinn Meagher, Nolan Gustafson, and Jake Young</p><br/>
                <h1>Welcome to Home</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        );

    }

}

export default Home;