import React, { Component } from "react";
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
        console.log(commentInfo)   
    }


    
    handleChange(e) {
        commentText = e.target.value
    }


    componentWillUnmount() {
        commentInfo = []
    }

    render() {
        return (
        <div id="PostComment"><hr></hr>
                    <div className="form-group textStyle">
                        <textarea rows="4" cols="50" className="commentBox" value={this.commentText} onChange={this.handleChange}>
                        </textarea>
                    </div>
                <button type="submit" onClick={this.handleCommentSubmit} className="button">Submit!</button>
            <ol className="textStyle">
                {this.state.postInfo.map(function(snapshot){ return(<div><li key={snapshot.commentKey}>{snapshot.text} | posted by: {snapshot.userID}</li><hr></hr></div>)})}
            </ol>
        </div>
        );
    }
}
export default PostComment