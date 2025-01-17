import React from "react";
import { useParams } from "react-router-dom";
import { PersonalDetailsContextDto } from "../userpages/dtos/personalDetailsContext.dto";

export const ConfirmationPage = () => {

  const {confNum} = useParams();
  const eventDate = new Date();
  const location = "Your Moms House";
  const startTime = "10:00AM";
  const endTime = "2:00PM";
  const eventType = "Wedding";
  const guestCount = 159;
  const packageId = 1;
  const personalDetails:PersonalDetailsContextDto = {
    firstName: "Juan",
    lastName: "Mejia",
    phone: "999-888-7766",
    email: "MyEmail@Email.com",
    preferredContact: "Phone",
    comments: "This is my comments on a couple of things I would like to know.",
  }


  return (
    <div className="m-2 w-full h-full min-h-[calc(100vh-48px)] flex flex-col items-center">
      {/* Headers. */}
      <div className="font-bold text-4xl w-full h-full flex flex-col text-gray-700 mt-8 items-center">
        Event Confirmation
        <span className="font-light text-sm">#{confNum}</span>
      </div>
      <div className="flex flex-row justify-center items-center mt-4">
        <div className="font-bold text-md flex text-gray-700 justify-center mt-2 flex-col max-w-2xl">
          Hi (Insert Name),
          <br/>
          <span className="font-semibold mt-2">
            Thank you for booking your event with OpenSpot!
            We've recieved your request and your event provider will be reaching out with further details!
          </span>
        </div>
      </div>
      {/* Details. */}
      <div className="flex flex-col text-gray-700 items-center justify-center w-full">
        <div className="flex flex-col max-w-3xl min-w-96 lg:min-w-96">
          {/* Event Details */}
          <div className="flex flex-col items-start pr-4 w-full mt-8">
            <h2 className="font-bold text-lg pl-1 border-b-2  w-full">Event Details</h2>
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
          <div className="flex flex-col items-start pr-4 w-full mt-8">
            <h2 className="font-bold text-lg pl-1 border-b-2 w-full">Personal Details</h2>
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
            <div className="w-full drop-shadow-sm border-t-2 mt-8 p-2">
              <div className="flex flex-col w-full">
                <p>Comments:</p> 
                <span className="mt-1 text-sm p-1 italic">
                  {personalDetails.comments ? personalDetails.comments : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Us. */}
      <div className="font-bold text-lg text-gray-700 mt-8 max-w-4xl">
        <div>
          Contact Event Provider
        </div>
        <div>
          Email: Email@DJ.com
          <br/>
          Phone: (222)-333-4494
          <br/>
        </div>
      </div>
    </div>
  )
}

const PackageDetails = ({packageId} : {packageId: number}) => {
  return (
    <div>
      {packageId}
    </div>
  )
}
