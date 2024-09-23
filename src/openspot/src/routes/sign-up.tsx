import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpService from 'services/http.service';
import { SessionContext } from 'App';

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

  const navigate = useNavigate();

  /** 
    * Checks the current state of the form and returns if its valid.
    * If any parts are invalid the section will be flagged.
    */  
  const validateFormState = () : boolean =>  {
    const usernameValid = !!username && username.length > 5;
    // TOOD: Write a helper class that will check passwords on FE before sending.
    const passwordValid = password == confirmPassword && password.length > 7;
    // TOOD: Write a helper class that will check Emails on FE before sending.
    const emailValid = true;
    const namesValid = !!firstName && !!lastName;

    return usernameValid && passwordValid && emailValid && namesValid;
  }

  const SignUp = async () => {
    //Validate User Input Info.
    if (!validateFormState()) {
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
        console.log(response)
        if (response.status == 201) {
          localStorage.setItem("authorizationToken", response.data.jwtToken);
          setSession(() => true)
          navigate('/app/studio')
        }
      }).catch((e) => setError(true));
  }


  return (
    <div className='flex flex-col justify-center items-center h-screen w-full pb-16 text-center text-2x bg-[#F5F5F5]l'>
      <div className='w-1/2 border-solid border-gray-300 border-2 drop-shadow-lg rounded-2xl p-4'>
        <div className='mt-4'>
          <div className='flex justify-center'>
            <img src='/OpenSpot.png' alt='Open Spot Logo' className='h-32'/>
          </div>
          <div className='text-lg text-gray-500 mt-4'>
            Create your OpenSpot Account Today!
          </div>
          {
            error && 
              <div className='text-red-600'>
                Something went wrong please try again...
              </div>
          }
        </div>
        <div className='flex justify-center items-center'>
          <form className='flex flex-col text-xl w-2/4' onSubmit={(event) => event?.preventDefault()}>
            <div className='flex flex-col mb-10 mt-8'>
              <label className='text-gray-600 self-start mb-2' >Username</label>
              <input onChange={(e) => setUsername(e.target.value)} value={username}
                className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>
            <div className='flex flex-col mb-10'>
              <label className='text-gray-600 self-start mb-2'>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email}
                className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text" autoComplete='email'/>
            </div>
            <div className='flex flex-col mb-10'>
              <label className='text-gray-600 self-start mb-2'>Password</label>
              <input  onChange={(e) => setPassword(e.target.value)} value={password}
                className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="password" autoComplete='new-password'/>
            </div>
            <div className='flex flex-col mb-10'>
              <label className='text-gray-600 self-start mb-1'>Confirm Password</label>
              <input  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="password" autoComplete='new-password'/>
            </div>
            <div className='flex flex-col mb-10'>
              <label className='text-gray-600 self-start mb-2'>First Name</label>
              <input  onChange={(e) => setFirstName(e.target.value)} value={firstName}
                className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>
            <div className='flex flex-col mb-10'>
              <label className='text-gray-600 self-start mb-2'>Last Name</label>
              <input  onChange={(e) => setLastName(e.target.value)} value={lastName}
                className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>

            <button className='font-bold bg-brand-green mt-4 p-4 text-xl text-white self-center rounded-xl drop-shadow-lg mb-4'
              onClick={() => SignUp()}>
              <span className='pl-4 pr-4'>Create your OpenSpot</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
