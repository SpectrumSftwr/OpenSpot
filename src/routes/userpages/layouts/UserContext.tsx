import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const UserContext = createContext<any>({})

export const UserContextPage = () => {

  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [bannerPicUrl, setBannerPicUrl] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const createInitialUserContext = () => {
    return {
      profilePictureUrl: [profilePictureUrl, setProfilePictureUrl],
      bannerPicUrl: [bannerPicUrl, setBannerPicUrl],
      businessName: [businessName, setBusinessName],
      businessType: [businessType, setBusinessType],
    }
    
  }

  return (
    <UserContext.Provider value={createInitialUserContext()} >
      <Outlet/>
    </UserContext.Provider>
  )

}
