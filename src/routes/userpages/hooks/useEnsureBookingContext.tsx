import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookingContext } from "../layouts/bookingslayout";

export const useEnsureBookingContext = (stepNumber: number) => {
  const bookingContext = useContext(BookingContext);
  const navigate = useNavigate();
  const {user} = useParams();

  const [currentStep, _setCurrentStep] = bookingContext.currentStep;

  useEffect(() => {
    if (currentStep !== stepNumber) {
      navigate(`/myspot/${user}`, { replace: true });
    }
  });
};

