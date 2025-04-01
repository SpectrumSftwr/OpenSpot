import { ArrowTrendingUpIcon, BookOpenIcon, CreditCardIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import React from "react"

const IndexPage = () => { 

  const navigateToSignUp = () => {
    // Until OpenSpot is Ready just route people to the Survery.
    let url = `https://forms.gle/JeffzqFBMc5ghTCw9`
    window.location.href = url;
  }

  return (
    <div className="flex flex-col justify-center items-center m-4 text-start min-h-[calc(100vh-25px)]">

      <div className="mr-2 ml-2 flex flex-col md:flex-row lg:flex-row justify-around w-full items-center">
        <div className="flex flex-col max-w-lg mt-4">
          <div className="text-3xl text-gray-800 font-extrabold border-b-2 border-gray-300 pb-2">
            Unlock More Bookings and Faster Payouts with OpenSpot
          </div>
          <div className="text-gray-600 font-extralight mt-2">
            With OpenSpot, easily manage your business needs while keeping your schedule empty.
            Focus on what you do best and let OpenSpot handle the rest.
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-8 md:mb-4  lg:mb-4 max-w-lg text-center">
          <img src="/AI_gen_img.webp" className="rounded-lg p-1" alt="AI Generated Displays OpenSpots Solutions"/>
          <span className="text-xs font-light mt-1 text-gray-500">
            AI Generated Image and not a representation of our Application.
          </span>
        </div>
      </div>
      {/**
      <form className="flex flex-row mt-8 self-center w-full max-w-xl">
        <input 
          className={`${!availableUsername ? "input-primary border-red-500": "input-primary"} bg-white`}
          type="text" 
          id="username"
          placeholder="Leave your Email.."  
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
        */}
      {/* Feature Area*/}
      <div className="flex flex-col items-center p-1 w-full md:flex-row lg:flex-row md:justify-center lg:justify-center">
        <div className="pr-4 pl-4 mt-12 flex flex-col pt-2 pb-2 drop-shadow-lg rounded-lg max-w-sm">
          <div className="flex flex-row border-b-2 p-1">
            <span>
              <BookOpenIcon className="w-7 h-7 font-thin mr-2 stroke-[1.5px]" />
            </span>
            <span className="font-semibold text-lg mb-2">
              Get Bookings
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-4 font-light">
              Get bookings fast! 
              Manage availability, confirm reservations, 
              and get instant notifications—effortless booking, no hassle.
          </div>
        </div>
        <div className="pr-2 pl-2 mt-10 max-w-sm">
          <div className="flex flex-row border-b-2 p-1">
            <span>
              <CreditCardIcon className="w-7 h-7 font-thin mr-2 stroke-[1px]" />
            </span>
            <span className="font-semibold mb-2">
              Get Paid
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-4">
            Get paid easily 
            Accept payments seamlessly, track transactions, 
            and ensure on-time payouts—all in one simple platform.
          </div>
        </div>
        <div className="pr-2 pl-2 mt-10 max-w-sm">
          <div className="flex flex-row border-b-2 p-1">
            <span>
              <ArrowTrendingUpIcon className="w-7 h-7 font-thin mr-2 stroke-[1px]" />
            </span>
            <span className="font-semibold mb-2">
              Generate Leads 
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-4">
            Generate leads with OpenSpot! 
            Attract new clients, capture inquiries, and turn interest into bookings 
            effortlessly—all in one place.
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage;
