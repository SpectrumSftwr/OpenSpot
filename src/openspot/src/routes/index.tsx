import React from "react"
import httpService from "services/http.service";

const IndexPage = () => { 

  const checkUserAvailable = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const userInput = event.target.value;
    if (!userInput || userInput.length < 6) {
        return;
    }
    console.log(event.target.value);
    const url = `/user/${userInput}`
    try {
      let res = await httpService.get(url)
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-evenly items-center h-screen">  
      <div className="">
        <div className="text-center">
          <div className="text-3xl font-extrabold">
            Your Entertainment Business Optimized!
          </div>
          <div className="text-xl font-normal">
            Unlock the future of Entertainment with smart Automation.
          </div>
          <div className="flex flex-col text-start mt-8 h-10">
            <span className="mr-4">
              Claim your OpenSpot Link Now!
            </span>
            <div className="flex">
              <input className="input-primary" type="text" placeholder="openspot.com/..."  onChange={(val) => checkUserAvailable(val)}/>
              <button type="submit"className="ml-4 w-fit bg-brand-800 text-white font-bold p-2 rounded-full self-center text-center whitespace-nowrap"> 
                Join Now! 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage;
