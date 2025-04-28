import React, {useState, createContext} from "react";
import { isActiveSession } from "./services/session.service";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IndexPage from './routes';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';

// Import layouts
import RootLayout from './layouts/rootlayout';
import InternalLayout from './layouts/internallayout';
import {CreativeStudio} from "./routes/internalroutes/CreativeStudio";
import Offerings from "./routes/internalroutes/Offerings";
import Automations from "./routes/internalroutes/Automations";
import Analytics from "./routes/internalroutes/Analytics";
import SignUpFlowLayout from "./layouts/signupflowlayout";
import { Theme } from "./routes/signup-pages/theme";
import { Links } from "./routes/signup-pages/links";
import { StripeSetup } from "./routes/signup-pages/stripe";
import { PackagesSetup } from "./routes/signup-pages/packages";
import { Profile } from "./routes/signup-pages/profilesetup";
import { UserPage } from "./routes/userpages/User";
import { UserBookings } from "./routes/userpages/UserBookings";
import { BookingsLayout } from "./routes/userpages/layouts/bookingslayout";
import { Packages } from "./routes/userpages/packages";
import { ReviewBooking } from "./routes/userpages/ReviewBooking";
import { PersonalInformation } from "./routes/userpages/PersonalInfomation";
import { ConfirmationPage } from "./routes/confirmationpages/ConfirmationPage";
import { TermsAndConditions } from "./routes/admin/TermsAndConditions";
import { PrivacyPolicy } from "./routes/admin/PrivacyPolicy";
import { UserNotFound } from "./routes/userpages/UserNotFound";
import { UserContextPage } from "./routes/userpages/layouts/UserContext";
import { UserGallery } from "./routes/userpages/UserGallery";
import { UserReviews } from "./routes/userpages/UserReviews";
import OpenSpotApplicationRoot from "./openSpotApplicationRoot";


export const SessionContext = createContext();

export const App = () => {
  const [session, setSession] = useState(isActiveSession());

  // Create the browser router.
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <OpenSpotApplicationRoot />,
        children: [
          {
            path: "/",
            element: <RootLayout />,
            children: [
              { path: '/', element: <IndexPage /> },
              { path: '/usernotfound', element: <UserNotFound /> },
              { path: '/sign-in/*', element: <SignInPage /> },
              { path: '/sign-up/*', element: <SignUpPage /> },
              {path: '/confirmation/:confNum', element: <ConfirmationPage />},
              {path: '/terms-and-conditions', element: <TermsAndConditions />},
              {path: '/privacy-policy', element: <PrivacyPolicy />},
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
              {path: '/signup/profile', element: <Profile />},
              // Theme Color Chooser
              {path: '/signup/theme', element: <Theme />},
              // Links Setup
              {path: '/signup/links', element: <Links />}, // Setup Stripe
              {path: '/signup/stripe', element: <StripeSetup />},
              // Setup Services
              {path: '/signup/services', element: <PackagesSetup />},
            ]

          },
          // External Client Use In Paths
          { path: '/myspot/:user', 
            element: <UserContextPage />,
            children: [
              {
                path: '/myspot/:user',
                element: <UserPage />,
              },
              {
                path: '/myspot/:user/gallery',
                element: <UserGallery />,
              },
              {
                path: '/myspot/:user/reviews',
                element: <UserReviews />,
              },
              {
                path: '/myspot/:user/bookings/',
                element : <BookingsLayout />,
                children : [
                  {
                    path: '/myspot/:user/bookings/',
                    element : <UserBookings />,
                  },
                  {
                    path: '/myspot/:user/bookings/packages',
                    element : <Packages />,
                  },
                  {
                    path: '/myspot/:user/bookings/personalinfo',
                    element : <PersonalInformation />,
                  },
                  {
                    path: '/myspot/:user/bookings/review',
                    element : <ReviewBooking />,
                  }
                ]
              },
            ],
          },
          {
            path: '/confirmation/:confNum',
            element: <ConfirmationPage />
          }
        ]
      }
      // External Paths
      // Internal Client Use In Paths
    ]
  );


  return (
    <SessionContext.Provider value={{session, setSession}}>
      <RouterProvider router={router} />
    </SessionContext.Provider> 
  )

}
