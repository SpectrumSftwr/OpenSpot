import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpService from "../../services/http.service";
import Skeleton from '@mui/material/Skeleton';

export const UserPage = () => {


  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  /** 
   * TODO: Maybe a better way exists but for now this will do.
   */
  const getUrlUser = () : string => {
    return window.location.pathname.split('/')[2]
  }

  /**
   * Fetch the user page data.
   */
  const fetchUserData = async (username: string) => {
    const url = `/sitesettings/buildsite/${username}`

    try {
      await httpService.get(url)
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })

    } catch (err) {
      console.log(err)
    }

    // If User Does not Navigate client to an Oops We dont have this OpenSpot Setup at this time.

    // If it does fetch a single endpoint that will Generate the entire website

  }

  // Get the Users Availability For the Current Month
  const fetchUserAvailability = (username: string, currentMonth: number) => {
    console.log(username)
    console.log(currentMonth)
  }

  useEffect(() => {
    // Show Skeleton
    setIsLoading(() => true);
    // Check If User Exists
    let username = getUrlUser()
    fetchUserData(username)
    fetchUserAvailability(username, new Date().getMonth())
    // Remove Skeleton and show What was fetched.
    setIsLoading(() => false);
  },[])

  return (
    <div className="w-full h-full">
      { 
        isLoading
          ? <SkeletonPage />
          : <LoadedPage />
      }
    </div>
  )
}

const LoadedPage = () => {
  return (
    <div className="w-full flex flex-col justify-between items-center h-[calc(175vh)]">
      {/* Header */}
      <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2 w-2/3 h-fit">
        <div className="h-24 w-24 self-center text-center bg-fuchsia-300 rounded-full">
        </div>
        <div className=" flex flex-col text-sm ml-8">
          <span>
            Dj Based out of Miami Florida with over 1000 happy couples in the books.
          </span>
          <span>
            Ill be your musical ambassador for any of your event needs 
          </span>
          <span>
          </span>
        </div>
      </div> 
      {/* What We Do */}
      <div className="flex flex-col items-center justify-around text-gray-800 font-semibold m-2 w-full">
        <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2 w-2/3 h-fit">
          <div className="mr-2">
            <div>
              EMOJI
            </div>
            <div>
              TITLE
            </div>
          </div>
          <div>
            DESCRIPTION
          </div>
        </div>
        <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2 w-2/3 h-fit">
          <div className="mr-2">
            <div>
              EMOJI
            </div>
            <div>
              TITLE
            </div>
          </div>
          <div>
            DESCRIPTION
          </div>
        </div>
        <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2 w-2/3 h-fit">
          <div className="mr-2">
            <div>
              EMOJI
            </div>
            <div>
              TITLE
            </div>
          </div>
          <div>
            DESCRIPTION
          </div>
        </div>
      </div> 
      {/* Calendar */}
      <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2">
        Book Me Here
      </div> 
      {/* Reviews */}
      <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2">
        Reviews
      </div> 
      {/* FAQS */}
      <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2">
        FAQs
      </div> 
      {/* Links */}
      <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2">
        Links
      </div> 
      {/* Contact Us */}
      <div className="flex flex-row items-center justify-around text-gray-800 font-semibold m-2">
        Contact Us
      </div> 
    </div>
  )
}

const SkeletonPage = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center w-screen">
        {/*Top of Page with User Profile and Description.*/}
        <div className="flex flex-row justify-center w-full p-2 items-center">
          <Skeleton variant="circular" width={128} height={128} className="h-24 w-24" />
          <div className=" ml-12">
            <span className="m-8">  
              <Skeleton variant="text" width={500} height={24} />
            </span>
            <span className="m-8">  
              <Skeleton variant="text" width={500} height={24} />
            </span>
            <span className="m-8">  
              <Skeleton variant="text" width={500} height={24} />
            </span>
            <span className="m-8">  
              <Skeleton variant="text" width={500} height={24} />
            </span>
          </div>
        </div>
        <div className="mt-24">
          <Skeleton variant="rounded" width={800} height={500} className="" />
        </div>
      </div>
    </div>
  )
}
