import React, { Component } from "react"
import fire from "./config/Fire"
import Post from "./post.jsx"
import NavBar from "./NavBar.jsx"
import PostComment from "./PostComment.jsx"

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo : {}
        }
    }

    componentDidMount() {
        //do a firebase query for the post
        let ref = fire.database().ref("/Posts/"+this.props.postid+"/")
        // this.setState({postInfo : ref})
        ref.on('value', (snapshot =>{
            this.setState({postInfo : snapshot.val()})
        }))
    }

    render() {
        return (
        <div id="PostPage">
            <NavBar username={this.props.username}/>
            <Post postid={this.props.postid}/>
            <hr></hr>
            <p className="textStyle postDescription">{this.state.postInfo.text}</p>
            <PostComment postid={this.props.postid} username={this.props.username}/>
        </div>
        );
    }
}
export default PostPage