import React from 'react';

import { 
  ClerkProvider, 
} from '@clerk/clerk-react';
import { 
  Outlet, 
  useNavigate 
} from 'react-router-dom';

import Navbar from '../components/navbar';

export default function RootLayout() {

  const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_SECRET;
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }

  const navigate = useNavigate();

  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, {replace: true})}
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
      signInFallbackRedirectUrl='/app/dashboard'
      signUpFallbackRedirectUrl='/app/welcome'
    >
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
