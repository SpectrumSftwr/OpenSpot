import React, {useEffect, useContext} from "react"
import { ThemePicker } from "../../components/common/themepicker"
import { StepContext } from "../../layouts/signupflowlayout"

export const Theme = () => {
  const {activeStep, setActiveStep} = useContext(StepContext)

  useEffect(() => {
    setActiveStep(1)
  },[])

  return (
  <div>
      <ThemePicker />
  </div>
  )
}
