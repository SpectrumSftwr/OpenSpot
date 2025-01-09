import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CalendarComponent } from "./components/calendar";
import { BookingContext } from "./layouts/bookingslayout";

export const UserBookings = () =>  {
  const username = "test";

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

  const [formData, setFormData] = useState({
    eventDate: null,
    startTime: "",
    endTime: "",
    location: "",
    eventType: "",
    guestCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    const [eventDate, setEventDate] = bookingContext.eventDate;
    const [location, setLocation]  = bookingContext.location;
    const [startTime, setStartTime] = bookingContext.startTime;
    const [endTime, setEndTime] = bookingContext.endTime;         
    const [eventType, setEventType] = bookingContext.eventType;
    const [guestCount, setGuestCount] = bookingContext.guestCount;

    setEventDate(formData.eventDate)
    setLocation(formData.location)
    setStartTime(formData.startTime)
    setEndTime(formData.endTime)
    setEventType(formData.eventType)
    setGuestCount(formData.guestCount)

    navigate(`/myspot/${username}/bookings/packages`)
  };

  const setDateFromSelectedOption = (date: Date) => {
    console.log(date)
    setFormData({
      ...formData,
      eventDate: date,
    });
  }
 
  return (
    <div className="w-screen flex flex-col justify-start">
      <div className="flex flex-col justify-center items-center">
        <div className="text-sm font-bold text-gray-700 mt-2 mb-8">
          What Date Is Your Desired Event?
        </div>
        <CalendarComponent username={username} dateCallback={(date) => setDateFromSelectedOption(date)}/>
      </div>
      <div className="flex flex-col items-center p-2">
        <form className="flex flex-col justify-center items-center mt-4 text-sm text-gray-600 w-full"
          onSubmit={handleSubmit}>
          <span className="font-bold">
            Event Details:
          </span>
          {/* Location */}
          <div className="flex flex-col mt-2 justify-center w-full md:justify-around lg:justify-center items-center" >
            <div className="w-4/5 max-w-[612px]">
              <label htmlFor="location" 
                className="font-bold mb-1"
              >Location:</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <label htmlFor="startTime" 
                  className="font-bold mb-1 lg:mr-20"
                >Start Time:</label>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <label htmlFor="endTime" className="font-bold mb-1 lg:mr-20">End Time:</label>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <label htmlFor="eventType" className="font-bold mb-1 lg:mr-20">Event Type:</label>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <label htmlFor="guestCount" className="font-bold mr-4 lg:mr-20">Guest Count:</label>
                <input
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="flex justify-around mt-8 space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
