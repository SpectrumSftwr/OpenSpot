import React, {useState, createContext} from "react";
import { isActiveSession } from "./services/session.service";
import { createBrowserRouter, Link, Navigate, RouterProvider } from "react-router-dom";
import './App.css'

import IndexPage from './routes';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';

// Import layouts
import RootLayout from './layouts/rootlayout';
import InternalLayout from './layouts/internallayout';
import {CreativeStudio} from "./routes/internalroutes/CreativeStudio";
import {FeedbackForm} from "./routes/internalroutes/FeedbackForm";
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
          { 
            index: true,
            element: <IndexPage /> 
          },
          { 
            path: 
            '/usernotfound', 
            element: <UserNotFound /> 
          },
          { 
            path: '/sign-in/*', 
            element: <SignInPage /> 
          },
          { 
            path: '/sign-up/*', 
            element: <SignUpPage /> 
          },
          {
            path: '/terms-and-conditions', 
            element: <TermsAndConditions />
          },
          {
            path: '/privacy-policy', 
            element: <PrivacyPolicy />
          },
        ],
      },
      // Logged In Paths
      {
        path: '/app',
        element: <InternalLayout />,
        children: [
          // Creative Studio
          { 
            index: true,
            element: <CreativeStudio />
          },
          { 
            path: 'offerings', 
            element: <Offerings />
          },
          { 
            path: 'automations', 
            element: <Automations />
          },
          { 
            path: 'Analytics', 
            element: <Analytics />
          },
          { 
            path: 'feedback', 
            element: <FeedbackForm />
          },
        ]
      },
      // Internal Paths that are not part of main app
      {

        path: '/signup',
        element: <SignUpFlowLayout />,
        children: [
          // Theme Color Chooser
          {
            index:true,
            element: <Profile />
          },
          // Theme Color Chooser
          {
            path: 'theme', 
            element: <Theme />
          },
          // Links Setup
          {
            path: 'links', 
            element: <Links />
          }, // Setup Stripe
          {
            path: 'stripe',
            element: <StripeSetup />
          },
          // Setup Services
          {
            path: 'services', 
            element: <PackagesSetup />
          },
        ]

      },
      // External Client Use In Paths
      {
        path: '/confirmation/:confNum',
        element: <ConfirmationPage />
      },
      // MUST BE THE LAST INDEX OF THE ROUTES.
      { 
        path: '/:user', 
        element: <UserContextPage />,
        children: [
          {
            index: true,
            element: <UserPage />,
          },
          {
            path: 'gallery',
            element: <UserGallery />,
          },
          {
            path: 'reviews',
            element: <UserReviews />,
          },
          {
            path: 'bookings',
            element : <BookingsLayout />,
            children : [
              {
                index: true,
                element : <UserBookings />,
              },
              {
                path: 'packages',
                element : <Packages />,
              },
              {
                path: 'personalinfo',
                element : <PersonalInformation />,
              },
              {
                path: 'review',
                element : <ReviewBooking />,
              }
            ]
          },
        ],
      },
    ]
  );


  return (
      <SessionContext.Provider value={{session, setSession}}>
        <RouterProvider router={router} />
      </SessionContext.Provider> 
  )

}
