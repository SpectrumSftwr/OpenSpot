import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./layouts/bookingslayout";

export const ReviewBooking = () => {
  const navigate = useNavigate();
  const bookingContext = useContext(BookingContext);
  const [eventDate, setEventDate] = useState(bookingContext.eventDate[0]);
  const [location, setLocation] = useState(bookingContext.location[0]);
  const [startTime, setStartTime] = useState(bookingContext.startTime[0]);
  const [endTime, setEndTime] = useState(bookingContext.endTime[0]);
  const [eventType, setEventType] = useState(bookingContext.eventType[0]);
  const [guestCount, setGuestCount] = useState(bookingContext.guestCount[0]);
  const [packageId, setPackageId] = useState(bookingContext.packageChoiceId[0]);
  const [personalDetails, setPersonalDetails] = useState(bookingContext.personalDetails[0]);

  const handleConfirm = () => {
    console.log("Confirmed")

  }

  // Used to fetch the selected Package
  useState(() => {
    console.log("test")
  })

  return (
    <div className="max-w-3xl p-6 mt-4 flex flex-col w-full">
      <h1 className="text-sm font-semiboldbold text-gray-700">Lets Make Sure We Got You Special Day Right.</h1>
      {/* Event Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Event Details</h2>
        <div className="space-y-2">
          <p><strong>Event Date:</strong>{eventDate.toLocaleDateString()}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Start Time:</strong> {startTime}</p>
          <p><strong>End Time:</strong> {endTime}</p>
          <p><strong>Event Type:</strong> {eventType}</p>
          <p><strong>Guest Count:</strong> {guestCount}</p>
          <p><strong>Package:</strong> {packageId}</p>
        </div>
      </div>
      {/* Personal Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Personal Details</h2>
        <div className="space-y-2">
          <p><strong>First Name:</strong> {personalDetails.firstName}</p>
          <p><strong>Last Name:</strong> {personalDetails.lastName}</p>
          <p><strong>Email:</strong> {personalDetails.email}</p>
          <p><strong>Phone:</strong> {personalDetails.phone}</p>
          <p><strong>Preferred Contact Method:</strong> {personalDetails.preferredContact}</p>
          <p><strong>Comments:</strong> {personalDetails.comments || "N/A"}</p>
        </div>
      </div>

  {/* Action Buttons */}
        <div className="relative flex justify-around mt-2 space-x-2 w-full">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 font-bold"
          >
          CONFIRM
          </button>
        </div>        
    </div>
  );
}
