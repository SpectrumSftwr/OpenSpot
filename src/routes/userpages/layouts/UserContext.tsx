import { CircularProgress } from "@mui/material";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import httpService from "../../../services/http.service";

/**
 * Everything required for the user context to display on top navs.
 */
interface UserType {
  profilePictureUrl: string,
  bannerPicUrl: string,
  businessName: string, 
  businessType: string,
  description: string,
  overallRating: number,
  totalReviews: number
  reviewsBreakdown: any,
}

interface UserContextType {
  userType: UserType | null;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined >(undefined);

export const UserContextPage = () => {

  const {user : userParam} = useParams();
  const [userType, setUserType] = useState<UserType | null>(null);

  const parseData = (response: any) : UserType => {
    return {
      businessName: response.business_name,
      businessType: response.business_type,
      description: response.description,
      overallRating: response.overallRating,
      reviewsBreakdown: response.reviewsBreakdown,
      totalReviews: response.totalReviews,
      profilePictureUrl: response.profilePicUrl,
      bannerPicUrl: response.bannerPicUrl 
    }
  }

 const fetchUserData = async () => {
    try {
      const {data} = await httpService.get(`/userpage/${userParam}`);
      setUserType(parseData(data));
    } catch (err) {
      console.error("Failed to fetch User: ", err)
      setUserType(null);
    } 
  };

  useEffect(() => {
    fetchUserData()
  },[userParam, fetchUserData])

  if (!userType) {
    return (
      <div className="w-full h-full">
        <CircularProgress />
      </div>
    ) 
  }

  return (
    <UserContext.Provider value={{userType, refreshUser: fetchUserData}} >
      <Outlet/>
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider'); 
  }

  return context;
}
