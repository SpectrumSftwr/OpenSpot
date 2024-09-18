import React, {useState, createContext} from "react";
import { isActiveSession } from "services/session.service";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IndexPage from './routes';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';

// Import layouts
import RootLayout from './layouts/rootlayout';
import InternalLayout from './layouts/internallayout';
import Welcome from 'routes/internalroutes/welcome';
import User from 'routes/internalroutes/User';

export const SessionContext = createContext({});

export function App(){
  const [session, setSession] = useState(isActiveSession());

  // Create the browser router.
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { path: '/', element: <IndexPage /> },
          { path: '/sign-in/*', element: <SignInPage /> },
          { path: '/sign-up/*', element: <SignUpPage /> },
          { path: '/app', 
            element: <InternalLayout/>,
            children: [
              {path: '/app/welcome', element: <Welcome />},
              {path: '/app/studio', element: <Welcome />},
            ],
          },
        ],
      },
      { path: '/myspot/:user', 
        element: <User /> 
      },
    ]
  );


  return (
    <SessionContext.Provider value={{session, setSession}}>
      <RouterProvider router={router} />
    </SessionContext.Provider> 
  )

}
