import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./layouts/bookingslayout";

export const ReviewBooking = () => {
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);

  const eventDate = bookingContext.eventDate[0];
  const location = bookingContext.location[0];
  const startTime = bookingContext.startTime[0];
  const endTime = bookingContext.endTime[0];
  const eventType = bookingContext.eventType[0];
  const guestCount = bookingContext.guestCount[0];
  const packageId = bookingContext.packageChoiceId[0];
  const personalDetails = bookingContext.personalDetails[0];

  const handleConfirm = () => {

    const requestObj = {
      eventDate: eventDate,
      location: location,
      startTime: startTime,
      endTime: endTime,
      eventType: eventType,
      guestCount: guestCount,
      packageId: packageId,
      personalDetails: personalDetails
    }

    console.log(`Confirming with ${JSON.stringify(requestObj)}`)

  }

  return (
    <div className="w-full h-full flex text-gray-700 justify-center">
      <div className="flex flex-col max-w-3xl min-w-96 lg:min-w-96">
        <h1 className="font-bold text-nowrap self-center h-fit mt-4">
          Lets Make Sure We Got It Right!
        </h1>
        {/* Event Details */}
        <div className="flex flex-col items-start pl-4 pr-4 w-full mt-8">
          <h2 className="font-bold text-lg pl-1 border-b border-gray-500 w-full">Event Details</h2>
          <div className="w-full p-2">
            <div className="flex flex-row justify-between w-full">
              <p>Event Date:</p>
              <span className="font-semibold">{eventDate ? eventDate.toLocaleDateString() : "testing"}</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Location:</p>
              <span className="font-semibold">{location}</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Start Time:</p>
              <span className="font-semibold">{startTime}</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>End Time:</p>
              <span className="font-semibold">{endTime}</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Event Type:</p>
              <span className="font-semibold">{eventType}</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Guest Count:</p>
              <span className="font-semibold">{guestCount}</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Package:</p>
              <PackageDetails packageId={packageId} />
            </div>
          </div>
        </div>
        {/* Personal Details */}
        <div className="flex flex-col items-start pl-4 pr-4 w-full mt-8">
          <h2 className="font-bold text-lg pl-1 border-b border-gray-500 w-full">Personal Details</h2>
          <div className="w-full p-2">
            <div className="flex flex-row justify-between w-full">
              <p>Full Name:</p> 
              <span className="font-semibold">
                {personalDetails.firstName} {personalDetails.lastName}
              </span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Email:</p> 
              <span className="font-semibold">
                {personalDetails.email}
              </span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Phone:</p> 
              <span className="font-semibold">
                {personalDetails.phone}
              </span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Preferred Contact Method:</p> 
              <span className="font-semibold">
                {personalDetails.preferredContact}
              </span>
            </div>
          </div>
          <div className="w-full drop-shadow-sm border-t mt-8 p-2">
            <div className="flex flex-col w-full">
              <p>Comments:</p> 
              <span className="mt-1 text-sm p-1 italic">
                {personalDetails.comments ? personalDetails.comments : "N/A"}
              </span>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="relative flex justify-around mt-4 space-x-2 w-full">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:text-white"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 font-bold"
            onClick={handleConfirm}
          >
            CONFIRM
          </button>
        </div>        
      </div>
    </div>
  );
}

const PackageDetails = ({packageId} : {packageId: number}) => {
  return (
    <div>
      {packageId}
    </div>
  )
}
