import React , { useEffect, useRef, useState, useContext } from "react";
import { Link  } from "react-router-dom";
import httpService from '../services/http.service'
import {  ChartBarIcon, ChevronLeftIcon, ChevronRightIcon, CommandLineIcon, PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { SideNavContext } from "../layouts/internallayout";


export const SideNav = () => {
  const {isOpen, setIsOpen} = useContext(SideNavContext);
  const [username, setUsername] = useState("");
  const [showConnectStripe,setShowConnectStripe] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(true);
  let showConnectStripeUrl = "true";

  useEffect(() => {
    httpService.get('/auth/status')
      .then((res) =>  {
        let isStripeUrlPresent = res.data.stripeId;
        let name = `${res.data.firstName} ${res.data.lastName}`;
        setShowConnectStripe(!isStripeUrlPresent);
        setUsername(() => name)
      })
      .catch(() => {
      })
  },[]) 

  if (!username) {
    setUsername("User")
  }
  
  return (
      <div className="h-[calc(100vh-100px)] bg-[#FAFAFA] border-[#C3C3C3] border-r-2 text-sm w-1/6">
        <div className="flex flex-col p-2 h-full justify-between items-center w-fit">
          <div className="w-full divide-y-4 divide-gray-600 ">
            {/* Profile Section */}
            <div className="flex flex-row justify-around w-full items-center mb-8 mt-8 h-fit">
              <div className="bg-brand-700 rounded-full h-10 w-10 content-center text-center text-gray-100 drop-shadow-lg hover:cursor-pointer">
                <span>
                  JM
                </span>
              </div>
              <div className="font-bold text-lg text-gray-700">
                {username}
              </div>
              {sidenavOpen ?
                <ChevronRightIcon className="h-7 w-7 text-gray-600 border-gray-400 p-1 border-2 rounded-full" 
                  onClick={() => setSidenavOpen((prev) => !prev)}/>
                :
                <ChevronLeftIcon className="h-7 w-7 text-gray-600 border-gray-400 p-1 border-2 rounded-full" 
                  onClick={() => setSidenavOpen((prev) => !prev)}/>
              }
            </div>

            <SideBarNavigation />
          </div>
          {/* Dividor */}
          <UserModals showConnectStripe={showConnectStripe} 
            showConnectStripeUrl={showConnectStripeUrl} />
          {/* Dividor */}
          <div>
            <UserCalendar upcomingEvents={8} eventDates={[1,5,9,11,14,15,19]}/>
          </div>
        </div>
      </div>
  )
}


export function SideBarNavigation () {

  const {isOpen, setIsOpen} = useContext(SideNavContext);
  const [activePage, setActivePage] = useState('Creative Studio')

  return (
    <>
      <SideBarItem icon={<PhotoIcon className="h-7 w-7"/>} text={"Creative Studio"} uri={'/app/studio'}  
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<UserCircleIcon className="h-7 w-7"/>} text={"Your Offerings"} uri={'/app/offerings'} 
        active={{activePage, setActivePage}}/>
      <SideBarItem icon={<CommandLineIcon className="h-7 w-7" />} text={"Automations"} uri={'/app/automations'} 
        active={{activePage, setActivePage}}  />
      <SideBarItem icon={<ChartBarIcon className="h-7 w-7" />} text={"Analytics"} uri={'/app/analytics'} 
        active={{activePage,setActivePage}}/>
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
    <Link to={uri} className="mt-4 mb-8" onClick={() => handleNewActive()}>
      <div className={`flex flex-row font-sm text-xl pt-4 pb-4 pr-4  pl-10
                        ${activePage == text  ?  
                        'text-gray-900 bg-[#ECECEC] rounded-xl w-full outline outline-[#D7D7D7] outline-1 drop-shadow-md'
                        : 'text-gray-400 hover:text-[#D9D9D9]' }`}>
        <div className="mr-2">
          {icon}
        </div>
        <span>  {text} </span>
      </div>
    </Link>
  )
}

export function UserModals({showConnectStripe, showConnectStripeUrl} 
  : {showConnectStripe: boolean, showConnectStripeUrl: string | null}) { 

  const {isOpen, setIsOpen} = useContext(SideNavContext);

  return (
    <div>
      {showConnectStripe &&
        showConnectStripeUrl &&
        <div className="w-full drop-shadow-lg bg-white pl-2 pr-2 pt-4 pb-4 rounded-lg mb-4">
          <div className="flex flex-col items-start text-start pl-1">
            <span className="font-bold text-xl">Payouts</span>
            <span className="font-semibold text-[#A2A2A2]">
              Setup your payment information to start accepting payments from your clients.
            </span>
            <Link to={showConnectStripeUrl} className="text-white bg-[#BA2626] text-lg mt-4 p-2 self-center rounded-lg">
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
      <div>
        You have {upcomingEvents} Upcoming Events this month.
      </div>
    </div>
  )
}

