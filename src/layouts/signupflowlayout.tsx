import { SessionContext } from "../App";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [
  "Setup your Business Profile",
]

interface TStepContext {
  activeStep: number|null;
  setActiveStep: Dispatch<SetStateAction<number|null>>;
}

export const StepContext = createContext<TStepContext>(undefined);

export default function SignUpFlowLayout(){

  const {session} = useContext(SessionContext);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState(new Set<number>())

  const isOptional = (step: number) => {
    switch (step) {
      case 2:
      case 3: 
      case 4:
        return true;
      default: 
        return false
    }
  }

  const isStepSkipped = (step: number): boolean => {
    return skippedSteps.has(step);
  }

  const handleNext = () => {
    let newSkippedSteps = skippedSteps
    if (isStepSkipped(activeStep)) {
      newSkippedSteps = new Set(newSkippedSteps.values());
      newSkippedSteps.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkippedSteps(newSkippedSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkippedSteps((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  if (session) {
    return (
      <StepContext.Provider value={{activeStep: activeStep, setActiveStep: setActiveStep}}>
        <div className="w-screen bg-[#FAFAFA] p-2">
          <Navbar />
          <Outlet />
        </div>
      </StepContext.Provider>
    )
  }

  return <Navigate to="/sign-up"/>
}

