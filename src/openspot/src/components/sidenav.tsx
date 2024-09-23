import { BellIcon, ChartBarIcon, CommandLineIcon, PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React , { useEffect, useRef, useState } from "react";
import { Link  } from "react-router-dom";
import httpService from "services/http.service";
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar'
import dayjs, {Dayjs} from 'dayjs'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { DayCalendarSkeleton, LocalizationProvider } from "@mui/x-date-pickers";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
import 'dayjs/locale/en'

export const SideNav = () => {
  const [showConnectStripe,setShowConnectStripe] = useState(false);
  let showConnectStripeUrl = "true";

  useEffect(() => {
    httpService.get('/auth/status')
      .then((res) =>  {
        let isStripeUrlPresent = res.data.stripeId;
        setShowConnectStripe(!isStripeUrlPresent);
      })
      .catch((err) => console.log(err))
  },[]) 
  
  return (
    <div className="h-[calc(100vh-100px)] bg-[#FAFAFA] border-[#C3C3C3] border-r-2 text-sm">
      <div className="flex flex-col p-2 h-full justify-between items-center w-80">
        <SideBarNavigation />
        <UserModals showConnectStripe={showConnectStripe} 
          showConnectStripeUrl={showConnectStripeUrl} />
        <div>
          <UserCalendar upcomingEvents={8} eventDates={[1,5,9,11,14,15,19]}/>
        </div>
      </div>
    </div>
  )
}


export function SideBarNavigation (){

  const [activePage, setActivePage] = useState('Creative Studio')

  return (
    <div className="w-full">
      <SideBarItem icon={<PhotoIcon className="h-7 w-7"/>} text={"Creative Studio"} uri={'/app/studio'}  
        active={{activePage, setActivePage}} />
      <SideBarItem icon={<UserCircleIcon className="h-7 w-7"/>} text={"Your Offerings"} uri={'/app/offerings'} 
        active={{activePage, setActivePage}}/>
      <SideBarItem icon={<CommandLineIcon className="h-7 w-7" />} text={"Automations"} uri={'/app/automations'} 
        active={{activePage, setActivePage}}  />
      <SideBarItem icon={<ChartBarIcon className="h-7 w-7" />} text={"Analytics"} uri={'/app/analytics'} 
        active={{activePage,setActivePage}}/>
    </div>
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
      <div className={`flex flex-row font-medium text-xl pt-4 pb-4 pr-4  pl-10
                        ${activePage == text  ?  
                        'text-black bg-[#ECECEC] rounded-xl w-full outline outline-[#D7D7D7] outline-1 drop-shadow-md'
                        : 'text-[#747376] hover:text-[#D9D9D9]' }`}>
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

export function UserCalendar({upcomingEvents, eventDates}
  :{upcomingEvents: string | number, eventDates: string[] | number[]}) {
  const requestAbortController = useRef<AbortController | null>(null);

  const initialValue = dayjs('2024-09-22');
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);


  // TODO :  FETCH EVENT DATES FROM BACKENDK.
  function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {

    const getRandomNumber = (min: number, max: number) => {
      return Math.round(Math.random() * (max - min) + min);
    }

    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
        const timeout = setTimeout(() => {
          const daysInMonth = date.daysInMonth();
          const daysToHighlight = [1,2,3].map(()=> getRandomNumber(1, daysInMonth))
          resolve({daysToHighlight})
        }, 500)

        signal.onabort = () => {
          clearTimeout(timeout);
          reject(new DOMException('aborted', "AbortError"));
        }
      });
  }

  const handleMonthChange = (date: Dayjs) =>  {
    setIsLoading(true);
    setHighlightedDays([]);
    fetchEventDates(date);
  }

  const fetchEventDates = (date: Dayjs) =>  {
    const controller = new AbortController();

    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  }

  function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <BellIcon /> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

  useEffect(() => {
    fetchEventDates(initialValue);
  }, [])

  return (
    <div>
      <div>
        You have {upcomingEvents} Upcoming Events this month.
      </div>
        <DateCalendar 
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{day: ServerDay}}
          slotProps={{
            day: {
              highlightedDays,
            } as any, 
          }}
        /> 
    </div>
  )
}

