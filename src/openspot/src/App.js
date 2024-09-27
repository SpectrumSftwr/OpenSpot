import React, {useState, createContext} from "react";
import { isActiveSession } from "./services/session.service";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IndexPage from './routes';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';

// Import layouts
import RootLayout from './layouts/rootlayout';
import InternalLayout from './layouts/internallayout';
import User from './routes/internalroutes/User';
import {CreativeStudio} from "./routes/internalroutes/CreativeStudio";
import Offerings from "./routes/internalroutes/Offerings";
import Automations from "./routes/internalroutes/Automations";
import Analytics from "./routes/internalroutes/Analytics";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SignUpFlowLayout from "./layouts/signupflowlayout";
import { Theme } from "./routes/signup-pages/theme";
import { Links } from "./routes/signup-pages/links";
import { StripeSetup } from "./routes/signup-pages/stripe";
import { ServicesSetup } from "./routes/signup-pages/services";


export const SessionContext = createContext();

export const App = () => {
  const [session, setSession] = useState(isActiveSession());

  // Create the browser router.
  const router = createBrowserRouter(
    [
      // External Paths
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { path: '/', element: <IndexPage /> },
          { path: '/sign-in/*', element: <SignInPage /> },
          { path: '/sign-up/*', element: <SignUpPage /> },
        ],
      },
      // Logged In Paths
      {
        path: '/app/',
        element: <InternalLayout />,
        children: [
          // Creative Studio
          { path: '/app/studio', element: <CreativeStudio />},
          { path: '/app/offerings', element: <Offerings />},
          { path: '/app/automations', element: <Automations />},
          { path: '/app/Analytics', element: <Analytics />},
        ]
      },
      // Internal Paths that are not part of main app
      {

        path: '/signup/',
        element: <SignUpFlowLayout />,
        children: [
          // Theme Color Chooser
          {path: '/signup/theme', element: <Theme />},
          // Links Setup
          {path: '/signup/links', element: <Links />}, // Setup Stripe
          {path: '/signup/stripe', element: <StripeSetup />},
          // Setup Services
          {path: '/signup/services', element: <ServicesSetup />},
        ]

      },
      // External Client Use In Paths
      { path: '/myspot/:user', 
        element: <User /> 
      },
      // Internal Client Use In Paths
    ]
  );


  return (
      <SessionContext.Provider value={{session, setSession}}>
        <RouterProvider router={router} />
      </SessionContext.Provider> 
  )

}
