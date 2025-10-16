import { add } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../services/http.service";
import { useEnsureBookingContext } from "./hooks/useEnsureBookingContext";
import { BookingContext } from "./layouts/bookingslayout";

export const BookingAddOns = () => {


  const bookingContext = useContext(BookingContext);
  const [, _setCurrentStep] = bookingContext.currentStep;
  const [selectedAddOns, setSelectedAddOns] = bookingContext.selectedAddOns;
  useEnsureBookingContext(3);

  const {user} = useParams();
  const navigate = useNavigate();

  const [availableAddOns, setAvailableAddOns] = useState([]);
  const [error, setError] = useState(false);


  /**
   * Method To fetch all the Optional Addons
   */
  const fetchBusinessAddOns = async () => {
    try {
      const { data } = await httpService.get(`/userpage/addons/${user}`)
      setAvailableAddOns(data)
    } catch (err) {
    }
  }


  useEffect(() => {
    fetchBusinessAddOns();
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    _setCurrentStep(4)
    navigate('../personalinfo')
  }

  const handleCheckBoxClick = (e) => {
    setSelectedAddOns((prev: Number[]) => {
      const value = Number(e.target.value);
      return prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    })
  }


  return (
    <div className="h-full w-screen flex flex-col items-center justify-center">
      <div className="max-w-[720px]">
        <div className="text-lg font-bold text-gray-700 my-4 mx-2 text-center">
          Add Something To Make It More Special!
        </div> 
        <div className="h-full w-full flex flex-col justify-center">
          {
            availableAddOns.length > 0 ? 
              availableAddOns.map((addOn, index) => {
                return (
                  <div key={index} className="flex flex-col p-2 m-2 w-[95%] border-gray-100 border-2 rounded-sm drop-shadow-sm">
                    <div className="flex flex-row justify-between w-full font-bold items-center border-b-2">
                      {addOn.name}
                      <span className="text-sm">
                        ${Number(addOn.price).toFixed(2)}
                      </span>
                    </div>
                    <span className="mt-2 text-xs font-normal text-gray-700">
                      {addOn.description}
                    </span>
                    <div className="flex flex-col items-end mr-4">
                      <div className="flex flex-row">
                        <label className="mr-2 italic text-xs">Add:</label>
                        <input 
                          type='checkbox' 
                          onChange={handleCheckBoxClick} 
                          value={addOn.id} 
                          checked={selectedAddOns.includes(addOn.id)}/>
                      </div>
                    </div>
                  </div>
                )
              })
              : <div className="h-[80%]">
                No Adds Ons Are Available At this Time.
              </div>
          }
        </div>
      </div>
      <form onSubmit={handleSubmit} className="relative bottom-2 w-2/3 items-center">
        <div className="flex justify-around mt-8 space-x-2 w-full">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={() => {
              _setCurrentStep(2)
              navigate(-1)
            }}
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
    </div>
  )
}
