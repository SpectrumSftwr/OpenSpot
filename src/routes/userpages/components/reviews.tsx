import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { OverallReviewOverviewDto } from "../dtos/reviewOverview.dto";

export const Reviews = ({username} : {username: string}) => {
  console.log(`TODO: Fetch Users Reviews Overview for ${username}`);

  const overrallReviewScores : OverallReviewOverviewDto = {
    overallRating: 3.8 ,
    totalReviews: 4050 ,
    fiveStarPercentage: 82,
    fourStarPercentage: 8,
    threeStarPercentage: 5,
    twoStarPercentage: 2,
    oneStarPercentage: 3,
  }

  return (
    <div className="flex flex-col items-center w-screen mt-12 text-sm text-gray-700 lg:text-[16px] mb-10">
      <span className="font-semibold text-md lg:text-lg">
        Customer Reviews and Ratings
      </span> 

      {/* Stars */}
      <div className="flex flex-row text-center items-center mt-2">
        <div className="flex flex-row mr-2">
          {Array.from({length: Math.round(overrallReviewScores.overallRating)}).map((_, index) => {
              return (
                <StarIcon key={index} className="fill-[#FFD700] w-4 h-4"/>
              )
          })}
          {Array.from({length: 5 - Math.round(overrallReviewScores.overallRating)}).map((_, index) => {
              return (
                <StarIcon key={index} className="fill-gray-200 w-4 h-4"/>
              )
          })}
        </div>
        <div>
          <span className="text-sm mr-4 text-gray-600">
            {overrallReviewScores.overallRating}/5.0
          </span>
        </div>
      </div>
      {/* Total Ratings */}
      <div className="text-xs text-gray-500">
        {overrallReviewScores.totalReviews} Verified Reviews
      </div>
      {/* 5 Star Reviews */}
      <div className="mr-2 ml-2 w-2/3 max-w-72">
        <RatingRow category={5} percentage={overrallReviewScores.fiveStarPercentage} />
        <RatingRow category={4} percentage={overrallReviewScores.fourStarPercentage} />
        <RatingRow category={3} percentage={overrallReviewScores.threeStarPercentage} />
        <RatingRow category={2} percentage={overrallReviewScores.twoStarPercentage} />
        <RatingRow category={1} percentage={overrallReviewScores.oneStarPercentage} />
      </div>
    </div>
  )
}

const RatingRow = ({category, percentage}:{category: number, percentage: number}) => {
  return (
      <div className="flex items-center justify-between m-1">
        <div className="text-sm flex items-center mr-2">{category} stars</div>
        <div className="bg-[#f1f1f1] rounded-lg grow-[1] h-2 relative mt-2 mb-2 w-2/3">
          <div className="bg-[#ffc107] h-full rounded-lg absolute top-0 left-0 w-full" style={{width: `${percentage}%`}}></div>
        </div>
        <div className="ml-2">
          {percentage}
        </div>
      </div>
  )
}
