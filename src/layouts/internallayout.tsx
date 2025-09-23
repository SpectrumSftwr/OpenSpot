import { SessionContext } from "../App";
import Navbar from "../components/navbar";
import { SideNav } from "../components/sidenav";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

interface TSideNavContext {
  isOpen: boolean|null;
  setIsOpen: Dispatch<SetStateAction<boolean|null>>;
}

export const SideNavContext = createContext<TSideNavContext|undefined>(undefined);

export default function InternalLayout(){
  const [isOpen, setIsOpen] = useState<boolean|null>(true)
  const {session} = useContext(SessionContext);

  if (session) {
    return (
        <div className="h-full w-full">
          <Navbar />
          <Toaster/>
          <SideNavContext.Provider value={{isOpen, setIsOpen}}>
            <div className="flex flex-row h-full">
              <SideNav />
              <Outlet />
            </div>
          </SideNavContext.Provider>
        </div>
    )
  }

  return <Navigate to="/sign-in"/>
}

