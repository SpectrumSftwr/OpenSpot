import React , { useEffect, useRef, useState, useContext } from "react";
import { Link, useParams  } from "react-router-dom";
import httpService from '../services/http.service'
import {  ChartBarIcon, ChartBarSquareIcon, ChevronLeftIcon, ChevronRightIcon, CommandLineIcon, FaceSmileIcon, PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { SideNavContext } from "../layouts/internallayout";
import { SessionContext } from "../App";
import { toast } from "react-hot-toast";
import { GlobeAltIcon } from "@heroicons/react/24/solid";


export const SideNav = () => {
  const [username, setUsername] = useState("");
  const [showConnectStripe,setShowConnectStripe] = useState(false);
  let showConnectStripeUrl = "true";
  const [liveSiteUri, setLiveSiteUri] = useState("");

  const getUserDetails = async () => {
    try {
      const {data} = await httpService.get('/auth/status');
      console.log(data);

      const usernameDisplay  = data.user.firstName[0] + data.user.lastName[0];
      setUsername(usernameDisplay.toUpperCase())

      setLiveSiteUri(data.business.business_UID)

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      
    }
  }

  useEffect(() => {

    httpService.get('/auth/status')
      .then((res) =>  {
        let isStripeUrlPresent = res.data.stripeId;
        let name = `${res.data.firstName} ${res.data.lastName}`;
      })
      .catch(() => {
      })

    getUserDetails();
  },[]) 

  return (
      <div className={`flex flex-col p-4 justify-between items-center max-w-[6%]`}>
        <div className="divide-gray-600">
          {/* Profile Section */}
          <div className="flex flex-row justify-around w-full items-center mb-8 mt-8">
            <div className="bg-brand-700 rounded-full h-10 w-10 content-center text-center text-gray-100 drop-shadow-lg hover:cursor-pointer">
              <span>
                {username}
              </span>
            </div>
          </div>
          <SideBarNavigation liveSiteUri={liveSiteUri}/>
        </div>
        {/* Dividor 
        <UserModals showConnectStripe={showConnectStripe} 
          showConnectStripeUrl={showConnectStripeUrl} />
        */}
        {/* Dividor */}
      </div>
  )
}


export function SideBarNavigation ( {liveSiteUri} :{liveSiteUri: string}) {

  const {isOpen, setIsOpen} = useContext(SideNavContext);
  const [activePage, setActivePage] = useState('Dashboard')

  return (
    <>
      <SideBarItem icon={<ChartBarSquareIcon className="h-7 w-7"/>} text={"Dashboard"} uri={'/app'}  
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<GlobeAltIcon className="h-7 w-7"/>} text={"View Live Site"} uri={`/${liveSiteUri}`}  
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<FaceSmileIcon className="h-7 w-7"/>} text={"Feedback Form"} uri={'/app/feedback'}  
        active={{activePage, setActivePage}} />

      {/**
      <SideBarItem icon={<UserCircleIcon className="h-7 w-7"/>} text={"Your Offerings"} uri={'/app/offerings'} 
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<CommandLineIcon className="h-7 w-7" />} text={"Automations"} uri={'/app/automations'} 
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<ChartBarIcon className="h-7 w-7" />} text={"Analytics"} uri={'/app/analytics'} 
        active={{activePage,setActivePage}} />

      */}
    </>
  )
}

export function SideBarItem({icon, text, uri, active}
  : {icon: any, text: string, uri: string, active?:any}){

  const {activePage, setActivePage} = active;

  const handleNewActive = () => {
    setActivePage(text);
  }

  return (
    <div className="relative group z-10">
      <Link to={uri} className="" onClick={() => handleNewActive()}>
        <div className={`flex flex-row font-sm text-sm pl-2 pt-2 pb-2 pr-2 text-nowrap w-fit text-center items-center mt-2 mb-2
                        ${activePage == text  ?  
                        "text-gray-900 bg-[#ECECEC] rounded-xl drop-shadow-md"
                        : 'text-gray-400 hover:text-[#D9D9D9]' }`}>
          <div>
            {icon}
          </div> 
        </div>
      </Link>
      <div className="absolute bottom-[42%] left-[16%] transform translate-x-1/2 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {text}
      </div>
    </div>
  )
}

export function UserModals({showConnectStripe, showConnectStripeUrl} 
  : {showConnectStripe: boolean, showConnectStripeUrl: string | null}) { 

  const {isOpen, setIsOpen} = useContext(SideNavContext);

  return (
    <div>
      {showConnectStripe && isOpen &&
        showConnectStripeUrl &&
        <div className="drop-shadow-lg bg-white pl-2 pr-2 pt-4 pb-4 rounded-lg mb-4">
          <div className="flex flex-col items-start text-start pl-1">
            <span className="font-bold text-lg">Payouts</span>
            <span className="font-semibold text-[#A2A2A2] text-xs">
              Setup your payment information to start accepting payments from your clients.
            </span>
            <Link to={showConnectStripeUrl} className="text-white bg-[#BA2626] font-bold mt-4 p-2 self-center rounded-lg">
              <div>Get Paid Today</div>
            </Link>
          </div>
        </div>
      }
    </div>
  )

}


