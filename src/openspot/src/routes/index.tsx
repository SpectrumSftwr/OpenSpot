import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import httpService from "services/http.service";

const IndexPage = () => { 

  const navigate = useNavigate();
  const [availableUsername, setAvailableUsername] = useState(true);
  const [validUsername, setValidUsername] = useState(false);
  const [username, setUsername] = useState("");

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
    // Validate Username meets requirements.
    if (!username || username.length < 6 || !availableUsername)  {
      return;
    }
    
    // navigate user to signup page with username set.
    navigate(`/sign-up?username=${username}`)
    
  }

  return (
    <div className="flex flex-col justify-evenly items-center h-screen">  
      <div className="">
        <div className="text-center">
          <div className="text-3xl font-extrabold">
            Your Business Optimized!
          </div>
          <div className="text-xl font-normal">
            Unlock freedom when harnessing the power smart Automation.
          </div>
          <div className="flex flex-col text-start mt-8 h-10">
            <span className="mr-4">
              Claim your OpenSpot Link Now!
            </span>
            { !availableUsername ?
              <span className="self-end">Username already taken.</span>
              : null}
            <form onSubmit={()=> navigateToSignUp()} className="flex">
              <input 
                className={!availableUsername ? "input-primary border-red-500": "input-primary"}
                type="text" 
                id="username"
                placeholder="openspot.com/..."  
                onChange={(val) => checkUserAvailable(val)}
              />
              <button type="submit"
                className={`ml-4 w-fit bg-brand-800 text-white font-bold p-2 rounded-full self-center text-center whitespace-nowrap
                          ${!availableUsername && "bg-red-500"} ${!validUsername && 'bg-gray-400'}`}
              >
                Join Now!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage;
