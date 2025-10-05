import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

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
        <UserTopNavHomePageV2
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
const UserTopNavHomePageV2 = ({providerName, providerType, providerOverallRating, providerTotalRatings, profilePicUrl, bannerUrl}: {
    providerName: string, 
    providerType: string, 
    providerOverallRating: number | null, 
    providerTotalRatings : number | null 
    profilePicUrl: string | null,
    bannerUrl: string | null,
}) => {

  const renderStars = () => {
    const stars = [];
    for (let i= 1; i <= 5; i++) {
      stars.push(
        <StarIcon key={i} className={`${Math.round(providerOverallRating) >= i ? "fill-[#FFD700]" : "fill-gray-200"} w-2 h-2`}/>
      )
    }
    return stars;
  }

  return(
    <div className="relative max-w-[1080px] h-64 w-full md:h-80 md:w-1/2">
      {/* Banner Image with overlay */}
      <img
        src={bannerUrl}
        alt="Banner"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Name, Type, and Rating */}
      <div className="absolute bottom-14 md:bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white">
        <h1 className="text-lg md:text-4xl font-bold">{providerName}</h1>
        <p className="text-xs md:text-lg">{providerType}</p>
        {
          providerTotalRatings > 0 && 
          <>
          <div className="mt-2 flex justify-center">{renderStars()}</div>
          <div>
            <span className="text-xs">
              {providerOverallRating.toPrecision(2)}/5.0
            </span>
            <span className="text-xs ml-2">
              {providerTotalRatings} verified reviews
            </span>
          </div>
          </>

        }
      </div>

      {/* Profile Picture */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <img
          src={profilePicUrl}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg"
        />
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
    <div className="relative max-w-[1080px] h-64 w-full md:h-80 md:w-1/2">
      {/* Banner Image with overlay */}
      <img
        src={bannerUrl}
        alt="Banner"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Name, Type, and Rating */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center text-white">
        <h1 className="text-lg md:text-4xl font-bold text-nowrap">{providerName}</h1>
        <p className="text-xs md:text-lg">{providerType}</p>
      </div>

      {/* Profile Picture */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src={profilePicUrl}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg"
        />
      </div>
    </div>
  )
}
