import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import httpService from "../../services/http.service";
import { StarIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { FAQS } from "./components/faq";
import { Reviews } from "./components/reviews";
import { UserTopNavSection } from "./components/TopNavSection";
import { getUrlUser } from "./utility/common";

export const UserPage = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false); 


  const Navigate = useNavigate();

  const navigateToUserBookings = () : void => {
    Navigate(`/myspot/${getUrlUser()}/bookings`);
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
  }

  useEffect( () => {
    // Check If User Exists
    let username = getUrlUser()
    fetchUserData(username)
    return;
  },[])


  return (
    <div className="w-full h-full">
      { 
        isLoading
          ? <SkeletonPage /> :
          <div className="flex flex-col min-h-screen bg-slate-50 h-full">
            <UserTopNavSection 
              isHome={true} 
              providerName={"Spectrum Entertainment"} 
              providerType={"DJ & MC Services"}
              providerOverallRating={4.5}
              providerTotalRatings={250} 
            />
            <div className="flex flex-col items-center">
              <div className="max-w-92 text-gray-600 font-medium ml-4 mr-4">
                <p className="text-[12px] text-left pl-4 pr-4 md:text-[14px] lg:text-[14px]">
                  Bringing energy, style, and professionalism to every event, 
                  we create unforgettable memories tailored to your unique needs.
                </p>
              </div>
              <div className="p-5 text-center w-screen mt-2">
                <button 
                  className="w-2/3 md:1/3 lg:1/4 max-w-72 pl-4 pr-4 pt-2 pb-2 rounded-xl font-bold text-white h-16 drop-shadow-md
                  bg-gray-700 hover:bg-gray-400 hover:text-gray-700"
                  onClick={() => navigateToUserBookings()}
                >
                  Request Your Event Today!
                </button>
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
              <FAQS username={"Apples"}/>
              <Reviews username={"Apples"} />
            </div>
          </div>
      }
    </div>
  )
}

const SkeletonPage = () => {
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
        <div className="text-left font-light text-gray-700">
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
                  4.0/5.0
                </span>
                <span className="text-xs">
                  324 verified reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-3/4">
        <div className="xs:w-2/3 sm:w-2/3 md:w-1/3 lg:w-1/3 text-gray-900 font-medium ml-4 mr-4 mt-6">
          <p className="text-[10px] text-left pl-4 pr-4">
            Bringing energy, style, and professionalism to every event, 
            we create unforgettable memories tailored to your unique needs.
          </p>
        </div>
        <div className="grid grid-cols-3 mt-8 text-center align-middle justify-center">
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
      </div>
      <div className="p-5 text-center bottom-0 relative">
        <button className="pl-4 pr-4 sticky pt-2 pb-2 rounded-xl font-bold text-white bg-gray-700">Book Now!</button>
      </div>
    </div>
  )
}
