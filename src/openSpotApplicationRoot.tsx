import React from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import {reduxStore} from "./store";

export default function OpenSpotApplicationRoot() { 
  return (
    <Provider store={reduxStore}>
      <Outlet/>
    </Provider>
  )
}
