import React from 'react';
import { 
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton, 
  useAuth
} from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();
  const {userId, isLoaded} = useAuth()

  const handleHomeClick = () => {
    if (isLoaded && !userId) {
      navigate('/')
    }

    navigate('/app/dashboard')
  }

  return (
    <div className='divide-y-2'>
      <div className='flex flex-row justify-between font-bold text-xl p-2'>
        <div className='text-3xl'>
          <span onClick={() => handleHomeClick()}>
            OpenSpot 
          </span>
        </div>
        {/* What to show when signed in*/}
        <div>
          <SignedIn>
            <UserButton/>
          </SignedIn>
          {/* What to show when signed out*/}
          <div className='p-2 divide-x-2 border-2 rounded-lg border-brand-400 divide-brand-800'>
            <SignedOut>
              <Link to={"/sign-up"} className='p-2 pl-2 pr-2 rounded-lg text-lg mr-1'> 
                Sign Up
              </Link>
              <Link to={"/sign-in"} className='p-2 pl-2 pr-2 text-lg'> 
                Login
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
