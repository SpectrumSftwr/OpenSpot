import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpService from "../../services/http.service";

export const UserPage = () => {


  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 

  const getUrlUser = () : string => {
    return "";
  }

  /**
   * Fetch the user page data.
   */
  const fetchUserData = async () => {

    const urlUser = getUrlUser();
    const url = `/user/data/${urlUser}`

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

  useEffect(() => {
    // Show Skeleton
    setIsLoading(() => true);
    // Check If User Exists
    fetchUserData()
    // Remove Skeleton and show What was fetched.
    setIsLoading(() => false);
  },[])

  return (
    <div>
      <div className="h-[200vh] flex flex-col justify-between items-center w-screen">
        {/*Top of Page with User Profile and Description.*/}
        <div className="flex flex-row justify-around w-full">
          <div>
            PROFILE
          </div>
          <div>
            Description
          </div>
        </div>
        {/*Insights.*/}
        <div className="flex flex-row justify-around">
          Insights
        </div>
        {/*Calendar*/}
        <div className="flex flex-row justify-around">
          Calendar
        </div>
        {/*Reviews*/}
        <div>
          Reviews 
        </div>
        {/*FAQ*/}
        <div>
          FAQ
        </div>
        {/*Contact Us*/}
        <div>
          Contact Us
        </div>
      </div>
    </div>
  )
}
