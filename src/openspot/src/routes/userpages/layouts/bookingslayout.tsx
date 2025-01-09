import React, { createContext, useState }  from "react";
import { Outlet } from "react-router-dom";
import { UserTopNavSection } from "../components/TopNavSection";

export const BookingContext = createContext<any>({})

export const BookingsLayout = () => {

  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const createInitialBookingContext = () => {
    return {
      eventDate: [eventDate, setEventDate],
      location: [location, setLocation],
      startTime: [startTime, setStartTime],
      endTime: [endTime, setEndTime],
      eventType: [eventType, setEventType],
      guestCount: [guestCount, setGuestCount],
    }
  }

  return (
    <BookingContext.Provider value={createInitialBookingContext()}>
      <div className="w-screen h-[calc(75vh)]">
        <UserTopNavSection 
          isHome={false} 
          providerName={"Spectrum Entertainment"} 
          providerType={"DJ & MC Services"}
          providerOverallRating={null}
          providerTotalRatings={null}
        />
        <Outlet />
      </div>
    </BookingContext.Provider>
  )
}
