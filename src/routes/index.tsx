import { ArrowTrendingUpIcon, BookOpenIcon, CreditCardIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import httpService from "../services/http.service";

const IndexPage = () => { 

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [username, setUsername] = useState("");
  const [availableUsername, setAvailableUsername] = useState(true);
  /**
   * Checks if the user is availableUsername
   */
  const checkUserAvailable = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value.toLowerCase();
    if (!userInput || userInput.length < 6) {
      return;
    }

    setEmail(userInput);
    const url = `/MailingList/${userInput}`

    try {
      await httpService.get(url)
    } catch (error) {
      // Ignore err. 
    }
  }

  const navigateToSignUp = () => {
    // Until OpenSpot is Ready just route people to the Survery.
    let url = `https://forms.gle/JeffzqFBMc5ghTCw9`
    window.location.href = url;
  }
  return (
    <div className="flex flex-col justify-center items-center m-4 text-start">
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
        <div className="flex flex-col justify-center items-center mt-12 md:mb-4  lg:mb-4 max-w-lg">
          <img src="/AI_gen_img.webp" className="rounded-lg" alt="AI Generated Displays OpenSpots Solutions"/>
          <span className="text-xs font-light mt-1 text-gray-500">This is an AI Generated Image and not a representation of our Application</span>
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
        <div className="pr-4 pl-4 mt-16 flex flex-col pt-2 pb-2 drop-shadow-lg rounded-lg max-w-sm">
          <div className="flex flex-row border-b-2 p-1">
            <span>
              <BookOpenIcon className="w-7 h-7 font-thin mr-2 stroke-[1.5px]" />
            </span>
            <span className="font-semibold text-lg">
              Get Bookings
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-2 font-light">
              Get bookings fast! 
              Manage availability, confirm reservations, 
              and get instant notifications—effortless booking, no hassle.
          </div>
        </div>
        <div className="pr-2 pl-2 mt-8 max-w-sm">
          <div className="flex flex-row border-b-2 p-1">
            <span>
              <CreditCardIcon className="w-7 h-7 font-thin mr-2 stroke-[1px]" />
            </span>
            <span className="font-semibold">
              Get Paid
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Get paid easily 
            Accept payments seamlessly, track transactions, 
            and ensure on-time payouts—all in one simple platform.
          </div>
        </div>
        <div className="pr-2 pl-2 mt-8 max-w-sm">
          <div className="flex flex-row border-b-2 p-1">
            <span>
              <ArrowTrendingUpIcon className="w-7 h-7 font-thin mr-2 stroke-[1px]" />
            </span>
            <span className="font-semibold">
              Generate Leads 
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Generate leads with OpenSpot! 
            Attract new clients, capture inquiries, and turn interest into bookings 
            effortlessly—all in one place.
          </div>
        </div>
      </div>
    </div>
  )

  //return (
  //  <div className="flex flex-col justify-between items-center w-full h-screen">  
  //    <div></div>
  //    {/*Main Content Area*/}
  //    <div className="flex flex-row w-3/4 justify-between p-4">
  //      <div className="flex flex-col p-4">
  //        <div className="font-bold text-6xl whitespace-normal mr-8">
  //          Unlock More Bookings and Faster Payouts with OpenSpot
  //        </div>
  //        <div className="font-thin whitespace-normal w-2/3 mt-8 flex flex-col text-gray-700">
  //          With OpenSpot, easily manage your business needs while keeping your schedule empty.
  //          <br/>
  //          Focus on what you do best and let OpenSpot handle the rest.
  //        </div>
  //        <form onSubmit={()=> navigateToSignUp()} className="flex flex-row justify-center mt-8 items-center w-2/3">
  //          <input 
  //            className={!availableUsername ? "input-primary border-red-500": "input-primary"}
  //            type="text" 
  //            id="username"
  //            placeholder="Leave your Email to stay up to date!"  
  //            onChange={(e) => setEmail(e.target.value)}
  //          />
  //          <button type="submit"
  //            className={`ml-4 w-fit bg-brand-800 text-white font-bold p-2 rounded-lg self-center text-center whitespace-nowrap
  //                      ${!availableUsername && "bg-red-500"} ${!validUsername && 'bg-gray-400'}`}
  //          >
  //            Be The First To Know
  //          </button>
  //        </form>
  //      </div>
  //      <div className="flex flex-col justify-center items-center w-2/3">
  //        <img src="/AI_gen_img.webp" className="rounded-lg" alt="Displays OpenSpots UI"/>
  //      </div>
  //    </div>
  //    {/* Feature Area*/}
  //    <div className="flex flex-row w-2/3 justify-between p-1">
  //      <div className="w-1/4 pr-2 pl-2">
  //        <div className="flex flex-row text-center items-center">
  //          <span>
  //            <BookOpenIcon className="w-7 h-7 font-thin mr-2 stroke-[1px]" />
  //          </span>
  //          <span className="font-semibold">
  //            Get Bookings
  //          </span>
  //        </div>
  //        <div className="text-sm text-gray-500 mt-2">
  //            Get bookings fast! 
  //            Manage availability, confirm reservations, 
  //            and get instant notifications—effortless booking, no hassle.
  //        </div>
  //      </div>
  //      <div className="w-1/4 pl-2">
  //        <div className="flex flex-row text-center items-center">
  //          <span>
  //            <CreditCardIcon className="w-7 h-7 font-thin mr-2 stroke-[1px]" />
  //          </span>
  //          <span className="font-semibold">
  //            Get Paid
  //          </span>
  //        </div>
  //        <div className="text-sm text-gray-500 mt-2">
  //          Get paid easily 
  //          Accept payments seamlessly, track transactions, 
  //          and ensure on-time payouts—all in one simple platform.
  //        </div>
  //      </div>
  //      <div className="w-1/4 pr-2">
  //        <div className="flex flex-row text-center items-center">
  //          <span>
  //            <ArrowTrendingUpIcon className="w-7 h-7 font-thin mr-2 stroke-[1px]" />
  //          </span>
  //          <span className="font-semibold">
  //            Generate Leads 
  //          </span>
  //        </div>
  //        <div className="text-sm text-gray-500 mt-2">
  //          Generate leads with OpenSpot! 
  //          Attract new clients, capture inquiries, and turn interest into bookings 
  //          effortlessly—all in one place.
  //        </div>
  //      </div>
  //    </div>
  //    {/* Feature Area*/}
  //    <div>
  //    </div>

  //  </div>
  //)
}

export default IndexPage;
