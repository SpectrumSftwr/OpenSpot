import { SessionContext } from '../App';
import React , {useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpService from '../services/http.service';

export default function SignIn() {

  const {session, setSession} = useContext(SessionContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [unauthorized , setUnauthorized] =  useState(false)
  const [error, setError] =  useState(false)

  const navigate = useNavigate();

  const SignIn = async () => {

    // Create the user
    const user = { 
      username: username, 
      password: password,
    }

    // Store the jwt in session 
    await httpService.post('/auth/login', user)
    .then((response) => {
      localStorage.setItem("authorizationToken", response.data.jwtToken);
      setSession(() => true)
      navigate('/app/studio')
    }).catch((e) => {
      if (e.response && e.response.status == 401) {
        setUnauthorized(true);
        setError(false)
      } else {
        setUnauthorized(false);
        setError(true)
      }
    });
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full pb-16 text-center text-2xl bg-[#F5F5F5] '>
      <div className='w-1/2 border-solid border-gray-300 border-2 drop-shadow-lg rounded-2xl p-4 bg-white'>
        <div className='mt-4'>
          <div className='flex justify-center'>
            <img src='/OpenSpot.png' alt='Open Spot Logo' className='h-32'/>
          </div>
          <div className='text-lg text-gray-500 mt-4'>
            Login to your OpenSpot
          </div>
          {
            unauthorized && 
              <div className='text-red-600 mt-2'>
                Username or Password is Incorrect...
              </div>
          }
          {
            error && 
              <div className='text-red-600 mt-2'>
                Something went wrong please try again...
              </div>
          }
        </div>
        <div className='flex justify-center items-center'>
          <form className='flex flex-col text-xl w-2/4' onSubmit={(event) => event?.preventDefault()}>
            <div className='flex flex-col mb-10 mt-8'>
              <label className='text-gray-600 self-start mb-2' >Username</label>
              <input onChange={e => setUsername(e.target.value)} value={username}
                className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>
            <div className='flex flex-col mb-10'>
              <label className='text-gray-600 self-start mb-2'>Password</label>
              <input  onChange={(e) => setPassword(e.target.value)} value={password}
                className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="password"/>
            </div>
            <button className='font-bold bg-brand-green mt-4 p-4 text-xl text-white self-center rounded-xl drop-shadow-lg mb-4'
              onClick={() => SignIn()}>
              <span className='pl-4 pr-4'>Login To OpenSpot</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
