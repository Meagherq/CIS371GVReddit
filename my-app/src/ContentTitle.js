import React, { Component } from "react";
import fire from "./config/Fire";

function ContentTitle(props) {
    console.log(props);
    super(props)
    var currentUser = fire.auth().currentUser;
    return (    
        <React.Fragment>
            {/* <UpvoteForPost /> */}
            {/* <img src={props.PageContent.imgUrl}></img> */}
            <h3>{props.PageContent.postTitle}</h3>
            <p>Submitted by {props.PageContent.userID} on {props.postDate}</p>
        </React.Fragment>
    );
}

export default ContentTitle