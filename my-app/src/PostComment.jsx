import React, { Component } from "react";
//import ContentTitle from "./ContentTitle";
import fire from "./config/Fire";



var commentInfo = []
var commentText = "";
var commentIds = []
var ref = null
      //  var commentIds = []
class PostComment extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
        //this.create_UUID = this.create_UUID.bind(this)
        this.state = {
            postInfo : null,
            //commentText : null
        }
        
        // var commentIds = []
        // //var commentInfo = []
        // //do a firebase query for the post
        // let ref = fire.database().ref("/Posts/"+this.props.postid+"/")
        // // this.setState({postInfo : ref})
        // ref.on('value', (snapshot =>{
        //     this.setState({postInfo : snapshot.val()})
        //     commentIds = snapshot.val().comments
        // }));

        // commentIds.map(function(x) {
        //     return fire.database().ref("/Comments/"+x+"/").once('value').then(function(snapshot) {
        //         console.log(snapshot.val().text)
        //         commentInfo.push({id : x, text : snapshot.val().text, user: snapshot.val().userID, upvotes : snapshot.val().upvotes, downvotes : snapshot.val().downvotes})
        //     });   
        // });




    }



    componentDidMount() {
        //var commentIds = []
        //var commentInfo = []
        //do a firebase query for the post
        ref = fire.database().ref("/Posts/"+this.props.postid+"/")
        // this.setState({postInfo : ref})
        ref.on('value', (snapshot =>{
            this.setState({postInfo : snapshot.val()})
            commentIds = snapshot.val().comments
        }));
        console.log(commentIds)
        commentInfo = []
        commentIds.map(function(x) {
            return fire.database().ref("/Comments/"+x+"/").once('value').then(function(snapshot) {
                //console.log(snapshot.val().text)
                commentInfo.push({
                    id : x, 
                    text : snapshot.val().text, 
                    user: snapshot.val().userID, 
                    upvotes : snapshot.val().upvotes, 
                    downvotes : snapshot.val().downvotes
                })
            });   
        });
    }
    
    handleCommentSubmit() {
        //commentsRef.push()
        // fire.database().ref('/Comments/')

        var newData= {
            downvotes : 0,
            upvotes : 0,
            text : commentText,
            postID : this.props.postid,
            userID : this.props.username
            }
            var Uid = Math.random().toString(36).substr(2, 9)
        fire.database().ref('/Comments/_' + Uid).once('value').then(function(snapshot) {
            fire.database().ref('Comments/_' + Uid).set(newData);
            
        });
        fire.database().ref('Posts/'+this.props.postid+'/comments_' + Uid).set({Uid : this.props.postid})
        
    }
        //commentInfo.push({id : this.props.postid, text : commentText, user: this.props.username, upvotes : 0, downvotes : 0})



    
    handleChange(e) {
        commentText = e.target.value
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        
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
                {commentInfo.map((x) => <li key={x.id}>{x.text} | posted by: {x.user} test test {x.id} and {x.upvotes} and {this.props.username}</li>)}
            </ol>
        </div>
        );
    }
}
export default PostComment