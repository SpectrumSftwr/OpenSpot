import React  from "react";
import { useLocation } from "react-router-dom";

/**
 * This page needs to be loaded without any intervention from outside state 
 * do not include any session state at this level. this page should be fully 
 */
const User = () => {

  let location = useLocation();
  let username = location.pathname.split('/').slice(2).join('/');
  //
  // TODO: Eventually switch this so it appears as the users saved version.
  /**
   * Will handle what to do when the left and right arrows are clicked.
   */
  username = username.charAt(0).toUpperCase()  + username.slice(1);

  if (!username) {
    return (
      "Loading..." 
    )
  }


  // Create the calander 
  return (
    <div className=" flex flex-col p-5 items-center w-screen justify-between h-screen">
      <div>
        Select your OpenSpot Date with {username}
      </div>
      <div></div>
    </div>
  )

}

export default User;
