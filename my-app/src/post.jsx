import React, { Component } from 'react';
import fire from "./config/Fire";
import './post.css';


// feed me a prop called postid which will be the key of the post in Firebase
class Post extends Component {
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

    componentDidUpdate(prevProps) {
        //not sure if we need this, since we probably only want to update when the user requests an update, but maybe not
    }
    
    render() {
        if (this.state.postInfo !== null) {
            return <div className="postTile">
                    <div className="votebox">
                        {/* TODO: add functionality for the buttons below */}
                        <button value="upvote">^</button>
                        <span>{this.state.postInfo.upvotes - this.state.postInfo.downvotes}</span>
                        <button value="downvote">v</button>
                    </div>
                    <div className="postdata">
                        <span className="author">{"Posted by: "+this.state.postInfo.userID}</span><br/>
                        <h2 className="title">{this.state.postInfo.title}</h2>
                        <img src={this.state.postInfo.media} alt={this.state.postInfo.userID + "img"}></img>
                    </div>
                </div>;
        } else {
            return <div>
                    <p>...No Post Data...</p>
                </div>;
        }
    }
}

export default Post;
