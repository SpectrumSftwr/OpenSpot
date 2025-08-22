import { CalendarDateRangeIcon, CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline"
import React from "react"

export const CreativeStudio = () => {
  return (
    <div className="bg-[#F5F5F5] flex flex-col w-full justify-start">
      <div className="mt-4 ml-2 h-1/6">
        <div className="h-full mt-4 mb-4">
          <label className="flex flex-row justify-start ml-2 text-gray-700 font-semibold">
            Events
          </label>
          <div className="flex flex-row w-full justify-evenly h-full">
            {/* Make a card component for the Events, when clicked leads to a list of events of that status. */}
            <DashboardCard text={"Pending"} icon={<CalendarDateRangeIcon className="h-7 w-7" />} value={3} href="/pending" />
            <DashboardCard text={"Approved"} icon={<CheckBadgeIcon className="h-7 w-7" />} value={1} href="/approved" />
            <DashboardCard text={"Rejected"} icon={<XCircleIcon className="h-7 w-7" />} value={4} href="/rejected" />
          </div>
        </div>
      </div>
      <div className="mt-4 ml-2 h-1/6">
        <label className="flex flex-row justify-start ml-2 text-gray-700 font-semibold">
          Automations Ran
        </label>
        <div className="flex flex-row w-full justify-evenly h-full">
          {/* Make a card component for the Events, when clicked leads to a list of events of that status. */}
          <DashboardCard text={"Scheduled"} icon={<CalendarDateRangeIcon className="h-7 w-7" />} value={3} href="/pending" />
          <DashboardCard text={"Completed"} icon={<CheckBadgeIcon className="h-7 w-7" />} value={1} href="/approved" />
          <DashboardCard text={"Failed"} icon={<CheckBadgeIcon className="h-7 w-7" />} value={1} href="/approved" />
        </div>
      </div>
      <div className="mt-4 ml-2 h-1/6">
        <label className="flex flex-row justify-start ml-2 text-gray-700 font-semibold">
          Client Satisfaction
        </label>
        <div className="flex flex-row w-full justify-evenly h-full">
          {/* Make a card component for the Events, when clicked leads to a list of events of that status. */}
          <DashboardCard text={"Needs Response"} icon={<CalendarDateRangeIcon className="h-7 w-7" />} value={3} href="/pending" />
        </div>
      </div>
    </div>
  )
}

const DashboardCard = ({text, icon, value, href}
  : {text: string, icon: any, value: number, href: string}) => {

  return (
    <div className="w-2/6 p-2 m-2 bg-white flex flex-row rounded-md drop-shadow-sm justify-between items-center h-full" 
      onClick={() => {console.log(href)}}>
      <div className="flex flex-row items-center">
        {icon}
        <label className="text-gray-700 font-semibold ml-2">{text}</label>
      </div>
      <label className="font-extrabold mr-4">
        {value}
      </label>
    </div>
  )

}
