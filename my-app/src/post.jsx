import React, { Component } from 'react';
import fire from "./config/Fire";
import './post.css';
import ReactDOM from "react-dom"
import PostPage from "./PostPage.jsx"
import Home from "./Home.js"

class Post extends Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this)
        this.goHome = this.goHome.bind(this)
        this.vote = this.vote.bind(this)
        this.state = {
            postInfo : null,
            postRef : fire.database().ref("/Posts/"+this.props.postid+"/"),
            topRef : fire.database().ref()
        }
    }

    componentDidMount() {
        this.state.postRef.on('value', (snapshot =>{
            this.setState({postInfo : snapshot.val()})
        }))
    }

    componentDidUpdate(prevProps) {
    }

    goHome() {
        ReactDOM.render(<Home />, document.getElementById("root"))
    }

    change() {
        ReactDOM.render(<PostPage postid={this.props.postid} username={this.props.username} media={this.props.media}/>, document.getElementById("root"));
    }    
    
    vote(e){
        let yaynay = e.target.value
        let currentuid = fire.auth().currentUser.uid
        let userRef = this.state.topRef.child("/Users/"+currentuid)
        userRef.child("/votesMade/"+this.props.postid).once("value", snapshot =>{
            if(snapshot.exists()){ //vote has already been made
                //previous vote for this post is 'up'
                if(snapshot.val() === 'up'){ 
                    if(yaynay === 'up'){    //pressed 'up' again, so cancel last vote
                        userRef.child("/votesMade/").update({[this.props.postid] : null})//cancel by changing opinion in User table to null
                        let votesUp = this.state.postInfo.upvotes
                        votesUp--   //adjust post's upvotes
                        this.state.postRef.update({upvotes : votesUp})
                    }
                    if(yaynay === 'down'){
                        userRef.child("/votesMade/").update({[this.props.postid] : 'down'})//change opinion in User table to 'down'
                        let votesDown = this.state.postInfo.downvotes
                        let votesUp = this.state.postInfo.upvotes
                        votesUp--   //adjust upvotes
                        votesDown++ //adjust downvotes
                        this.state.postRef.update({upvotes : votesUp})
                        this.state.postRef.update({downvotes : votesDown})
                    }
                }
                //previous was 'down'
                if(snapshot.val() === 'down'){ 
                    if(yaynay === 'down'){    //pressed 'down' again, so cancel last vote
                        userRef.child("/votesMade/").update({[this.props.postid] : null})//cancel by changing opinion in User table to null
                        let votesDown = this.state.postInfo.downvotes
                        votesDown--   //adjust post's downvotes
                        this.state.postRef.update({downvotes : votesDown})
                    }
                    if(yaynay === 'up'){
                        userRef.child("/votesMade/").update({[this.props.postid] : 'up'})//change opinion in User table to 'up'
                        let votesUp = this.state.postInfo.upvotes
                        let votesDown = this.state.postInfo.downvotes
                        votesUp++ //adjust upvotes
                        votesDown-- //adjust downvotes
                        this.state.postRef.update({upvotes : votesUp})
                        this.state.postRef.update({downvotes : votesDown})
                    }
                }
            }
            else{   //there hasn't been a vote made yet
                if(yaynay === 'up'){
                    userRef.child("/votesMade/").update({[this.props.postid] : 'up'})//change opinion in User table to 'up'
                    let votesUp = this.state.postInfo.upvotes
                    votesUp++
                    this.state.postRef.update({upvotes : votesUp})
                }
                if(yaynay === 'down'){
                    userRef.child("/votesMade/").update({[this.props.postid] : 'down'})//change opinion in User table to 'up'
                    let votesDown = this.state.postInfo.downvotes
                    votesDown++
                    this.state.postRef.update({downvotes : votesDown})
                }
            }
        })
        
    }

    render() {
        if (this.state.postInfo !== null) {
            return <div className="postTile textStyle">
                    {/* <button onClick={this.goHome}>Home</button> */}
                    <div className="votebox">
                        <button className="upvotebutton" value="up" onClick={this.vote}>&#8205; &#8205; &#8205;</button>
                        <span>{this.state.postInfo.upvotes - this.state.postInfo.downvotes}</span>
                        <button className="downvotebutton" value="down" onClick={this.vote}>&#8205; &#8205; &#8205;</button>
                    </div>
                    <div className="postdata">
                        <span className="author">{"Posted by: "+this.state.postInfo.userID}</span><br/>
                        <p onClick={this.change} className="pTitle">{this.state.postInfo.title}</p>
                        <img className="postImage" onClick={this.change} src={this.state.postInfo.media} alt={this.state.postInfo.userID + "img"}></img>
                    </div>
                </div>
        } else {
            return <div>
                    <p>...No Post Data...</p>
                </div>;
        }
    }
}
export default Post;
