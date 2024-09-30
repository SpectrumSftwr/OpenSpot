import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../App';
import { closeAuthorizationSession } from '../services/session.service';

export default function Navbar() {

  const {session, setSession} = useContext(SessionContext);
  const naviagate = useNavigate();

  const handleSaveState = () => {
    console.log("TODO: Saving...")
  }

  const handleNavigateToHome = () => {
    if (session) {
      naviagate('/app/studio')
      return;
    }

    naviagate('/')
    return;
  }

  const handleLogout = () => {
    closeAuthorizationSession();
    setSession(() => false);
    naviagate('/')
  }

  return (
      <div className='flex flex-row justify-between font-bold text-xl p-6 
        border-[#C3C3C3] border-b-2 items-center h-16 bg-white'>
        <div>
          <img src='/OpenSpot.png' alt='Open Spot Logo' className='h-12 ml-10' onClick={() => handleNavigateToHome()}/>
        </div>
        {/* What to show when signed in*/}
        {
          session ?
            <div>
              {/* What to show when signed in */}
              <div className='flex flex-row'>
                <div className='rounded-full ml-12'>
                  <button onClick={() => handleLogout()}>Logout</button>
                </div>
              </div>
            </div>
          :
            <div>
              {/* What to show when signed out*/}
              <div className='p-2 divide-x-4 border-1 rounded-lg border-brand-400 divide-gray-300 text-gray-500'>
                <Link to={"/sign-up"} className='p-2 pl-2 pr-2 rounded-lg text-lg mr-1 hover:text-black'> 
                  Sign Up
                </Link>
                <Link to={"/sign-in"} className='p-2 pl-2 pr-2 text-lg hover:text-black'> 
                  Login
                </Link>
              </div>
            </div>
        }
      </div>
  )
}
