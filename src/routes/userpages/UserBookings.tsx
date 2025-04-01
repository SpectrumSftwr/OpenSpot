import React, {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarComponent } from "./components/calendar";
import { BookingContext } from "./layouts/bookingslayout";

export const UserBookings = () =>  {

const [validCompleteForm, setValidCompleteForm] = useState<boolean>(true);

const {user} = useParams();

const navigate = useNavigate();

const bookingContext = useContext(BookingContext)

const times = [
  "12:00","12:30",
  "1:00", "1:30",
  "2:00", "2:30",
  "3:00", "3:30",
  "4:00", "4:30",
  "5:00", "5:30",
  "6:00", "6:30",
  "7:00", "7:30",
  "8:00", "8:30",
  "9:00", "9:30",
  "10:00","10:30",
  "11:00","11:30",
]

const [errors, setErrors] = useState({
  eventDate: null,
  startTime: null,
  endTime: null,
  location: null,
  eventType: null,
  guestCount: null,
});

const [formData, setFormData] = useState<{
  eventDate: Date | null,
  startTime: string | null,
  endTime: string | null, 
  location: string| null,
  eventType:  string | null,
  guestCount: string | null,
}>({
  eventDate: bookingContext.eventDate[0],
  startTime: bookingContext.startTime[0],
  endTime: bookingContext.endTime[0],
  location: bookingContext.location[0],
  eventType: bookingContext.eventType[0],
  guestCount: bookingContext.guestCount[0],
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });

  setValidCompleteForm(true)

  setErrors({
    eventDate: null,
    startTime: null,
    endTime: null,
    location: null,
    eventType: null,
    guestCount: null,
  })
};

const dateIsInThePast = (date: Date) : boolean => {
  const today = new Date();
  today.setHours(0,0,0,0);
  return date >= today;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const setEventDate = bookingContext.eventDate[1];
  const  setLocation  = bookingContext.location[1];
  const  setStartTime = bookingContext.startTime[1];
  const  setEndTime = bookingContext.endTime[1];         
  const  setEventType = bookingContext.eventType[1];
  const  setGuestCount = bookingContext.guestCount[1];

  // First Validate before moving on
  const newErrors : {
    eventDate: boolean | null,
    location: boolean | null,
    startTime: boolean | null,
    endTime: boolean | null,
    eventType: boolean | null,
    guestCount: boolean | null,
  } = {
      eventDate: null,
      location: null,
      startTime: null,
      endTime: null,
      eventType: null,
      guestCount: null,
    };


  if (formData.eventDate !== null && !dateIsInThePast(formData.eventDate)) newErrors.eventDate = true;
  if (!formData.location) newErrors['location'] = true;
  if (!formData.startTime) newErrors['startTime'] = true;
  if (!formData.endTime) newErrors['endTime'] = true;
  if (!formData.eventType) newErrors['eventType'] = true;
  if (!formData.guestCount || parseInt(formData.guestCount) < 0) newErrors['guestCount'] = true;

  if (Object.keys(newErrors).map((key) => newErrors[key]).filter((val) => val).length > 0) {
    setErrors(newErrors);
    setValidCompleteForm(false)
    return
  }

  setEventDate(formData.eventDate)
  setLocation(formData.location)
  setStartTime(formData.startTime)
  setEndTime(formData.endTime)
  setEventType(formData.eventType)
  setGuestCount(formData.guestCount)

  navigate(`/myspot/${user}/bookings/packages`)
};

const setDateFromSelectedOption = (date: Date) => {
  setFormData({
    ...formData,
    eventDate: date,
  });
}

useEffect(() => {
},[])

return (
  <div className="w-screen flex flex-col justify-start">
    <div className="flex flex-col justify-center items-center">
      <div className="text-sm font-bold text-gray-700 mt-2 mb-8">
        What Date Is Your Desired Event?
      </div>
      <CalendarComponent 
        dateCallback={(date) => setDateFromSelectedOption(date)} 
        isMissingInput={errors.eventDate}
        contextSelectedDate={bookingContext.eventDate[0]} 
      />
    </div>
    {!validCompleteForm && Object.keys(errors).length > 0 && 
      <div className="w-full flex flex-row justify-center mt-3 text-red-600 font-bold">
        Please fill out the form entirely.
      </div>
    }
    <div className="flex flex-col items-center p-2">
      <form className="flex flex-col justify-center items-center mt-4 text-sm text-gray-600 w-full"
        onSubmit={handleSubmit}>
        <span className="font-bold">
            Event Details:
          </span>
          {/* Location */}
          <div className="flex flex-col mt-2 justify-center w-full md:justify-around lg:justify-center items-center" >
            <div className="w-4/5 max-w-[612px]">
              <div className="mb-1 ml-1">
                <label htmlFor="location" 
                  className="font-bold mb-1"
                >Event Address</label>
              <span className="ml-1 text-red-400">*</span>
              </div>
              <input
                className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
focus:ring-blue-500 focus:border-blue-500 
${errors.location ? "border-red-600 " : ""}`}
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
              />
            </div>
          </div>
          <div className="flex flex-row w-screen justify-center items-center mt-2">
            <div className="w-1/3 max-w-72">
              {/* Start Time */}
              <div className="flex flex-col mt-2 justify-between md:justify-around lg:justify-center" >
                <div>
                  <label htmlFor="startTime" 
                    className="font-bold mb-1 lg:mr-20 ml-1"
                  >Start Time</label>
                  <span className="ml-1 text-red-400">*</span>
                </div>
                <select 
                  className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
focus:ring-blue-500 focus:border-blue-500
${errors.startTime ? "border-red-600 " : ""}`}
                  name="startTime" id="startTime" value={formData.startTime} onChange={handleChange}>
                  <option value="">Select Start Time</option>
                  {times.map((time, index) => {
                    let currTime = time + "AM"
                    return (
                      <option value={currTime} key={index}>{currTime}</option>
                    )
                  })}
                  {times.map((time, index) => {
                    let currTime = time + "PM"
                    return (
                      <option value={currTime} key={index}>{currTime}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="w-1/3 max-w-72 ml-10">
              {/* End Time */}
              <div className="flex flex-col mt-2 justify-between md:justify-around lg:justify-center" >
                <div>
                  <label htmlFor="startTime" 
                    className="font-bold mb-1 lg:mr-20 ml-1"
                  >End Time</label>
                  <span className="ml-1 text-red-400">*</span>
                </div>
                <select 
                  className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
focus:ring-blue-500 focus:border-blue-500
${errors.endTime ? "border-red-600 " : ""}`}
                  name="endTime" id="endTime" value={formData.endTime} onChange={handleChange}>
                  <option value="">Select End Time</option>
                  {times.map((time, index) => {
                    let currTime = time + "AM"
                    return (
                      <option value={currTime} key={index}>{currTime}</option>
                    )
                  })}
                  {times.map((time, index) => {
                    let currTime = time + "PM"
                    return (
                      <option value={currTime} key={index}>{currTime}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-screen justify-center items-center mt-2">
            <div className="w-1/3 max-w-72">
              {/* Event Type */}
              <div className="flex flex-col mt-4 justify-between md:justify-around lg:justify-center" >
                <div className="ml-1">
                  <label htmlFor="eventType" className="font-bold mb-1 lg:mr-20">Event Type</label>
                  <span className="ml-1 text-red-400">*</span>
                </div>
                <select 
                  className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
focus:ring-blue-500 focus:border-blue-500
${errors.eventType? "border-red-600 " : ""}`}
                  name="eventType" id="eventType" value={formData.eventType} onChange={handleChange}>
                  <option value="">Select Event Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="w-1/3 max-w-72 ml-10">
              {/* Guest Count */}
              <div className="flex flex-col mt-4 justify-between md:justify-around lg:justify-center" >
                <div className="ml-1">
                  <label htmlFor="guestCount" className="font-bold">Guest Count</label>
                  <span className="ml-1 text-red-400">*</span>
                </div>
                <input
                  className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
focus:ring-blue-500 focus:border-blue-500
${ errors.guestCount ? "border-red-600 " : ""}`}
                  type="number"
                  name="guestCount"
                  id="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  placeholder="Enter number of guests"
                />
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="w-full flex justify-around mt-8 space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => {navigate(-1)}}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-700 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>        
        </form>
        <div>
        </div>
      </div>
    </div>
  )
}
