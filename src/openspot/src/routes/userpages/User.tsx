import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import httpService from "../../services/http.service";
import Skeleton from '@mui/material/Skeleton';
import { colorsDto } from "./colorsDto.dto";
import { StarIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export const UserPage = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const [siteColors, setSiteColors] = useState<colorsDto | null>(null);

  const [profileUrl, setProfileUrl] = useState<string>("");
  const [profileDescription, setProfileDescription]  = useState<string>("");

  // TODO: Set better type
  const [offeringsMap, setOfferingsMap] = useState<any>();

  // TODO: Set better type
  const [linksMap, setLinksMap] = useState<any>();



  /**  
   * TODO: Maybe a better way exists but for now this will do.
   */
  const getUrlUser = () : string => {
    return window.location.pathname.split('/')[2]
  }

  /**
   * Sets the colors for the user that was requested on the page.
   */
  const setColors = (data: any) => {
    if (data == null) {
      return;
    }

    setSiteColors(data.colors);
  }

  /**
   * Sets the personal details for the user that was requested on the page.
   */
  const setPersonalDetails = (data: any) => {
    if (data == null) {
      return;
    }
  }

  /**
   * Sets the offerings for the user that was requested on the page.
   */
  const setOfferings = (data: any) => {
    if (data == null) {
      return;
    }
  }

  /**
   * Sets the links for the user that was requested on the page.
   */
  const setLinks = (data: any) => {
    if (data == null) {
      return;
    }
  }

  /**
   * Fetch the user page data.
   */
  const fetchUserData = async (username: string) => {
    let data = null;
    const url = `/site/${username}`
    try {
      let response = await httpService.get(url)
      data = response.data;
    } catch (err) {
      navigate('/')
    }

    setColors(data);
    setPersonalDetails(data);
    setLinks(data);
    setOfferings(data);
    // If User Does not Navigate client to an Oops We dont have this OpenSpot Setup at this time.

    // If it does fetch a single endpoint that will Generate the entire website
  }

  // Get the Users Availability For the Current Month
  const fetchUserAvailability = (username: string, currentMonth: number) => {
    console.log(`fetching ${username} Availability for ${currentMonth}`)
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
    return;
  },[])

  return (
    <div className="w-full h-full">
      { 
        isLoading
          ? <SkeletonPage />
          : <LoadedPage colors={siteColors}/>
      }
    </div>
  )
}

const LoadedPage = ({colors}:{colors: colorsDto}) => {
  if (colors == null) {
    return (
      <div>
        TODO Error
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col min-h-screen bg-slate-50">
      <div className="h-1/6 text-center relative">
        <div className="relative p-2 bg-sky-300 text-white h-2/3">
          <button>
            <div className="absolute p-1 fill-white bg-sky-800 rounded-full top-4 right-4">
              <ArrowUpOnSquareIcon className="stroke-white w-4 h-4"/>
            </div>
          </button>
        </div>
        <div className="text-left font-light text-gray-500">
          <div className="w-24 h-24 bg-gray-400 rounded-full absolute top-[40%] left-[4%] md:left-[8%] lg:left-[16%]"></div>
          <div className="absolute left-[32%] text-xs">
            <h1 className="font-bold text-sm text-gray-600 mt-1">Spectrum Entertainment</h1>
            <p>DJ & MC Service</p>
            <div className="flex flex-row text-center items-center">
              {/* TODO: Create Mapping for Reviews to amount */}
              <div className="flex flex-row mr-2">
                <StarIcon className="fill-[#FFD700] w-2 h-2"/>
                <StarIcon className="fill-[#FFD700] w-2 h-2"/>
                <StarIcon className="fill-[#FFD700] w-2 h-2"/>
                <StarIcon className="fill-[#FFD700] w-2 h-2"/>
                <StarIcon className="fill-gray-200 w-2 h-2"/>
              </div>
              <div>
                <span className="text-xs">
                  324 verified reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-3/4">
        <div className="text-gray-700 font-medium ml-4 mr-4 mt-8">
          <p className="text-[12px] text-left">
            Bringing energy, style, and professionalism to every event, 
            we create unforgettable memories tailored to your unique needs.
          </p>
        </div>
        <div className="grid grid-cols-3 mt-4 text-center align-middle justify-center">
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
          <div className="w-24 h-24 bg-gray-200 rounded-md m-1"></div>
        </div>
        <div className="mt-4 h-1/4 border-t border-gray-200 border-1 w-full">
        </div>
        <div className="mt-4 h-1/4">
          Reviews
        </div>
      </div>
      <div className="p-5 text-center bottom-0">
        <button className="pl-4 pr-4 sticky pt-2 pb-2 rounded-xl font-bold text-white bg-gray-700">Book Now!</button>
      </div>
    </div>
  )
}

const SkeletonPage = () => {
  return (
    <div>
      TODO Skelton
    </div>
  )
}
