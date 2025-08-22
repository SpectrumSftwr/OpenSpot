import React , {createRef, useContext, useEffect, useRef, useState} from "react"
import { StepContext } from "../../layouts/signupflowlayout"
import { ArrowRightIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"
import httpService from "../../services/http.service"
import { HttpStatusCode } from "axios"
import { isValidEmail } from "../../services/uservalidation.service"
import { Tooltip } from "@mui/material"

export const Profile = () => {
  const {activeStep, setActiveStep} = useContext(StepContext)
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState(false);


  // Image Form Elements.
  const [profilePicture, setProfilePicture] = useState(null);
  const [bannerPicture, setBannerPicture] = useState(null);
  
  // Image Preview Elements.
  const [preview, setPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // Image References
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const bannerPictureRef = useRef<HTMLInputElement>(null);


  // Form Elements
  const [username, setUsername] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState("");
  const [description, setDescription] = useState(null);


  useEffect(() => {
    setActiveStep(0)
  },[])

  const STATE_CODE = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", 
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", 
    "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", 
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", 
    "WI", "WY"
  ];

  const handleNavigateToNext = async () => {
    setError(false);
    // Check Username is not taken.
    if (!username) {
      return
    }

    try {
      const businessResults = await httpService.get(`/business/exists/${username}`)
      if (businessResults.status == HttpStatusCode.Conflict) {
        return
      }
    } catch (err) {
      console.error("Business UUID already taken: ", err);
      return;
    }
    
    // Check that all other fields are set and valid.
    if (!email || !isValidEmail(email) || !phone || !city || !state || !description) {
      setFormError(true);
      return;
    }
    
    // Save new Business Details. 
    try {
      const formData = new FormData();

      formData.append('businessUsername', username);
      formData.append('email', email)
      formData.append('phone',phone)
      formData.append('city', city)
      formData.append('state', state)
      formData.append('description', description)
      formData.append('profilePicture', profilePicture)
      formData.append('bannerPicture', bannerPicture)
      formData.append('businessType', businessType)
      formData.append('businessName', businessName)

      const results = await httpService.post('/business', formData);

      if (results.status === HttpStatusCode.InternalServerError) {
        setError(true);
      }

    } catch (err) {
      console.error("Unable to create new Business: ", err);
      return;
    }
    
    // Navigate to /app if success else show something went wrong message.
    //navigate('/app')
  }

  const handleDropOnProfile = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileChange(event)
  };

  const handleDropOnBanner = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleBannerChange(event)
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClickUpload = (event:any) => {
    event.preventDefault();
    profilePictureRef.current.value = null;
    profilePictureRef.current?.click();
  };

  const handleClickUploadBannerPicture = (event:any) => {
    event.preventDefault();
    bannerPictureRef.current.value = null;
    bannerPictureRef.current?.click();
  }

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];

    if (file) {
      setProfilePicture(file);

      // Prepare the users preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setBannerPicture(file);

      // Prepare the users preview
      const reader = new FileReader();

      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }


  return (
    <div className="w-full flex flex-col items-center h-full text-sm">
      <div className="w-full max-w-[1200px]">
        <div className="mt-4 text-gray-600">
          <div className="flex flex-col text-center">
            Welcome, to OpenSpot
            <span className="mt-2 text-gray-400">Lets get you setup!</span>
          </div>
        </div>
        <form className=" mt-4 flex flex-col text-center justify-around w-full items-center">
          <div className="flex flex-col justify-center w-[95%] md:w-2/3 lg:w-2/3 bg-gray-50 border-2 drop-shadow-lg items-center rounded-xl p-4 mb-2">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between w-full p-8 mb-2">
              <div className="mt-4 h-full flex flex-col items-center">
                <div className="flex flex-col justify-center items-center" 
                  id="profile-div"
                  onDragOver={handleDragOver} 
                  onDragLeave={handleDragLeave}
                  onDrop={handleDropOnProfile}
                  onClick={handleClickUpload}
                >
                  <label className="text-gray-500">Business Profile Picture</label>
                  <span 
                    id="profile"
                    className="bg-gray-200 w-28 h-28 text-white rounded-full flex 
                    flex-col justify-center items-center mt-2 drop-shadow-lg">
                    {!preview ?
                      <CloudArrowUpIcon className="w-8 h-8"/>
                      :
                      <img src={preview} alt='preview' 
                        className="rounded-full object-cover h-full w-full border-2 border-gray-200"/>
                    }
                  </span>
                </div>
                <input 
                  type='file' 
                  id="profile-input"
                  accept='image/png, image/jpeg'  
                  className="hidden" 
                  ref={profilePictureRef}
                  onChange={handleFileChange}
                /> 
                <button
                  id="profile-button"
                  className="bg-[#047460] text-white p-2 rounded-xl w-fit flex flex-row items-center justify-center drop-shadow-lg 
                  hover:text-[#047460] hover:bg-[#FAFAFA] m-4 mb-2 text-sm"
                  onClick={handleClickUpload}
                >
                  Upload Profile Picture</button>
                <span className="text-gray-500 text-xs mt-2">Accepts: .JPG, .JPEG & .PNG under 15MB</span>
              </div>
              <div className="flex flex-col mt-2 w-full md:w-3/5 md:ml-4">
                <div className="flex flex-col md:lg:flex-row w-full mt-4">
                  <div className="text-start flex-col flex md:lg:w-1/2 md:lg:pr-4">
                    <label className="text-gray-500 p-1">
                      Business Name
                    </label>
                    <input type='text' placeholder="Enter Email..." className="drop-shadow-lg p-2 rounded-xl"
                      onChange={({target})=> setBusinessName(target.value)}
                    />
                  </div>
                  <div className="text-start flex-col flex md:lg:w-1/2 mt-2 md:lg:mt-0">
                    <div className="flex flex-row p-1">
                      <label className="text-gray-500">
                        Business Type
                      </label>
                      <Tooltip title="DJ, Photographer, Interactive Photobooths, etc.">
                        <QuestionMarkCircleIcon className="w-3 ml-1 stroke-white invert"/>
                      </Tooltip>
                    </div>
                    <input type='text' placeholder="Business Type" className="drop-shadow-lg p-2 rounded-xl"
                      onChange={({target})=> setBusinessType(target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between h-full items-start mt-4">
                  <div className="flex flex-row items-center text-center justify-center mb-2">
                    <label className="text-gray-500 text-start">Business Username 
                    </label>
                    <Tooltip title="This is also going to be used to look you up '.../myspot/@username">
                      <QuestionMarkCircleIcon className="w-3 ml-1 stroke-white invert"/>
                    </Tooltip>
                  </div>
                  <div className="bg-white text-gray-500 drop-shadow-lg p-2 rounded-xl pt-2 text-start w-full">
                    <span className="w-[10%]">
                      @
                    </span>
                    <input type='text' placeholder="username" className="pl-1 w-[90%]" 
                      onChange={({target})=> {setUsername(target.value)}}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:lg:flex-row w-full mt-4">
                  <div className="text-start flex-col flex md:lg:w-1/2 md:lg:pr-4">
                    <label className="text-gray-500 p-1">
                      Business Email
                    </label>
                    <input type='text' placeholder="Enter Email..." className="drop-shadow-lg p-2 rounded-xl"
                      onChange={({target})=> setEmail(target.value)}
                    />
                  </div>
                  <div className="text-start flex-col flex md:lg:w-1/2 mt-2 md:lg:mt-0">
                    <label className="text-gray-500 p-1">
                      Business Phone Number
                    </label>
                    <input type='tel' placeholder="Enter Phone # ..." className="drop-shadow-lg p-2 rounded-xl"
                      onChange={({target})=> {setPhone(target.value)}}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:lg:flex-row justify-between mt-4">
                  <div className="text-start flex-col flex md:lg:w-1/2 md:lg:pr-4 mb-2 w-full">
                    <label className="text-gray-500 p-1">
                      City
                    </label>
                    <input type='text' placeholder="Set your city" className="drop-shadow-lg p-2 rounded-xl"
                      onChange={({target})=> {setCity(target.value)}}
                    />
                  </div>
                  <div className="text-start flex-col flex md:lg:w-1/2">
                    <label className="text-gray-500 p-1">
                      State
                    </label>
                    <select className="drop-shadow-lg p-2 rounded-xl w-42 h-10" value={state} 
                      onChange={({target})=> setState(target.value)}>
                      <option className="text-gray-600" value="">Select Your State</option>
                      {STATE_CODE.map((code, index) => {
                        return (
                          <option className="text-black" key={index} value={code}>{code}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-4 flex flex-col justify-between h-full p-4 w-full border-t-2">
              <div className="flex flex-row justify-between text-gray-500">
                <label className="">Business Description</label>
                <span className="text-xs self-end">{description?.length ?? 0}/256</span>
              </div>
              <div>
                <textarea 
                  placeholder="What should customers expect from you?" 
                  className="resize-none drop-shadow-lg p-2 rounded-xl mt-4 w-full" 
                  rows={7} 
                  maxLength={256} 
                  onChange={({target})=> setDescription(target.value)}
                > 
                </textarea>
              </div>
            </div>
            <div className="m-4 flex flex-col justify-center h-full p-4 w-full border-t-2" id="banner">
              <label className="text-gray-500 text-start">Upload Banner</label>
              <div className="flex flex-col justify-center items-center" 
                  onDragOver={handleDragOver} 
                  onDragLeave={handleDragLeave}
                  onDrop={handleDropOnBanner}
                  onClick={handleClickUploadBannerPicture}
              >
                <span className="bg-gray-200 w-full h-28 text-white rounded-lg flex 
                  flex-col justify-center items-center mt-2 drop-shadow-lg">
                  {
                    !bannerPreview ? 
                    <CloudArrowUpIcon className="w-8 h-8" />
                    :
                      <img src={bannerPreview} alt='banner preview' 
                        className="rounded-lg object-cover h-full w-full border-2 border-gray-200"/>
                  }
                </span>
              </div>
              <input 
                type='file' 
                accept='image/png, image/jpeg'  
                className="hidden" 
                ref={bannerPictureRef}
                onChange={handleBannerChange}
              /> 
              <button
                className="bg-[#047460] text-white p-2 rounded-xl flex flex-row items-center justify-center drop-shadow-lg 
                hover:text-[#047460] hover:bg-[#FAFAFA] m-4 mb-2 text-sm"
                onClick={handleClickUploadBannerPicture}
              >
                Upload Banner Picture</button>
              <span className="text-gray-500 text-xs mt-2">Accepts: .JPG, .JPEG & .PNG under 15MB</span>
            </div>
          </div>
        </form>
      </div>
      <div onClick={() => handleNavigateToNext()} 
        className="bg-[#047460] text-white p-2 rounded-xl max-w-1/3 flex flex-row items-center justify-center drop-shadow-lg 
        hover:text-[#047460] hover:bg-[#FAFAFA] text-sm mt-8 text-nowrap w-fit">
        <button type="submit">
          Complete Business Setup
        </button>
        <ArrowRightIcon className="ml-2 w-4 h-7"/>
      </div>
    </div>
  )
}
