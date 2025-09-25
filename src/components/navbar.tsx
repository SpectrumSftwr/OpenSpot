import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../App';
import { closeAuthorizationSession } from '../services/session.service';

export default function Navbar() {

  const {session, setSession} = useContext(SessionContext);
  const naviagate = useNavigate();

  const handleNavigateToHome = () => {
    if (session) {
      naviagate('/app')
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
      <div className='flex flex-row font-bold p-4 items-center justify-between w-full h-1/12 text-sm top-0'>
        <div>
          <img src='/OpenSpot.png' alt='Open Spot Logo' className='h-12 mr-10 self-center' onClick={() => handleNavigateToHome()}/>
        </div>
        {/* What to show when signed in*/}
        { session ?
            <div>
              {/* What to show when signed in */}
              <div className='flex flex-row'>
                <div className='rounded-full mr-4'>
                  <button onClick={() => handleLogout()}>Logout</button>
                </div>
              </div>
            </div>
          :
        <div>
          {/* What to show when signed out*/}
          <div className='p-2 divide-x-2 border-1 rounded-lg border-brand-400 divide-gray-300 text-gray-500'>
            <Link to={"/sign-up"} className='p-2 pl-2 pr-2 mr-1 hover:text-black'> 
              Sign Up
            </Link>
            <Link to={"/sign-in"} className='p-2 pl-2 pr-2 hover:text-black'> 
              Login
            </Link>
          </div>
        </div>
        }
      </div>
  )
}
