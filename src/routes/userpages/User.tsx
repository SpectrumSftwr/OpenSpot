import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import httpService from "../../services/http.service";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { FAQS } from "./components/faq";
import { Reviews } from "./components/reviews";
import { UserTopNavSection } from "./components/TopNavSection";
import { UserContext, useUser } from "./layouts/UserContext";

export const UserPage = () => {

  const {user} = useParams();
  const {userType, refreshUser} = useUser();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const navigateToUserBookings = () : void => {
    navigate(`/${user}/bookings`);
  }

  useEffect(() => {
    refreshUser();
  })

  return (
    <div className="w-full h-full">
      { 
        isLoading
          ? <SkeletonPage /> :
          <div className="flex flex-col min-h-screen h-screen w-full">
            <div className="flex justify-center">
              <UserTopNavSection 
                isHome={true} 
                providerName={userType.businessName} 
                providerType={userType.businessType}
                providerOverallRating={userType.overallRating}
                providerTotalRatings={userType.totalReviews} 
                profilePicUrl={userType.profilePictureUrl}
                bannerUrl={userType.bannerPicUrl} 
              />
            </div>
            <div className="flex flex-col items-center w-full mt-16 md:mt-16 lg:mt-24">
              <div className="w-full flex flex-col items-center">
                <div className="max-w-2xl text-gray-600 font-semibold ml-4 mr-4 pb-2 border-t-gray-100 border-t-2 border-b-gray-100 border-b-2 rounded-lg">
                  <p className="text-xs text-left pl-4 pr-4 md:text-[14px] lg:text-[14px] mt-2">
                    {userType.description}
                  </p>
                </div>
                <div className="p-5 text-center w-screen mt-4">
                  <button 
                    className="w-2/3 md:1/3 lg:1/4 max-w-72 pl-4 pr-4 pt-2 pb-2 rounded-xl font-bold text-white h-16 drop-shadow-lg
                    bg-brand-800 hover:bg-gray-400 hover:text-gray-700 border-b"
                    onClick={() => navigateToUserBookings()}
                  >
                    Request Your Event Today!
                  </button>
                </div>
              </div>
              <Gallery username={user} />
              <FAQS username={user}/>
              <Reviews overallRating={userType.overallRating} totalReviews={userType.totalReviews} reviewBreakdown={userType.reviewsBreakdown}/>
            </div>
          </div>
      }
    </div>
  )
}

const Gallery = ({username} : {username: string}) => {

  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadedCount, setImageLoadedCount] = useState(0);
  const [totalImages,setTotalImages] = useState(0);


  useEffect(() => {
    const fetchUserGallery = async () => {
      try {
        const url = `/userpage/gallery-preview/${username}`
        let {data} = await httpService.get(url);
        if (data && !data['hasError']) {
          const urls = data.map(image => image.presignedUrl)
          setImageUrls(urls)
          setTotalImages(data.length);
        } else {
          setImageUrls([])
          setTotalImages(0);
        }
      } finally {
      }
    }

    fetchUserGallery();
  },[username])

  useEffect(() => {
    if (imageLoadedCount === totalImages) {
      setImagesLoaded(true);
    }

  }, [totalImages,imageLoadedCount])

  const handleImageLoad = () => {
    setImageLoadedCount(prev => prev + 1);
  }

  /**
   * Take user to a larger Gallery view.
   */
  const handleGallery = () => {
    navigate(`/${username}/gallery`);
  }

  return (
    <div className="w-full flex justify-center items-center">
      {!imagesLoaded || !(imageUrls.length > 0) ?
      <div className="grid grid-cols-3 mt-2 text-center align-middle justify-center m-1">
        {Array.from({length: 8}).map((_, index) => {
          return (
            <div key={index} className="w-24 h-24 bg-gray-200 rounded-md m-1">
            </div>
          )
        })}
        <div className="w-24 h-24 bg-gray-200 rounded-md m-1 flex justify-center items-center hover:bg-brand-800h
          hover:stroke-white hover:fill-white">
          <EllipsisHorizontalIcon className="w-12 h-12 fill-white stroke-gray-400 hover:stroke-white hover:fill-white"/>
        </div>
      </div>
      :
      <div className="grid grid-cols-3 mt-2 text-center align-middle justify-center m-2 p-8">
        {imageUrls.map((url, index) => {
          return (
            <div key={index} className="w-24 h-24 bg-gray-200 rounded-md m-1 overflow-hidden"  onClick={handleGallery}>
              <img src={url} onLoad={handleImageLoad} className="rounded-md h-full w-full object-cover object-center" alt="gallery grid item"/>
            </div>
          )
        })}
        <div className="w-24 h-24 bg-slate-300 rounded-md flex justify-center items-center hover:bg-brand-800 m-1" 
          onClick={handleGallery}>
          <EllipsisHorizontalIcon className="w-12 h-12 fill-white stroke-gray-400 hover:stroke-white hover:fill-white"/>
        </div>
      </div>
      }
    </div>
  )
}

const SkeletonPage = () => {
  return (
    <div className="h-screen flex flex-col min-h-screen bg-slate-50">
    </div>
  )
}
