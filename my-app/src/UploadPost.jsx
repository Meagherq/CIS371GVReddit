import React, { Component } from "react";
import fire from "./config/Fire";
import NavBar from "./NavBar.jsx"
import ReactDOM from "react-dom"
import Home from "./Home.js";

class UploadPost extends Component {
    constructor(props) {
        super(props)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescripChange = this.handleDescripChange.bind(this)
        this.handleUrlChange = this.handleUrlChange.bind(this)
        this.handlePostSubmit = this.handlePostSubmit.bind(this)
        this.goHome = this.goHome.bind(this)
        this.state = {
            postTitle: "",
            postDescription: "",
            imgURL: "",
        }
    }


    handleTitleChange(e) {
        this.setState({
            postTitle: e.target.value
        })
    }
    handleDescripChange(e) {
        this.setState({
            postDescription: e.target.value
        })
    }
    handleUrlChange(e) {
        this.setState({
            imgURL: e.target.value
        })
    }

    goHome() {
        ReactDOM.render(<Home />, document.getElementById("root"))
    }

    handlePostSubmit(){
        fire.database().ref('Posts/').push({
            downvotes : 0,
            upvotes: 0,
            media: this.state.imgURL,
            text: this.state.postDescription,
            title: this.state.postTitle,
            userID: this.props.username,
        })
        this.goHome()
    }
    render() {
        return(
            <div>
                <NavBar username={this.props.username}/>
                <h1>Create a new post!</h1>
                <label>Input post title </label>
                <input type="text" value={this.postTitle} placeholder="Your title" onChange={this.handleTitleChange}/><br/>
                <label> Input post description </label>
                <input type="text" value={this.postDescription} placeholder="Your description" onChange={this.handleDescripChange}/><br/>
                <label> Input image URL </label>
                <input type="text" value={this.imgURL} placeholder="Your URL" onChange={this.handleUrlChange}/><br/>
                <button onClick={this.handlePostSubmit} className="postButton">Submit your post!</button> 
            </div>
        )
    }
}
export default UploadPost