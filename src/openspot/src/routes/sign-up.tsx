import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpService from '../services/http.service';
import { SessionContext } from '../App';
import { isValidEmail, isValidPassword, isValidUsername } from '../services/uservalidation.service';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const urlSearchString = window.location.search;
  const params = new URLSearchParams(urlSearchString)

  const {session, setSession} = useContext(SessionContext);

  const [error, setError] = useState(false);

  // Form item state
  const usernameParam = params.get('username') != undefined ? params.get('username') : "";
  const [username, setUsername] = useState(usernameParam);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Error UI dipslays
  const [showUsernameError, setShowUsernameError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);

  const navigate = useNavigate();

  /** 
    * Checks the current state of the form and returns if its valid.
    * If any parts are invalid the section will be flagged.
    */  
  const validateFormState = async () : Promise<boolean> =>  {
    const usernameValid = await isValidUsername(username);

    const passwordDetails = isValidPassword(password, confirmPassword);
    const passwordValid = passwordDetails.valid;
    const emailValid = isValidEmail(email);
    const namesValid = !!firstName && !!lastName;

    // If any of these are false we will see the ui update as weel as the post request to create a new accoutn will be blocked.
    setShowEmailError(() => !emailValid);
    setShowPasswordError(() => !passwordValid);
    setShowUsernameError(() => !usernameValid)

    return !!usernameValid && !!passwordValid && !!emailValid && !!namesValid;
  }

  const SignUp = async () => {
    // Reset all errors 
    setError(() => false)
    setShowUsernameError(() => false)
    setShowEmailError(() => false)
    setShowPasswordError(() => false)
    
    //Validate User Input Info.
    const isValidState = await validateFormState();

    if (!isValidState) {
      return;
    }

    // Create the user
    const newUser = { 
      username: username, 
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName, 
      payed: false 
    }

    // Store the jwt in session 
    await httpService.post('/auth/signup', newUser)
      .then((response) => {
        if (response.status == 201) {
          localStorage.setItem("authorizationToken", response.data.jwtToken);
          setSession(() => true)
          navigate('/signup/theme')
        }
      }).catch(() => setError(true));
  }


  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-10px)] w-full text-center text-xl bg-[#F5F5F5]'>
      <div className='w-[40%] border-solid border-gray-300 border-2 drop-shadow-lg rounded-2xl p-2 h-fit bg-white'>
        <div>
          <div className='flex justify-center mt-4'>
            <img src='/OpenSpot.png' alt='Open Spot Logo' className='h-20'/>
          </div>
          <div className='text-gray-500 mt-2'>
            Create your OpenSpot Account Today!
          </div>
          <div className='text-gray-500 text-sm mb-2'>
            Or <Link to={'/schedulecalltoday'} className='text-blue-600 underline'>schedule</Link> a quick 15 minute call for help.
          </div>
          <div className='mt-4'>
            {
              error && 
                <div className='text-red-600 font-extrabold'>
                  Check details and try again later...
                </div>
            }
            {
              showUsernameError && 
                <div className='text-red-600 font-extrabold'>
                  Username taken or Invalid
                </div>
            }
            {
              showPasswordError && 
                <div className='text-red-600 font-extrabold'>
                  Password invalid... 
                </div>
            }
            {
              showEmailError && 
                <div className='text-red-600 font-extrabold'>
                  Email invalid...
                </div>
            }
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <form className='flex flex-col w-3/4 p-4' onSubmit={(event) => event?.preventDefault()}>
            <div className='flex flex-col mb-10 mt-8 h-1/8'>
              <label className='text-gray-500 self-start mb-2 font-semibold'>
                Username
              </label>
              <input onChange={(e) => setUsername(e.target.value)} value={username}
                className='rounded-xl border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>
            <div className='flex flex-col mb-8 h-1/8'>
              <label className='text-gray-500 self-start mb-2 font-semibold'>
                Email
              </label>
              <input onChange={(e) => setEmail(e.target.value)} value={email}
                className='rounded-xl border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>
            <div className='flex flex-col mb-8 h-1/8'>
              <label className='text-gray-500 self-start mb-2 font-semibold'>
                Password
              </label>
              <input  onChange={(e) => setPassword(e.target.value)} value={password}
                className='rounded-xl border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="password" autoComplete='new-password'/>
            </div>
            <div className='flex flex-col mb-8 h-1/8'>
              <label className='text-gray-500 self-start mb-2 font-semibold'>
                Confirm Password
              </label>
              <input  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                className='rounded-xl border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="password" autoComplete='new-password'/>
            </div>
            <div className='flex flex-col mb-8 h-1/8'>
              <label className='text-gray-500 self-start mb-2 font-semibold'>
                First Name
              </label>
              <input  onChange={(e) => setFirstName(e.target.value)} value={firstName}
                className='rounded-xl border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>
            <div className='flex flex-col mb-8 h-1/8'>
              <label className='text-gray-500 self-start mb-2 font-semibold'>
                Last Name
              </label>
              <input  onChange={(e) => setLastName(e.target.value)} value={lastName}
                className='rounded-xl border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>

            <button className='font-bold bg-brand-green mt-4 pt-4 pb-4 pl-2 pr-2 text-lg text-white self-center rounded-2xl drop-shadow-lg mb-4'
              onClick={() => SignUp()}>
              <span className='pl-4 pr-4'>Create your OpenSpot</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
