import React , {useContext, useEffect} from "react"
import { StepContext } from "../../layouts/signupflowlayout"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

export const ServicesSetup = () => {
  const {activeStep, setActiveStep} = useContext(StepContext)
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStep(2)
  },[])

  const handleNavigateToNext = () => {
    navigate("/signup/stripe")
  }

  return (
  <div className="w-full h-[calc(100vh-150px)] flex flex-col justify-between items-center">
      <div className="w-full items-center flex flex-col h-full">
        <div className="mt-8 font-semibold font-xl">
          Add Your Services and Packages.
        </div>
        <div className="flex flex-row justify-between mt-4 w-2/3 text-center h-2/3">
          <div className="bg-white drop-shadow-lg w-1/2 m-2 rounded-xl">
            <span className="p-2">
              Create a new Service
            </span>
          </div>
          <div className="bg-white drop-shadow-lg w-1/2 m-2 rounded-xl">
            <span className="mt-2">
              Create a new Package 
            </span>
          </div>
        </div>
      </div>
      <div onClick={() => handleNavigateToNext()} 
        className="bg-[#047460] text-white p-2 rounded-xl w-32 flex flex-row items-center justify-center drop-shadow-lg 
        hover:text-[#047460] hover:bg-[#FAFAFA] mb-10">
        <button type="submit">
          Next
        </button>
        <ArrowRightIcon className="ml-2 w-4 h-7"/>
      </div>
  </div>
  )
}
