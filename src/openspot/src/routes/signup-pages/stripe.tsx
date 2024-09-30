import React , {useContext, useEffect} from "react"
import { StepContext } from "../../layouts/signupflowlayout"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

export const StripeSetup = () => {
  const {activeStep, setActiveStep} = useContext(StepContext)
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStep(3)
  },[])

  const handleNavigateToNext = () => {
    navigate("/signup/stripe")
  }

  return (
  <div className="w-full h-[calc(100vh-150px)] flex flex-col justify-between items-center">
      <div>
        
      </div>
      <div>

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
