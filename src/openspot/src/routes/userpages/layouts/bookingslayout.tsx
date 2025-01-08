import React from "react";
import { Outlet } from "react-router-dom";
import { UserTopNavSection } from "../components/TopNavSection";

export const BookingsLayout = () => {

  return (
    <div>
      <UserTopNavSection 
        isHome={false} 
        providerName={"Spectrum Entertainment"} 
        providerType={"DJ & MC Services"}
        providerOverallRating={null}
        providerTotalRatings={null}
      />
      <Outlet />
    </div>
  )
}
