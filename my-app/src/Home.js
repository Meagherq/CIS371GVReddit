import React, { Component } from "react";
//import ContentTitle from "./ContentTitle";
import fire from "./config/Fire";
import Post from "./post.jsx";
import PostList from "./postList.jsx";
import ReactDOM from "react-dom"
import NavBar from "./NavBar.jsx"
import Login from "./Login";


var postList = []
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username : fire.auth().currentUser.email.substring(0, fire.auth().currentUser.email.indexOf('@'))
    }
    this.logout = this.logout.bind(this);
    var tempUser = fire.auth().currentUser;
    var database = fire.database();
    var userRef = database.ref();
    fire.database().ref('/Users/' + tempUser.uid).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            userRef = snapshot.val();
            //alert(snapshot.val().email);
            console.log(userRef.email);
        } else {
            //push all the user properties
            //fire.database().ref('Users/' + tempUser.uid);
            //writeUser(currentUser);
            fire.database().ref('Users/' + tempUser.uid).set({
                email: tempUser.email,
                username: fire.auth().currentUser.email.substring(0, fire.auth().currentUser.email.indexOf('@')),
                totalUpvotes: 0,
                totalDownvotes: 0,
            }).then( () => {
                userRef = fire.database().ref('Users/' + tempUser.uid);
                //alert(userRef.email);
            });
        }
    });
    
}
//     if (snapshot.exists()) {
//         var mainRef = snapshot.val();
//         alert(snapshot.val().email);
//         console.log(mainRef.email);
//     } else {
//         //push all the user properties
//         fire.database().ref('Users/' + tempUser.uid);
//         //writeUser(currentUser);
//         fire.database().ref('Users/' + tempUser.uid).set({
//             email: tempUser.email,
//             username: tempUser.email.substring(0, tempUser.email.indexOf('@')),
//             totalUpvotes: 0,
//             totalDownvotes: 0,
//         });
//     }
//     });
//     writeUser(x) {
//     fire.database().ref('Users/' + this.currentUser.uid).set({
//         email: x.email,
//         username: x.email.substring(0, x.email.indexOf('@')),
//     });
//   }

    componentDidMount() {
        // var postRef = fire.database().ref("Posts/").child().orderByChild("upvotes").limitToLast(10);
        // postRef.on("value", function(snapshot) {
        //     snapshot.forEach(function(postSnapshot) {
        //         postList.push({postID : postSnapshot.val().postid, userID : postSnapshot.val().userID})
        //         console.log(postSnapshot.val().postid)
        //         console.log(postSnapshot.val().postid)
        //     });
        // });

        
        // var tref = fire.database().ref("/Posts/").child().on('value', (postSnapshot =>{
        //     return tref.ref().orderByChild("age").limitToLast(3);
        //     postList.push({postID : postSnapshot.val().postid, userID : postSnapshot.val().userID})
        // }));
        // this.setState({postInfo : ref})
        
    }

  logout() {
    fire.auth().signOut();
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
  }

    // var ref = fire.database().ref("Posts/");
    // ref.orderByChild("upvotes").limitToFirst(10).on("value", function(snapshot) {
    //   // This will be called exactly two times (unless there are less than two
    //   // dinosaurs in the Database).
    //     snapshot.forEach(function(postSnapshot) {
    //     postList.push({postID : snapshot.val().postid, userID : snapshot.val().userID})
    //     });
      // It will also get fired again if one of the first two dinosaurs is
      // removed from the data set, as a new dinosaur will now be the second
      // shortest.


  

//   ref.child("stegosaurus").child("height").on("value", function(stegosaurusHeightSnapshot) {
//     var favoriteDinoHeight = stegosaurusHeightSnapshot.val();
//     var queryRef = ref.orderByChild("height").endAt(favoriteDinoHeight).limitToLast(2)
//     queryRef.on("value", function(querySnapshot) {
//         if (querySnapshot.numChildren() == 2) {
//           // Data is ordered by increasing height, so we want the first entry
//           querySnapshot.forEach(function(dinoSnapshot) {
//             console.log("The dinosaur just shorter than the stegasaurus is " + dinoSnapshot.key());
//             // Returning true means that we will only loop through the forEach() one time
//             return true;
//           });
//         } else {
//           console.log("The stegosaurus is the shortest dino");
//         }
//     });
//   });





//   getImgUrlFromFirebase() {
//       imgUrl = postRef.imgUrl;
//       return imgUrl
//   }

  render() {
    return (
        //Dont modify app modify base elementbyid
        <div>
        <div className="NavBar">
            <NavBar />
        </div>
      <div id="base">
        <p id="title">CIS 371 GVReddit</p>
        <br />
        <p id="authors">By: Quinn Meagher, Nolan Gustafson, and Jake Young</p>
        <br />
        <h1>Welcome to Home</h1>
        <div className ="ContentTitle">
          <PostList username={this.state.username}/>
          {/* <Post postid="template(ID)" username={this.state.username}/>
          <Post postid="template(ID)" username={this.state.username}/> */}
        </div>
        <button onClick={this.logout}>Logout</button>
      </div>
      </div>
    );
  }
}
export default Home;
