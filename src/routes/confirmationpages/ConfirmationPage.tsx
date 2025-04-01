import { duration } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpService from "../../services/http.service";
import { PersonalDetailsContextDto } from "../userpages/dtos/personalDetailsContext.dto";

export const ConfirmationPage = () => {

  const {confNum} = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Event Details
  const [eventDate, setEventDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState(0);
  const [packageId, setPackageId]= useState(-1);
  const [duration, setDuration]= useState(-1);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsContextDto|undefined>({
    firstName: "",
    lastName: "",
    phone: "",
    email:"",
    preferredContact:"",
    comments: ""
  })

  // Provider Details
  const [providerEmail, setProviderEmail] = useState("");
  const [providerPhoneNumber, setProviderPhoneNumber] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `/events/${confNum}`
        const res = await httpService.get(url);
        let data = res.data;

        // Set Event Details
        setEventDate(new Date(data.event_date))
        setLocation(data.location)
        setDuration(data.duration_in_minutes)
        setEventType(data.event_type)
        setGuestCount(data.guest_count)
        setPackageId(data.package_id);
        setPersonalDetails(data.personal_details)

        const providerUrl = `/provider/contact/${data.business_id}`

        const providerRes = await httpService.get(providerUrl);
        data = providerRes.data;
        setProviderEmail(data.email)
        setProviderPhoneNumber(data.phone)


      } catch {
        console.log("Something went wrong");
      }

      setIsLoading(false)
    }

    setIsLoading(true);
    fetchUserData();
  },[])


  return (
    <div className="m-2 w-full h-full min-h-[calc(100vh-48px)] flex flex-col items-center">
      {/* Headers. */}
      <div className="font-bold text-4xl w-full h-full flex flex-col text-gray-700 mt-8 items-center">
        Event Confirmation
        <span className="font-light text-sm">#{confNum}</span>
      </div>
      <div className="flex flex-row justify-center items-center mt-4">
        <div className="font-bold text-md flex text-gray-700 justify-center mt-2 flex-col max-w-2xl">
          Hi {personalDetails.firstName},
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
                <p>Duration of Event:</p>
                <span className="font-semibold">{duration}</span>
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
          {
            personalDetails &&
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
          }
        </div>
      </div>
      {/* Contact Us. */}
      <div className="font-semibold text-lg text-gray-700 mt-8 max-w-4xl">
        <div className="text-center">
          Contact Event Provider
        </div>
        <div>
          Email: {providerEmail} 
          <br/>
          Phone: {providerPhoneNumber} 
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
