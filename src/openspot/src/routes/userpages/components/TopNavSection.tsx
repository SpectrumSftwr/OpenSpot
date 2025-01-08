import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

export const UserTopNavSection = (
  {isHome, providerName, providerType, providerOverallRating, providerTotalRatings }
  :{isHome: boolean, 
    providerName: string, 
    providerType: string, 
    providerOverallRating: number | null, 
    providerTotalRatings : number | null }) => {

  return (
    <>
      {isHome ?
        <UserTopNavHomePage 
          providerName={providerName} 
          providerType={providerType} 
          providerTotalRatings={providerTotalRatings}
          providerOverallRating={providerOverallRating}
        />
        : <UserTopNavBookingPages 
            providerName={providerName} 
            providerType={providerType} 
        />
      }
    </>
  )
}

const UserTopNavHomePage = ({providerName, providerType, providerOverallRating, providerTotalRatings }:{ 
    providerName: string, 
    providerType: string, 
    providerOverallRating: number | null, 
    providerTotalRatings : number | null }) => {

  return(
    <div className="text-center relative h-52">
      <div className="relative p-2 bg-sky-300 text-white h-2/3">
        {/**
          <button>
            <div className="absolute p-1 fill-white bg-sky-800 rounded-full top-4 right-4 hover:bg-gray-200">
              <ArrowUpOnSquareIcon className="stroke-white w-4 h-4 hover:stroke-black"/>
            </div>
          </button>
          */}
      </div>
      <div className="text-left font-light text-gray-500">
        <div className="w-24 h-24 bg-gray-400 rounded-full absolute top-[40%] left-[4%] md:left-[8%] lg:left-[16%] drop-shadow-md"></div>
        <div className="absolute left-[32%] text-xs">
          <h1 className="font-bold text-sm text-gray-600 mt-1">{providerName}</h1>
          <p>{providerType}</p>
          <div className="flex flex-row text-center items-center">

            {/* TODO: Create Mapping for Reviews Score. */}
            <div className="flex flex-row mr-2">
              {Array.from({length: Math.round(providerOverallRating)}).map((_, index) => {
                return (
                  <StarIcon key={index} className="fill-[#FFD700] w-2 h-2"/>
                )
              })}
              {Array.from({length: 5 - Math.round(providerOverallRating)}).map((_, index) => {
                return (
                  <StarIcon key={index} className="fill-gray-200 w-2 h-2"/>
                )
              })}
            </div>
            <div>
              <span className="text-xs">
                {providerOverallRating.toPrecision(2)}/5.0
              </span>
              <span className="text-xs">
                {providerTotalRatings} verified reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserTopNavBookingPages = ({providerName, providerType }:{
  providerName: string, 
  providerType: string, 
}) => {

  return(
    <div className="text-center relative h-52">
      <div className="relative p-2 bg-sky-300 text-white h-2/3">
        {/**
          <button>
            <div className="absolute p-1 fill-white bg-sky-800 rounded-full top-4 right-4 hover:bg-gray-200">
              <ArrowUpOnSquareIcon className="stroke-white w-4 h-4 hover:stroke-black"/>
            </div>
          </button>
          */}
      </div>
      <div className="text-left font-light text-gray-100">
        <div className="w-24 h-24 bg-white rounded-full absolute top-[8%] left-[8%] md:left-[16%] lg:left-[32%] drop-shadow-md"></div>
        <div className="absolute left-[36%] lg:left-[44%] top-[20%] text-sm text-white">
          <h1 className="font-bold text-lg mt-1 drop-shadow-sm text-white">{providerName}</h1>
          <p className="italic font-medium text-xs">{providerType}</p>
        </div>
      </div>
    </div>
  )
}
