import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  ChevronLeftIcon,
  ChevronRightIcon

} from '@heroicons/react/24/solid'

/**
 * This page needs to be loaded without any intervention from outside state 
 * do not include any session state at this level. this page should be fully 
 */
const Calendar = () => {
  // CONSTANTS.
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const DAYS_OF_THE_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Current date fields.
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  // Calander State

  const [date, setDate] = useState<Date>(currentDate);
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);


  const [lastDateOfMonth, setLastDateOfMonth] = useState<number>();
  const [lastDayOfMonth, setLastDayOfTheMonth] = useState<number>();
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>();
  const [lastDayOfLastMonth, setLastDayOfLastMonth] = useState<number>(new Date(year, month, 0).getDate());



  // What to do upon initial load.
  useEffect(() => { 

    if (month < 0 || month > 11 ) {
      setDate(new Date(year, month, new Date().getDate()));
    } 

    setFirstDayOfMonth(new Date(year, month, 1).getDay())
    setLastDateOfMonth(new Date(year, month + 1, 0).getDate())

    setLastDayOfLastMonth(new Date(year, month , 0).getDate())
  }, [month])

  useEffect(() => {
    setLastDayOfTheMonth(new Date(year, month, lastDateOfMonth).getDay())
  },[year, month, lastDateOfMonth]);


  useEffect(() => {
    if (month < 0 || month > 11 ) {
      setYear(date.getFullYear());
      setMonth(date.getMonth())
    } 
  }, [date])

  /**
   * Will handle what to do when the left and right arrows are clicked.
   */
  const handleIconClicks = (direction: string) => {
    direction === "prev" 
      ? setMonth((month) => month - 1)
      : setMonth((month) => month + 1)
  }

  /**
   *  This method will route the user to begin a booking for a given date.
   */
  const onDateClick = (selectedDate: number) => {
    console.log("Creating a new event for: ") 
    let date = new Date(year, month, selectedDate);
    console.log(date);

  }

  // Create the calander 
  return (
    <div className="w-full border-solid border-4 p-4 h-full rounded-3xl text-black">
      <div className="flex items-center justify-between pt-6 pl-6 pr-8 pb-3">
        <div className="flex flex-row justify-between items-center w-full">
          {(currentYear < year || currentMonth < month)
            ?
            <span onClick={() => handleIconClicks("prev")}>
              <ChevronLeftIcon 
                className="h-6 w-6 ml-1 cursor-pointer text-center leading-9 rounded-full bg-slate-300 mr-4"/>
            </span>
            : 
            <span></span>
          }
          <div className="text-3xl font-extrabold">
            <select className="mr-4" defaultValue={month} onChange={(e) => {setMonth(+e.target.value)}}>
              {MONTHS.map((m, index) => {
                return <option key={index} value={index} >{m}</option>
              })}
            </select>
            <select className="mr-4" defaultValue={year} onChange={(e) => {setYear(+e.target.value)}}>
              {Array.from({length: 99}, (_, i) => (i + year) - 50).map((y, index) => {
                return <option key={index} value={y}>{y}</option>
              })}
            </select>
          </div>
          <span onClick={() => { handleIconClicks("next")}}>
            <ChevronRightIcon 
              className="h-6 w-6 cursor-pointer text-center leading-9 rounded-full bg-slate-300 ml-4"/>
          </span>
        </div>
      </div>
      <div className="h-[40vh]">
        <ul className="flex list-none flex-wrap text-center mt-2 mb-2 text-2xl font-normal h-full w-full">
          {/* Days of The Week */}
          {DAYS_OF_THE_WEEK.map((val, key) => ( 
            <li key={key} className="w-[calc(100%/7)] font-bold h-0.5 mt-4 pt-2">
              {val} 
            </li>
          ))}

          {/* Days that show from last month */}
          {Array.from({length: firstDayOfMonth}, (_, i) => i + 1).reverse().map((day, key) => {
            return (
              <li key={key} className="w-[calc(98%/7)] outline outline-gray-400 mt-1 text-end pr-4 mr-1">
                <span className="text-gray-300">
                  {lastDayOfLastMonth - day + 1}
                </span>
              </li>
            )
          })}

          {/* Days that show from current month */}
          {Array.from({length: lastDateOfMonth}, (_, i) => i + 1).map((day, key) => {
            return (
              <li 
                key={key} 
                onClick={()=> onDateClick(key + 1)}
                className="w-[calc(98%/7)] outline outline-gray-400 mt-1 text-end pr-4 mr-1 pt-3">
                <span className={`${currentDate.getDay() == key 
                                  && month == currentDate.getMonth() 
                                  && year == currentDate.getFullYear()
                                  && "bg-blue-200 text-black pl-2 pr-2 rounded-full"}`}>
                  <span>{day}</span>
                </span>
              </li>
            )
          })}

          {/* Days that show from next month */}
          {
            ((dates: []) => {
              for (let i = lastDayOfMonth; i < 6; i++) {
                dates.push(
                  <li 
                    onClick={()=> onDateClick(lastDayOfMonth + i + 1)}
                    className="w-[calc(98%/7)] outline outline-gray-400 mt-1 text-end pr-4 mr-1" 
                    key={lastDayOfMonth + i}>
                    <span className="text-gray-300">
                      {i - lastDayOfMonth + 1}
                    </span>
                  </li>
                )
              }
              return dates;
            })([])
          }
        </ul>
      </div>
    </div>
  )

}

export default Calendar;
