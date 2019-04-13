import React, { Component } from "react"
//import ContentTitle from "./ContentTitle";
import fire from "./config/Fire"
import Post from "./post.jsx"
import ReactDom from "react-dom"
import NavBar from "./NavBar.jsx"
import PostComment from "./PostComment.jsx"

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo : null
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
            <NavBar />
            <Post postid="template(ID)"/>
            <PostComment postid="template(ID)" username={this.props.username}/>
        </div>
        );
    }
}
export default PostPage