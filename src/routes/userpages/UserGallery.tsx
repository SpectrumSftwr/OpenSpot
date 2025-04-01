import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../services/http.service";
import { UserTopNavSection } from "./components/TopNavSection";
import { UserContext } from "./layouts/UserContext";

export const UserGallery = () => {
  const {user} = useParams();
  const profileContext = useContext(UserContext);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadedCount, setImageLoadedCount] = useState(0);
  const [totalImages,setTotalImages] = useState(0);

  useEffect(() => {
    const fetchUserGallery = async () => {
      try {
        const url = `/userpage/gallery/${user}`
        const {data} = await httpService.get(url);
        const urls = data.map(image => image.imageUrl)
        setImageUrls(urls)
        setTotalImages(data.length);
      }finally {

      }
    }

    fetchUserGallery();
  },[])

  useEffect(() => {
    if (imageLoadedCount == totalImages) {
      setImagesLoaded(true);
    }

  }, [totalImages,imageLoadedCount])

  const handleImageLoad = () => {
    setImageLoadedCount(prev => prev + 1);
  }

  const handleGallery = (index: number) => {
    console.log("Image Click" + index);
  }
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 h-full w-full">
      <UserTopNavSection 
        isHome={true} 
        providerName={profileContext.businessName} 
        providerType={profileContext.businessType}
        providerOverallRating={null}
        providerTotalRatings={null} 
        profilePicUrl={profileContext.profilePictureUrl[0]}
        bannerUrl={profileContext.bannerPicUrl[0]} 
      />
      <div className="flex flex-col items-center w-full h-full">
      {!imagesLoaded ?
          <div className="grid grid-cols-3 mt-4 text-center align-middle justify-center">
            {Array.from({length: 8}).map((_, index) => {
              return (
                <div key={index} className="w-24 h-36 bg-gray-200 rounded-md m-1">
                </div>
              )
            })}
          </div>
        :
          <div className="grid grid-cols-3 mt-4 text-center align-middle justify-center">
            {imageUrls.map((url, index) => {
              return (
                <div key={index} className="w-24 h-36 md:w-36 md:h-44 lg:w-36 lg:h-44 bg-gray-200 rounded-md m-1 
                  overflow-hidden flex justify-center items-center"  
                  onClick={() =>handleGallery(index)}>
                  <img src={url} onLoad={() => handleImageLoad} className="rounded-md object-cover h-full"/>
                </div>
              )
            })}
        </div>
        }
      </div>
      <div className="w-full flex flex-col justify-center mt-8 items-end pr-4 pb-4">
          <button
            type="button"
            className="px-4 py-2 bg-brand-800 text-white rounded-md hover:bg-gray-400 ml-8 mb-4"
            onClick={() => navigate(-1)}
          >
          Back
        </button>
      </div>
    </div>
  )
}
