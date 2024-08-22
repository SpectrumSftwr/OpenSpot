import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";


export default function InternalLayout(){
  const {userId, isLoaded} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/')
    }
  }, [isLoaded]);
 
  if (!isLoaded) {
    return 'Loading....'
  }

  return <Outlet />
}

