import React from "react";
import { CalendarComponent } from "./components/calendar";
import { UserTopNavSection } from "./components/TopNavSection";

export const UserBookings = () =>  {
  const username = "test";
  return (
    <div>
        <CalendarComponent username={username}/>
      {
        /**
        * Calendar Form
        */
      }
    </div>
  )
}
