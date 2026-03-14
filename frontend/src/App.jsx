import { useEffect, useState } from 'react'
import './App.css'
import { LoginPage } from "./components/LoginPage"
import { WeatherDashboard } from "./components/WeatherDashboard"
import { useAuth0 } from "@auth0/auth0-react"

import { VerifyOTP } from "./components/EmailVerification"


export default function App(){

  const { isAuthenticated, isLoading } = useAuth0()

  if(isLoading){
    return <div className="text-center py-10">Loading...</div>
  }

  if(!isAuthenticated && window.location.pathname !== "/verify-otp"){
    return <LoginPage/>
  }

  if(window.location.pathname === "/verify-otp"){
    return <VerifyOTP/>
  }

  return <WeatherDashboard/>

}

