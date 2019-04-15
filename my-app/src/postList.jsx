import React, { Component } from 'react';
import fire from "./config/Fire";
import Post from'./post.css';


// feed me a prop called postnumber which will be the number of posts to show
//^ not implemented yet
class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postkeys : []
        }
    }

    componentDidMount() {
        //do a firebase query for the posts
        let ref = fire.database().ref("/Posts/")
        ref.once('value', function(snapshot) {
            let keyarray = []
            snapshot.forEach(function(childSnapshot) {
                keyarray.push(childSnapshot.key)
            });
            this.setState({postkeys : keyarray})
        });
    }

    componentDidUpdate(prevProps) {
        //not sure if we need this, since we probably only want to update when the user requests an update, but maybe not
    }
    
    render() {
        if (this.state.postkeys !== null) {
            return <div className="postList">
                    {this.state.postkeys.map(k => <Post postid={k} key={k}/>)}
                </div>;
        } else {
            return <div>
                    <p>...No Posts to show...</p>
                </div>;
        }
    }
}

export default PostList;
