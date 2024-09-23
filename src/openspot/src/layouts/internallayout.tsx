import { SessionContext } from "App";
import Navbar from "components/navbar";
import { SideNav } from "components/sidenav";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function InternalLayout(){
  const {session, setSession} = useContext(SessionContext);

  if (session) {
    return (
      <>
        <Navbar />
        <div className="flex flex-row">
          <SideNav />
          <Outlet />
        </div>
      </>
    )
  }

  return <Navigate to="/sign-in"/>
}

