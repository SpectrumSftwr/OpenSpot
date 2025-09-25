import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export const UserTopNavSection = (
  {
    isHome, 
    providerName, 
    providerType, 
    providerOverallRating, 
    providerTotalRatings, 
    profilePicUrl,
    bannerUrl,
  }
  :{
    isHome: boolean, 
    providerName: string, 
    providerType: string, 
    providerOverallRating: number | null, 
    providerTotalRatings : number | null,
    profilePicUrl: string | null,
    bannerUrl: string | null,
  }) => {
  
  return (
    <>
      {isHome ?
        <UserTopNavHomePage 
          providerName={providerName} 
          providerType={providerType} 
          providerTotalRatings={providerTotalRatings}
          providerOverallRating={providerOverallRating}
          profilePicUrl={profilePicUrl}
          bannerUrl={bannerUrl}
        />
        : <UserTopNavBookingPages 
            providerName={providerName} 
            providerType={providerType} 
            profilePicUrl={profilePicUrl}
            bannerUrl={bannerUrl}
        />
      }
    </>
  )
}

const UserTopNavHomePage = ({providerName, providerType, providerOverallRating, providerTotalRatings, profilePicUrl, bannerUrl }:{ 
    providerName: string, 
    providerType: string, 
    providerOverallRating: number | null, 
    providerTotalRatings : number | null 
    profilePicUrl: string | null,
    bannerUrl: string | null,
}) => {
  return(
    <div className="flex flex-row justify-center">
      <div className="relative text-center h-[320px] w-full max-w-[1080px]">
        <div className="text-white w-full h-2/3 flex justify-center items-center overflow-hidden max-w-[1080px] bg-slate-500">
          {bannerUrl 
            ? <img src={bannerUrl} alt="banner" className="object-fit"/> 
            : <span className="object-fit w-full h-full"></span>
          }
          <button>
            <div className="absolute p-1 fill-white bg-sky-800 rounded-full top-4 right-4 hover:bg-gray-200">
                <ArrowUpOnSquareIcon className="stroke-white w-4 h-4 hover:stroke-black pb-0.5"/>
            </div>
          </button>
        </div>
        <div className="text-left font-light text-gray-500">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex justify-center p-1 
            absolute drop-shadow-lg items-center top-[160px] left-[2%]" id="top-[40%] left-[8%] md:left-[12%] lg:left-[21%]">
            <span>
              {
                profilePicUrl ? 
                  <img src={profilePicUrl} alt="profile" className="rounded-full w-24 h-24 object-fit"/>
                  : <UserIcon className="w-16 h-16 stroke-slate-500 mt-2 stroke-1"/>
              }
            </span>
          </div>
          <div className="absolute left-[30%] md:left-[38%] lg:left-[20%]">
            <h1 className="font-bold text-gray-600 mt-1 h-fit">{providerName}</h1>
            <p className="text-sm">{providerType}</p>
            { (providerOverallRating && providerTotalRatings) && 
              <div className="flex flex-row text-center items-center text-sm italic">
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
                  <span className="text-xs ml-2">
                    {providerTotalRatings} verified reviews
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const UserTopNavBookingPages = ({providerName, providerType, profilePicUrl, bannerUrl}:{
  providerName: string, 
  providerType: string, 
  profilePicUrl: string | null,
  bannerUrl: string | null,
}) => {

  return(
    <div className="text-center relative left-0 top-0 h-1/6">
      <div className="relative bg-brand-800 text-white h-full overflow-hidden flex items-center justify-center">
        {bannerUrl && <img src={bannerUrl} alt="banner" className="object-cover w-full h-full opacity-20" />}
      </div>
      <div className="text-left font-light text-gray-100">
        <div className="w-20 h-20 bg-slate-200 rounded-full absolute top-[20%] left-[15%] md:left-[16%] lg:left-[32%] drop-shadow-md
          flex justify-center items-center">
          <span className="relative">
            {
              profilePicUrl ? 
                <img src={profilePicUrl} className="rounded-full w-20 h-" alt="profile"/>
                : <UserIcon className="w-16 h-16 fill-slate-300 stroke-1 rounded-full"/>
            }
          </span>
        </div>
        <div className="absolute left-[36%] lg:left-[44%] top-[20%] text-sm text-white z-50 pb-2 pt-2 pr-4 pl-2 rounded-lg">
          <h1 className="opacity-100 font-bold text-lg mt-1 drop-shadow-sm text-white ml-2">{providerName}</h1>
          <p className="opacity-100 italic font-medium text-xs ml-2">{providerType}</p>
        </div>
      </div>
    </div>
  )
}
