import { useUser } from "@clerk/clerk-react"
import React, { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import httpService from "services/http.service";


export default function Welcome() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [invalidStateForm, setInvalidStateForm] = useState(false);
  const {isSignedIn, user, isLoaded} = useUser();

  useEffect(() => {
    if (isLoaded && (!isSignedIn || !user)) {
      navigate('/')
    }

    var username = user.username.charAt(0).toUpperCase()  + user.username.slice(1);
    setUsername(username);

  }, [isLoaded, user]);

  const createRequest = (formvalues : any) : any => {
    const request = {
      firstName: formvalues[0].value,
      lastName: formvalues[1].value,
      address: {
        line1: formvalues[2].value,
        line2: formvalues[3].value,
        city: formvalues[4].value,
        state: formvalues[5].value,
        zipcode: formvalues[6].value,
      }
    }

    if (Object.values(request).every(item => item) && Object.values(request.address).every(item => item)) {
      setInvalidStateForm(false)
      return request;
    }

    setInvalidStateForm(true);
  }

  /**
    * Submit the form. this method will return a redirection url for where the user should go next.
    */
  const submitFormAndRedirect = async (event: FormEvent) => {
    event?.preventDefault()
    const request = createRequest(event.target);
    if (!request) {
      return;
    } 

    // create post request to backend api
    const res = await httpService.post('/user', request);

    // With backend respones redirect user to the given url.
    console.log(res);
  }


  return ( 
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col bg-brand-50 h-3/4 w-1/3 justify-center items-center">
        <div className="flex flex-col justify-center items-center p-2 rounded-full">
          <img className="w-28 h-28 rounded-full" src={user?.imageUrl} alt='Profile Image' />
          <span className="font-extrabold text-3xl mt-2">
            Welcome, {username}!
          </span>
        </div>
        <div className="text-lg font-normal">
          Lets get you started earning Money!
        </div>
        { invalidStateForm ?
          <span>Error please make sure all form items have been filled out.</span>
          : null

        }
        <form className="flex flex-col justify-center w-full h-fit" onSubmit={(event) => submitFormAndRedirect(event)} >
          <div className="mt-4 flex flex-col justify-center items-center self-center w-2/3"> 
            <span className="font-extrabold text-2xl self-start ml-6">Name</span>
            <div className="flex flex-row w-fit mt-1 items-center">
              <label className="font-semibold"> First Name </label>
              <input type='text' className="input-primary w-56 ml-4" placeholder="First"/>
            </div>
            <div className="flex flex-row w-fit mt-1 items-center">
              <label className="font-semibold">Last Name</label>
              <input type='text' className="input-primary w-56 ml-4" placeholder="Last"/>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center items-center self-center w-2/3"> 
            <span className="font-extrabold text-2xl self-start ml-6">Address</span>
            <div className="flex flex-row w-fit mt-1 items-center justify-self-stretch">
              <label className='font-semibold'>Line 1</label>
              <input type='text' className="input-primary w-56 ml-4" placeholder="Line 1"/>
            </div>
            <div className="flex flex-row w-fit mt-1 items-center">
              <label className="font-semibold">Line 2</label>
              <input type='text' className="input-primary w-56 ml-4" placeholder="Line 2"/>
            </div>
            <div className="flex flex-row w-fit mt-1 items-center">
              <label className="font-semibold">City</label>
              <input type='text' className="input-primary w-56 ml-4" placeholder="City"/>
            </div>
            <div className="flex flex-row w-fit mt-1 items-center">
              <label className="font-semibold">State</label>
              <input type='text' className="input-primary w-56 ml-4" placeholder="State"/>
            </div>
            <div className="flex flex-row w-fit mt-1 items-center">
              <label className="font-semibold">ZipCode</label>
              <input type='text' className="input-primary w-56 ml-4" placeholder="ZipCode"/>
            </div>
          </div>
          <button type="submit"className="bg-brand-800 text-white font-bold text-xl p-2 rounded-full mt-16 w-1/5 self-center"> 
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
