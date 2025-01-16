import { SessionContext } from "../App";
import Navbar from "../components/navbar";
import { SideNav } from "../components/sidenav";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

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
      <>
        <Navbar />
        <SideNavContext.Provider value={{isOpen, setIsOpen}}>
        <div className="flex flex-row">
            <SideNav />
          <Outlet />
        </div>
        </SideNavContext.Provider>
      </>
    )
  }

  return <Navigate to="/sign-in"/>
}

