import { add } from "date-fns";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../services/http.service";
import { PackageDetailsDto } from "./dtos/PackageDetails.dto";
import { useEnsureBookingContext } from "./hooks/useEnsureBookingContext";
import { BookingContext } from "./layouts/bookingslayout";

export const ReviewBooking = () => {
  const navigate = useNavigate();
  const {user} = useParams();
  const bookingContext = useContext(BookingContext);

  useEnsureBookingContext(5); 
  const [, setCurrentStep] = bookingContext.currentStep;

  const eventDate = bookingContext.eventDate[0];
  const setEventDate = bookingContext.eventDate[1];
  const location = bookingContext.location[0];
  const startTime = bookingContext.startTime[0];
  const endTime = bookingContext.endTime[0];
  const eventType = bookingContext.eventType[0];
  const guestCount = bookingContext.guestCount[0];
  const packageId = bookingContext.packageChoiceId[0];
  const selectedAddOns = bookingContext.selectedAddOns[0];
  const personalDetails = bookingContext.personalDetails[0];

  const [,setError] = useState(false);

  const handleConfirm = () => {
    const submitUserEvent = async (requestObj: any) => {
      console.log(requestObj)
      try {
        const url = '/events/create';
        const {data} = await httpService.post(url, requestObj);
        navigate(`/confirmation/${data.confirmation}`)
      } catch {
        setError(true);
      }
    }

    const parseTimeString = (timeString: string) => {
      const match = timeString.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
      if (!match) throw new Error("Invalid time format");

      let hour = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const period = match[3].toUpperCase();

      // Convert to 24-hour format
      if (period === "PM" && hour !== 12) {
        hour += 12;
      }
      if (period === "AM" && hour === 12) {
        hour = 0;
      }

      return { hour, minutes };
    }

    const {hour, minutes} = parseTimeString(startTime);

    const eventTime = eventDate;
    eventTime.setHours(hour)
    eventTime.setMinutes(minutes)


    const requestObj = {
      business_uid: user,
      eventDate: eventTime,
      location: location,
      startTime: startTime,
      endTime: endTime,
      eventType: eventType,
      guestCount: parseInt(guestCount),
      packageId: packageId,
      personalDetails: personalDetails,
      addOns: selectedAddOns 
    }

    submitUserEvent(requestObj);
  }

  return (
    <div className="w-full h-full flex text-gray-700 justify-center">
      <div className="flex flex-col max-w-3xl min-w-96 lg:min-w-96">
        <h1 className="font-bold text-nowrap self-center h-fit mt-4">
          Lets Make Sure We Got It Right!
        </h1>
        {/* Event Details */}
        <div className="flex flex-col items-start pl-4 pr-4 w-full mt-8">
            <div className="bg-gray-50 p-8 my-4 rounded-sm drop-shadow-md">
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
          </div>
            <div className="bg-gray-50 p-8 my-4 rounded-sm drop-shadow-md">
              <div className="flex flex-col w-full">
                <p className="font-bold text-lg pl-1 border-b border-gray-500 w-full">Requested Package Details:</p>
                <span className="py-4 px-2">
                  <PackageDetails packageId={packageId} />
                </span>
              </div>
              <div className="flex flex-col w-full mt-2">
                <p className="font-bold text-lg pl-1 border-b border-gray-500 w-full">Requested Add Ons:</p>
                <span className="p-2 ml-2">
                  <AddOns addOns={selectedAddOns} />
                </span>
              </div>
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
        <div className="relative flex justify-around mt-12 space-x-2 w-full ">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:text-white"
            onClick={() => {
              setCurrentStep(4)
              navigate(-1)
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-blue-600 font-bold"
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

  const [packageDetails, setPackageDetails] = useState<PackageDetailsDto | null>(null)
  const [isLoading, setIsLoading]   = useState(true);

  useEffect(() => {
    const fetchPackageDetails = async (packageId: number) => {
      try {
        const url = `/userpage/package_details/${packageId}`
        const {data} = await httpService.get(url);
        setPackageDetails(data);
      } catch {
        setPackageDetails(null)
      }

      setIsLoading(false);
    }

    fetchPackageDetails(packageId);
  },[packageId])

  return isLoading
    ? 
      <div>
        Loading...
      </div>
    : 
    <div>
    <div className="italic text-sm font-bold items-center mb-1 flex flex-row justify-between">
        <span>
          {packageDetails.title}
        </span>
        <span className=" text-xs">
          Starting at ${packageDetails.price.toFixed(2)}
        </span>
      </div>
        <div className="flex flex-col m-2 text-sm">
          {packageDetails.includes.map((inclusion, index) => {
            return (
              <div key={index} className="italic mt-1">
                - {inclusion}
              </div>
            )
          })}
        </div>
      </div>
}

const AddOns = ({addOns}: {addOns : number[]}) => {

  const [addOnDetails, setAddOnDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackageDetails = async (addOns: number[]) => {
      try {
        const url = `/userpage/addons`
        const requestObj = {
          addOnIds: [...addOns]
        }
        const {data} = await httpService.post(url, requestObj);
        console.log(data);
        setAddOnDetails(data);
      } catch {
        setAddOnDetails(null)
      }
    }

    fetchPackageDetails(addOns);
  },[addOns])

  return (
    <div>
      {addOns.length > 0 ? 
        addOnDetails && addOnDetails.map((addOn, index) => {
          return (
          <div key={index} className="italic text-sm mb-1 flex flex-row justify-between">
              <span>
                - {addOn.name}
              </span>
              <span className="text-xs">
                ${addOn.price.toFixed(2)}
              </span>
          </div>
          )
        })
        : <div>
          No Add Ons
        </div>
      }
    </div>
  )
}
