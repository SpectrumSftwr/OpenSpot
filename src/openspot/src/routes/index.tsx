import { ArrowTrendingUpIcon, BookOpenIcon, CreditCardIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import httpService from "../services/http.service";

const IndexPage = () => { 

  const navigate = useNavigate();
  const [availableUsername, setAvailableUsername] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  /**
   * Checks if the user is availableUsername
   */
  const checkUserAvailable = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value.toLowerCase();
    if (!userInput || userInput.length < 6) {

        setAvailableUsername(true);
        setValidUsername(false);
        return;
    }

    setValidUsername(true);
    setUsername(userInput);
    const url = `/user/exists/${userInput}`

    try {
      let res = await httpService.get(url)
      if (res && res.data ) {
        setAvailableUsername(!res.data.exists)
        return;
      }

      setAvailableUsername(false);
      return;

    } catch (error) {
      // Ignore err. 
    }

  }

  const navigateToSignUp = () => {
    // Until OpenSpot is Ready just route people to the Survery.
    let url = `https://docs.google.com/forms/d/e/1FAIpQLSfZh6_af3aFrWK7SWhNrE8ZG82TW48QspPcwbAC1z1cZfnCJQ/viewform?usp=pp_url&entry.2065356908=${email}&entry.590981021=${email}`
    window.location.href = url;


    // Validate Username meets requirements.
    //if (!username || username.length < 6 || !availableUsername)  {
    //  return;
    //}
    //
    //// navigate user to signup page with username set.
    ////navigate(`/sign-up?username=${username}`)

  }

  return (
    <div className="flex flex-col justify-between items-center w-full h-screen">  
      <div></div>
      {/*Main Content Area*/}
      <div className="flex flex-row w-3/4 justify-between p-4">
        <div className="flex flex-col p-4">
          <div className="font-bold text-6xl whitespace-normal mr-8">
            Unlock More Bookings and Faster Payouts with OpenSpot
          </div>
          <div className="font-thin text-xl whitespace-normal w-2/3 mt-8">
            With OpenSpot, easily manage your business needs while keeping your schedule empty
            Focus on what you do best and let OpenSpot handle the rest.
          </div>
          <form onSubmit={()=> navigateToSignUp()} className="flex flex-row justify-center mt-8 items-center w-2/3">
            <input 
              className={!availableUsername ? "input-primary border-red-500": "input-primary"}
              type="text" 
              id="username"
              placeholder="Leave your Email to stay up to date!"  
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit"
              className={`ml-4 w-fit bg-brand-800 text-white font-bold p-2 rounded-lg self-center text-center whitespace-nowrap
                        ${!availableUsername && "bg-red-500"} ${!validUsername && 'bg-gray-400'}`}
            >
              Sign Up!
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center w-2/3">
          <img src="/AI_gen_img.webp" className="rounded-lg" alt="Displays OpenSpots UI"/>
        </div>
      </div>
      {/* Feature Area*/}
      <div className="flex flex-row w-2/3 justify-between p-4">
        <div className="w-1/4 pr-2 pl-2">
          <div className="flex flex-row text-center items-center">
            <span>
              <BookOpenIcon className="w-7 h-7 font-thin mr-2 stroke-[1px]" />
            </span>
            <span className="font-semibold">
              Get Bookings
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-2">
              Get bookings fast! 
              Manage availability, confirm reservations, 
              and get instant notifications—effortless booking, no hassle.
          </div>
        </div>
        <div className="w-1/4 pl-2">
          <div className="flex flex-row text-center items-center">
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
        <div className="w-1/4 pr-2">
          <div className="flex flex-row text-center items-center">
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
      {/* Feature Area*/}
      <div>
      </div>

    </div>
  )
}

export default IndexPage;
