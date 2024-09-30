import { SessionContext } from "../App";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [
  "Choose Your Theme",
  "Setup Your Links",
  "Add Your Services and Pricing",
  "Get Paid Today"
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
      case 1:
      case 2: 
      case 3:
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
        <div className="w-screen h-screen bg-[#FAFAFA]" >
          <Navbar />
          <div className="flex flex-row justify-center mt-8">
            <div className="w-3/5">
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
          </div>
          <Outlet />
        </div>
      </StepContext.Provider>
    )
  }

  return <Navigate to="/sign-up"/>
}

