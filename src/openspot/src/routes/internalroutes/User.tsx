import React  from "react";
import { useLocation } from "react-router-dom";
import Calendar from "components/calendar";

/**
 * This page needs to be loaded without any intervention from outside state 
 * do not include any session state at this level. this page should be fully 
 */
const User = () => {

  let location = useLocation();
  let username = location.pathname.split('/').slice(2).join('/');
  // TODO: Eventually switch this so it appears as the users saved version.
  username = username.charAt(0).toUpperCase()  + username.slice(1);

  if (!username) {
    return (
      "Loading..." 
    )
  }

  /**
   * Will handle what to do when the left and right arrows are clicked.
   */
  const handleIconClicks = (direction: string) => {
    direction === "prev" 
      ? setMonth((month) => month - 1)
      : setMonth((month) => month + 1)
  }

  // Create the calander 
  return (
    <div className=" flex flex-col p-5 items-center w-screen justify-between h-screen">
      <div>
        Select your OpenSpot Date with {username}
      </div>
      <div>
        <Calendar />
      </div>
      <div></div>
    </div>
  )

}

export default User;
