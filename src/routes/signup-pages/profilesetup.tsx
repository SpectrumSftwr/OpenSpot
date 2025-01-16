import React , {useContext, useEffect, useRef, useState} from "react"
import { StepContext } from "../../layouts/signupflowlayout"
import { ArrowRightIcon, ArrowUpTrayIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

export const Profile = () => {

  const [imageSet, setImageSet] = useState<File|undefined>(null);
  const hiddenFileInput = useRef(null)
  const {activeStep, setActiveStep} = useContext(StepContext)
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStep(0)
  },[])

  const STATE_CODE = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", 
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", 
    "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", 
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", 
    "WI", "WY"
  ];

  const handleNavigateToNext = () => {
    navigate("/signup/theme")
  }
  return (
  <div className="w-full h-[calc(100vh-150px)] flex flex-col justify-between items-center">
      <div className="w-full">
        <div className="mt-8 text-gray-600">
          <div className="flex flex-col text-center">
            Welcome, to OpenSpot
            <span className="mt-2 text-gray-400">Lets get you setup!</span>
          </div>
        </div>
        <form className=" mt-4 flex flex-col text-center justify-around w-full items-center">
          <div className="mt-4 h-full">
            {imageSet ? 
              <div className="flex flex-col justify-center items-center">
                <label className="text-gray-500">Profile Description</label>
                <span className="bg-gray-300 w-32 h-32 text-white rounded-full flex flex-col justify-center items-center mt-2">
                  Set
                </span>
              </div>
              : 
              <div className="flex flex-col justify-center items-center">
                <label className="text-gray-500">Profile Picture</label>
                <span className="bg-gray-300 w-32 h-32 text-white rounded-full flex flex-col justify-center items-center mt-2 drop-shadow-lg">
                  <ArrowUpTrayIcon className="h-1/3 text-white"/>
                </span>
              </div>
            }
            <input type='image' id="profile" accept='image/*'  className="hidden" ref={hiddenFileInput}/> 
            <button
              className="bg-[#047460] text-white p-2 rounded-xl w-fit flex flex-row items-center justify-center drop-shadow-lg 
              hover:text-[#047460] hover:bg-[#FAFAFA] m-4 mb-2 text-sm">
              Upload Profile Picture</button>
            <span className="text-gray-500 text-xs">PNG, JPEG under 15MB</span>
          </div>
          <div className="m-4 flex flex-col justify-between h-full">
            <label className="text-gray-500 text-start">Profile Description</label>
            <div>
               <textarea placeholder="What should customers expect from you?" 
                className="resize-none drop-shadow-lg p-2 rounded-xl mt-4" cols={80} rows={7}></textarea>
            </div>
          </div>
          <div className="m-4 flex flex-row justify-center w-1/2 mt-4 text-start">
            <div className="text-start flex-col flex mr-4">
              <label className="text-gray-500 p-1">
                City
              </label>
              <input type='text' placeholder="Set your city" className="drop-shadow-lg p-2 rounded-xl"/>
            </div>
            <div className="text-start flex-col flex ml-4">
              <label className="text-gray-500 p-1">
                State
              </label>
              <select className="drop-shadow-lg p-2 rounded-xl w-48 h-10" >
                <option className="text-gray-600" selected>Select Your State</option>
                {STATE_CODE.map((code, index) => {
                  return (
                  <option key={index}>{code}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </form>
      </div>
      <div onClick={() => handleNavigateToNext()} 
        className="bg-[#047460] text-white p-2 rounded-xl w-24 flex flex-row items-center justify-center drop-shadow-lg 
        hover:text-[#047460] hover:bg-[#FAFAFA] mb-10 text-sm">
        <button type="submit">
          Next
        </button>
        <ArrowRightIcon className="ml-2 w-4 h-7"/>
      </div>
  </div>
  )
}
