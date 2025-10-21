import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../../services/http.service";
import { UserContext, useUser } from "../layouts/UserContext";
import { UserTopNavSection } from "./TopNavSection";

export const CreateReview = () => {
  const {user} = useParams();
  const {userType} = useUser();
  const navigate = useNavigate();

  const handleSubmission = async (formData) => {
    formData['business_UID'] = user;
    console.log(typeof formData.eventDate);
    try {
      const results = await httpService.post('/events/create/review', formData);
      console.log(results)
      if (!results) {
        throw new Error("Unable to submit review for event.")
      }

      navigate(`/${user}`)
    } catch (err) {
        toast.error("Something went wrong could not submit review for event. Try again at a later time.")
    }
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100 h-full w-full">
        <div className="flex justify-center">
          <UserTopNavSection 
            isHome={true} 
            providerName={userType.businessName} 
            providerType={userType.businessType}
            providerOverallRating={null}
            providerTotalRatings={null} 
            profilePicUrl={userType.profilePictureUrl}
            bannerUrl={userType.bannerPicUrl} 
          />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-6 mt-16 md:mt-24">
          <ReviewForm onSubmit={handleSubmission}/>
        </div>
      </div>
    </div>
  )
}

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventDate || rating === 0 || !comment.trim() || !name.trim()) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    const newReview = {
      from: name,
      eventDate,
      rating,
      comment: comment.trim(),
    };

    onSubmit?.(newReview); // Pass data to parent

    setEventDate("");
    setRating(0);
    setComment("");
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg bg-white shadow-md rounded-2xl p-6 space-y-4 w-[90%]"
    >
      <h2 className="text-xl font-semibold text-gray-800">Leave a Review</h2>

      {/* Name */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* Event Date */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Event Date
        </label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Rating */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className="text-2xl focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
            >
              <span
                className={`${
star <= (hover || rating)
? "text-yellow-400"
: "text-gray-300"
}`}
              >
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Share your experience..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;

