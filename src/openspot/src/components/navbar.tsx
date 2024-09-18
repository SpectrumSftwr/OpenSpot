import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from 'App';
import { closeAuthorizationSession } from 'services/session.service';


export default function Navbar() {

  const {session, setSession} = useContext(SessionContext);
  const naviagate = useNavigate();

  const handleLogout = () => {
    closeAuthorizationSession();
    setSession(() => false);
    naviagate('/')
  }

  return (
    <div className='divide-y-2'>
      <div className='flex flex-row justify-between font-bold text-xl p-2'>
        <div className='text-3xl'>
          <span>
            OpenSpot 
          </span>
        </div>
        {/* What to show when signed in*/}
        {
          session ?
            <div>
              {/* What to show when signed out*/}
              <button onClick={() => handleLogout()}>Logout</button>
            </div>
          :
            <div>
              {/* What to show when signed out*/}
              <div className='p-2 divide-x-2 border-2 rounded-lg border-brand-400 divide-brand-800'>
                <Link to={"/sign-up"} className='p-2 pl-2 pr-2 rounded-lg text-lg mr-1'> 
                  Sign Up
                </Link>
                <Link to={"/sign-in"} className='p-2 pl-2 pr-2 text-lg'> 
                  Login
                </Link>
              </div>
            </div>
        }
      </div>
    </div>
  )
}
