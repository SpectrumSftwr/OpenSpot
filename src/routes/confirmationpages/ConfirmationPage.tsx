import React from "react";
import { useParams } from "react-router-dom";

export const ConfirmationPage = () => {

  const {confNum} = useParams();

  return (
    <div>
      Hello To Confirmation Page. {confNum}
    </div>
  )
}
