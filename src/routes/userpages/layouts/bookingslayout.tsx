import React, { createContext, useContext, useMemo, useState }  from "react";
import { Outlet } from "react-router-dom";
import { UserTopNavSection } from "../components/TopNavSection";
import { PersonalDetailsContextDto } from "../dtos/personalDetailsContext.dto";
import { UserContext } from "./UserContext";

export const BookingContext = createContext<any>({})

export const BookingsLayout = () => {

  const userContext = useContext(UserContext);
  const profilePicUrl = userContext.profilePictureUrl[0];
  const bannerPicUrl = userContext.bannerPicUrl[0];
  const businessName = userContext.businessName[0];
  const businessType = userContext.businessType[0];

  const [eventDate, setEventDate] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [packageChoiceId, setPackageChoiceId] = useState<number>(-1);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsContextDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "email",
    comments: "",
    address: "",
  })

  const createInitialBookingContext = () => {
    return {
      eventDate: [eventDate, setEventDate],
      location: [location, setLocation],
      startTime: [startTime, setStartTime],
      endTime: [endTime, setEndTime],
      eventType: [eventType, setEventType],
      guestCount: [guestCount, setGuestCount],
      packageChoiceId: [packageChoiceId, setPackageChoiceId],
      personalDetails: [personalDetails, setPersonalDetails],
      currentStep: [currentStep, setCurrentStep]
    }
  }

  const bookingContext = useMemo(() => createInitialBookingContext(), [
    eventDate,
    location,
    startTime,
    endTime,
    eventType,
    guestCount,
    packageChoiceId,
    personalDetails,
    currentStep,
  ])

  return (
    <BookingContext.Provider value={bookingContext}>
      <div className="w-screen">
        <UserTopNavSection 
          isHome={false} 
          providerName={businessName} 
          providerType={businessType}
          providerOverallRating={null}
          providerTotalRatings={null}
          profilePicUrl={profilePicUrl}
          bannerUrl={bannerPicUrl}
        />
        <Outlet />
      </div>
    </BookingContext.Provider>
  )
}
