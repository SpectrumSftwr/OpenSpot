import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../services/http.service";
import { UserTopNavSection } from "./components/TopNavSection";
import { ReviewDto } from "./dtos/review.dto";
import { UserContext } from "./layouts/UserContext";
import { StarIcon } from "@heroicons/react/24/solid";

export const UserReviews = () => {

  const {user} = useParams();
  const profileContext = useContext(UserContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewDto[] | null>(null)

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const url = `/userpage/reviews/${user}`
        const {data} = await httpService.get(url);
        if (data && !data['hasError']) {
          setReviews(data)
        } else {
          setReviews([])
        }
      } catch {
      }
    }

    fetchUserReviews();
  },[user])


  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100 h-full w-full">
        <UserTopNavSection 
          isHome={true} 
          providerName={profileContext.businessName} 
          providerType={profileContext.businessType}
          providerOverallRating={null}
          providerTotalRatings={null} 
          profilePicUrl={profileContext.profilePictureUrl[0]}
          bannerUrl={profileContext.bannerPicUrl[0]} 
        />
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
          { reviews &&
            reviews.map((review, index) => {
              return (
                <ReviewCard review={review} index={index}/>
              )
            })
          }
        </div>
        <div className="w-full flex justify-center mt-8 items-end pr-4 pb-4 bg-gray-100">
          <button
            type="button"
            className="px-4 py-2 bg-brand-800 text-white rounded-md hover:bg-gray-400 ml-8 mb-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

const ReviewCard = ({ review, index }: {
  review: ReviewDto,
  index: number
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl pt-4 pl-6 pb-4 pr-6 border border-gray-200 w-[95%] m-2" key={index}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{review.from}</h2>
        <span className="text-gray-500 text-sm">{new Date(review.event_date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center mb-4 justify-between border-b-gray-200 border-b-2 pb-2">
        <span className="flex items-center">
          {Array.from({length: Math.round(review.rating)}).map((_, index) => {
            return (
              <StarIcon key={index} className="fill-[#FFD700] w-4 h-4"/>
            )
          })}
          {Array.from({length: 5 - Math.round(review.rating)}).map((_, index) => {
            return (
              <StarIcon key={index} className="fill-gray-200 w-4 h-4"/>
            )
          })}
        </span>
        <span className="self-end text-sm italic text-gray-700 font-normal">
          {review.rating} Stars
        </span>
      </div>
      <p className="text-gray-700 text-sm italic">"{review.comment}"</p>
    </div>
  );
};
