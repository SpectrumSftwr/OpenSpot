import React from "react"
import { Navigate } from "react-router-dom";
import { getSession } from "services/session.service"
export default function Welcome() {
  const authToken = getSession();

  if (!authToken) {
     return <Navigate to='/'/>
  }
  return (
    <div>Hello Mundo {authToken}</div>
  )
}
