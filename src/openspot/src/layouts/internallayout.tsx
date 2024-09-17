import { SessionContext } from "App";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function InternalLayout(){
  const {session, setSession} = useContext(SessionContext);

  if (session) {
    return <Outlet />
  }

  return <Navigate to="/sign-in"/>
}

