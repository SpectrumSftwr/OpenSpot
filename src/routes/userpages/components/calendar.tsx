import React from "react";
import { useState } from "react";

export const CalendarComponent = ({username, dateCallback, isMissingInput, contextSelectedDate}: 
{
  username: string, 
  dateCallback: (date: Date) => void, 
  isMissingInput: Date | null
  contextSelectedDate: Date | null
}) => {

  console.log(`TODO: fetch user date with user: ${username}`);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(contextSelectedDate);

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay(); // Day of the week for the 1st (0 = Sunday)
  const daysInMonth = endOfMonth.getDate();

  // Dates for previous month
  const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
  const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    dateCallback(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const renderDays = () => {
    const days = [];

    // Add days from previous month
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="h-10 w-10 flex items-center justify-center text-gray-400 cursor-not-allowed"
        >
          {daysInPrevMonth - i}
        </div>
      );
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
          selectedDate.getFullYear() === currentMonth.getFullYear() &&
          selectedDate.getMonth() === currentMonth.getMonth() &&
          selectedDate.getDate() === day;

      days.push(
        <div
          key={`current-${day}`}
          className={`h-10 w-10 flex items-center justify-center rounded cursor-pointer ${
isSelected
? "bg-blue-500 text-white"
: "hover:bg-gray-200 text-gray-800"
}`}
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </div>
      );
    }

    // Add days from next month
    const remainingCells = (startDay + daysInMonth) % 7;
    const nextMonthDays = remainingCells === 0 ? 0 : 7 - remainingCells;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="h-10 w-10 flex items-center justify-center text-gray-400 cursor-not-allowed"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div 
      className={`w-fit mx-auto bg-white shadow-lg rounded-lg p-4 
                  ${isMissingInput ? "border-red-600 border-2" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-gray-500 hover:text-gray-800"
        >
          &lt;
        </button>
        <h3 className="text-lg font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          className="text-gray-500 hover:text-gray-800"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-gray-700">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
      {selectedDate && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Selected Date: {selectedDate.toDateString()}
        </div>
      )}
    </div>
  );}
