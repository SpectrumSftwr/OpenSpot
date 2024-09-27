import { SessionContext } from "../App";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function SignUpFlowLayout(){
  const {session} = useContext(SessionContext);

  if (session) {
    return (
      <div className="w-screen h-screen bg-[#FAFAFA]" >
        <Outlet />
      </div>
    )
  }

  return <Navigate to="/sign-up"/>
}

