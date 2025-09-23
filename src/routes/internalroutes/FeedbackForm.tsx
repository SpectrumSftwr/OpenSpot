import { CircularProgress } from "@mui/material";
import React from "react";

export const FeedbackForm = () => {
  return (
    <div className="flex flex-row justify-center w-full h-[70%] items-center">
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLSdd4is40hvsr4TiuXxe0Yr6yd8eqfMb8D5PRcKDJN-BatPs8g/viewform?embedded=true" 
        width="640" 
        height="848" 
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
      >
        <CircularProgress size={40}/>
      </iframe> 
    </div>
  )
}
