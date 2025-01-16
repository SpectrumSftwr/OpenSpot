# OpenSpot FrontEnd Project.

Highesat Priority TODO: 
- Booking a date for a partner. 

what does this mean?

Define the flow for a partner to sign up and get their OpenSpotLink.

High Level goals.
1. Interactive LandingPage -> page prefilled with landingpage info and some additonal fields to finish their sign up.

2. This takes them to their dashboard that should take them through the "Onboarding" 
    Customizing the OpenLink Page.
    Connecting their Stripe Accounts.

3. Partner Is LIVE!

/// NOW FROM A TECH VIEW
1. Create the single screen landing page.
 
    No Session at this point. Everything here is open to the public nothing is loaded from the backend.

    This page will show a text field that says "Claim your OpenSpot" where they can check if their ideal username is taken.
        This means an auto API call to check all the registered link suffixes does not have a match with theirs.

    If a user decides to "claim their openspot" we link them to the sign up page.

2. The sign up page
    If the user came from the landing page and their claim now was filled in we can auto populate their desired link
    Create a form where user will input all Partner information required.

    Name: First Last
    Email: email@address.com
    State: State CODE (FL, UT, NY etc.)
    ZipCode: for general location.
    Type of Business: (DropDown)
    Stripe Account Info: Not required at this point but 
            warning should show that they will not be able to use all features of the application.

    User can submit this form 
    An api call is made and the user is saved into db. if successful redirect user to their dashboard.
    If the user fails. display the error message to them allow them to fix the issue and resubmit.

3. Once the user makes it to their Customization Page .... TBD

    include:
    color changes to the background 
    Logo/Banner Changes  
    Schedule
    FAQ section.
    define how a partner can import their booked dates. 



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
