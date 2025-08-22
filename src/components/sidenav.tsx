import React , { useEffect, useRef, useState, useContext } from "react";
import { Link  } from "react-router-dom";
import httpService from '../services/http.service'
import {  ChartBarIcon, ChevronLeftIcon, ChevronRightIcon, CommandLineIcon, PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { SideNavContext } from "../layouts/internallayout";


export const SideNav = () => {
  const {isOpen, setIsOpen} = useContext(SideNavContext);
  const [user, setUser] = useState<any>();
  const [username, setUsername] = useState("");
  const [showConnectStripe,setShowConnectStripe] = useState(false);
  let showConnectStripeUrl = "true";

  useEffect(() => {
    httpService.get('/auth/status')
      .then((res) =>  {
        let isStripeUrlPresent = res.data.stripeId;
        let name = `${res.data.firstName} ${res.data.lastName}`;
        setShowConnectStripe(!isStripeUrlPresent);
        setUsername(() => name)
        
        // TODO GET BUSINESS USER IS PART OF.
        setUser(res.data) 
      })
      .catch(() => {
      })
  },[]) 

  return (
      <div className={`flex flex-col p-2 justify-between items-center ${!isOpen ? "w-1/12" : "w-2/12"}`}>
        <div className="divide-y-4 divide-gray-600 ">
          {/* Profile Section */}
          <div className="flex flex-row justify-around w-full items-center mb-8 mt-8">
            <div className="bg-brand-700 rounded-full h-10 w-10 content-center text-center text-gray-100 drop-shadow-lg hover:cursor-pointer">
              <span>
              todo
              </span>
            </div>
          { isOpen &&
            <div className="font-bold text-sm text-gray-700">
              {username}
            </div>
          }
            {isOpen ?
              <ChevronRightIcon className="h-7 w-7 text-gray-600 border-gray-400 p-1 rounded-full border-2 relative" 
                onClick={() => setIsOpen((prev) => !prev)}/>
              :
              <ChevronLeftIcon className="h-7 w-7 text-gray-600 border-gray-400 p-1 rounded-full border-2 relative" 
                onClick={() => setIsOpen((prev) => !prev)}/>
            }
          </div>

          <SideBarNavigation/>
        </div>
        {/* Dividor 
        <UserModals showConnectStripe={showConnectStripe} 
          showConnectStripeUrl={showConnectStripeUrl} />
        */}
        {/* Dividor */}
        <div>
          <UserCalendar upcomingEvents={8} eventDates={[1,5,9,11,14,15,19]}/>
        </div>
      </div>
  )
}


export function SideBarNavigation () {

  const {isOpen, setIsOpen} = useContext(SideNavContext);
  const [activePage, setActivePage] = useState('Dashboard')

  return (
    <>
      <SideBarItem icon={<PhotoIcon className="h-7 w-7"/>} text={"Dashboard"} uri={'/app'}  
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<UserCircleIcon className="h-7 w-7"/>} text={"Your Offerings"} uri={'/app/offerings'} 
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<CommandLineIcon className="h-7 w-7" />} text={"Automations"} uri={'/app/automations'} 
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<ChartBarIcon className="h-7 w-7" />} text={"Analytics"} uri={'/app/analytics'} 
        active={{activePage,setActivePage}} />
    </>
  )
}

export function SideBarItem({icon, text, uri, active}
  : {icon: any, text: string, uri: string, active?:any}){

  const {isOpen, setIsOpen} = useContext(SideNavContext);
  const {activePage, setActivePage} = active;

  const handleNewActive = () => {
    setActivePage(text);
  }

  return (
    <Link to={uri} className="mt-4 mb-8" onClick={() => handleNewActive()}>
      <div className={`flex flex-row font-sm text-sm pl-2 pt-2 pb-2 pr-2 text-nowrap w-fit text-center items-center mt-2 mb-2
                        ${activePage == text  ?  
                        "text-gray-900 bg-[#ECECEC] rounded-xl outline outline-[#D7D7D7] outline-1 drop-shadow-md"
                        : 'text-gray-400 hover:text-[#D9D9D9]' }`}>
        <div>
          {icon}
        </div> 
        {isOpen ? 
          <span className="ml-2">  {text} </span> : null
        }
      </div>
    </Link>
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

export function UserCalendar({upcomingEvents}
  :{upcomingEvents: string | number, eventDates: string[] | number[]}) {
  const {isOpen, setIsOpen} = useContext(SideNavContext);
  return (
    <div>
    {isOpen &&
      <div>
        You have {upcomingEvents} Upcoming Events this month.
      </div>
      }
    </div>
  )
}

