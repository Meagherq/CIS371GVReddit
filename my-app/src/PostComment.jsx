import React, { Component } from "react";
//import ContentTitle from "./ContentTitle";
import fire from "./config/Fire";


var commentInfo = []
var commentText = "";
class PostComment extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
        this.state = {
            postInfo : [],
        }
        
    }



    componentDidMount() {
        fire.database().ref("/Posts/"+this.props.postid+"/comments").on('child_added', ((commentSnapshot) => {
            fire.database().ref("/Comments/"+commentSnapshot.key).once('value', (infoSnapshot) => {
                commentInfo.push({...infoSnapshot.val(), commentKey: infoSnapshot.key})
                this.setState({postInfo : commentInfo})
            })
        }))
    }



    handleCommentSubmit() {
        var newData= {
            downvotes : 0,
            upvotes : 0,
            text : commentText,
            postID : this.props.postid,
            userID : this.props.username
            }
            var Uid = Math.random().toString(36).substr(2, 9)
        fire.database().ref('Comments/' + Uid).set(newData);    
        fire.database().ref('Posts/'+this.props.postid+'/comments/'+Uid).set({userID : this.props.username})

        // fire.database().ref('Posts/'+this.props.postid+'/comments/' + Uid).once('value').then(function(snapshot) {
        //     fire.database().ref('Posts/'+this.props.postid+'/comments/' + Uid).set({userID : this.props.username});     
        // });
        //commentInfo.push({id : Uid, text : commentText, user: this.props.username, upvotes : 0, downvotes : 0})
        console.log(commentInfo)
        
    }
        //commentInfo.push({id : this.props.postid, text : commentText, user: this.props.username, upvotes : 0, downvotes : 0})


    
    handleChange(e) {
        commentText = e.target.value
    }


    componentWillUnmount() {
        commentInfo = []
    }

    render() {
        return (
        <div id="PostComment">
                    <div className="form-group">
                        {/* <label htmlFor="exampleInputEmail1">Email address</label>
                        <input rows = "4" value={this.state.commentText} onChange={this.handleChange}/> */}
                        <textarea rows="4" cols="50" value={this.commentText} onChange={this.handleChange}>
                        </textarea>
                    </div>
                <button type="submit" onClick={this.handleCommentSubmit} className="btn btn-primary">Submit!</button>
            <ol>
                {this.state.postInfo.map(function(snapshot){ return(<li key={snapshot.commentKey}>{snapshot.text} | posted by: {snapshot.userID}</li>)})}
            </ol>
        </div>
        );
    }
}
export default PostComment