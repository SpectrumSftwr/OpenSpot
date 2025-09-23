import { ArrowDownIcon, ArrowUpIcon, CalendarDateRangeIcon, CheckBadgeIcon, PaperAirplaneIcon, PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline"
import { TicketIcon, PhoneIcon, EnvelopeIcon, UserIcon, UsersIcon, CalendarIcon, UserGroupIcon, ClockIcon, CakeIcon, HomeIcon, InboxStackIcon, PuzzlePieceIcon, ChatBubbleLeftIcon, BookmarkIcon, XCircleIcon, ArrowsUpDownIcon} from "@heroicons/react/24/solid"
import React, { useEffect, useState } from "react"
import httpService from "../../services/http.service";
import {  Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { PackageDetailsDto } from "../userpages/dtos/PackageDetails.dto";
import { CircularProgress, Pagination } from "@mui/material";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const APPROVED_BUTTON_ID = "APPROVED";
const PENDING_BUTTON_ID = "PENDING";
const REJECTED_BUTTON_ID = "REJECTED"

export const CreativeStudio = () => {
  const navigate = useNavigate();

  const [upcomingAccepted, setUpcomingAccepted] = useState(0);
  const [pendingApproval, setPendingApproval] = useState(0);
  const [upcomingSoon, setUpcomingSoon] = useState(0);
  const [ytdCompleted, setYtdCompleted] = useState(0);
  const [updateSnapshot, setUpdateSnapshot] = useState<boolean>(false);

  const fetchStatistics = async() => {
    try {
      const response = await httpService.get('/events/stats');

      const {data} = response;
      if (data) {
        setUpcomingAccepted(data.upcomingAccepted)
        setPendingApproval(data.pending)
        setUpcomingSoon(data.upcomingThisMonth)
        setYtdCompleted(data.yearToDate)
      }  else {
        setUpcomingAccepted(0)
        setPendingApproval(0)
        setUpcomingSoon(0)
        setYtdCompleted(0)
      }

    } catch (err) {
      if(err.status == 401) {
        navigate('/sign-in')
      }
    }
  }


  useEffect(() => {
    fetchStatistics();
  },[updateSnapshot])

  return (
    <div className="bg-[#F5F5F5] flex flex-col w-full justify-start min-h-full h-fit">
      <div className="ml-2 m-4 drop-shadow-xl rounded-sm mt-8">
        <div className="bg-white rounded-sm p-4 m-4">
          <label className="flex flex-row justify-start ml-2 text-gray-700 font-semibold mt-8">
            Events Snapshot.
          </label>
          <div className="flex flex-row w-full justify-evenly h-">
            {/* Make a card component for the Events, when clicked leads to a list of events of that status. */}
            <DashboardCard 
              text={"Scheduled Events"} 
              icon={<CheckBadgeIcon className="h-7 w-7" />} 
              value={upcomingAccepted}
              filterValue=""
            />
            <DashboardCard 
              text={"Needs Review"} 
              icon={<CalendarDateRangeIcon className="h-7 w-7" />} 
              value={pendingApproval} 
              filterValue="/pending" 
            />
            <DashboardCard 
              text={"Next 30 days"} 
              icon={<PaperAirplaneIcon className="h-7 w-7" />} 
              value={upcomingSoon} 
              filterValue="" 
            />
            <DashboardCard 
              text={"Completed (YTD)"} 
              icon={<CheckBadgeIcon className="h-7 w-7" />} 
              value={ytdCompleted} 
              filterValue="" 
            />
          </div>
        </div>
      </div>
      <div className="w-full p-4 h-fit">
        <EventsTableBody updateStatsCallback={setUpdateSnapshot}/>
      </div>
    </div>
  )
}

const EventsTableBody = ({updateStatsCallback} : {updateStatsCallback: any}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents ] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState(false);
  const [sort, setSort] = useState('id,asc')
  const [status, setStatus] = useState<String | undefined>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [packageDetails, setPackageDetails] = useState<PackageDetailsDto | null>(null)
  const [selectedRow, setSelectedRow] = useState(null);
  const [isUpdateableStatus, setIsUpdatableStatus] = useState(false);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);
  const [notes, setNotes] = useState<string>();

  /**
   * Helper Method to close all Modals once Rejection is handled.
   */
  const setCloseAllRejectionTabs = () => {
    setIsRejectionOpen(false);
    setSelectedRow(null);
  }

  const pageSizes = [
    {
      value: 20,
      name: "20 Rows",
    },
    {
      value: 50,
      name: "50 Rows",
    },
    {
      value: 100,
      name: "100 Rows",
    },
  ]

  const handleUpdateSort = (e) =>{
    const sortColumnId = e.currentTarget.id;
    
    // If already selected we can reverse this sort
    let direction = 'asc'
    if (sortColumn == sortColumnId) {
      direction = sortDirection ? 'asc' : 'desc';
      setSortDirection((prev) => !prev);
    } else {
      setSortColumn(sortColumnId);
      setSortDirection(false);
    }

    const updatedSort = `${sortColumnId},${direction}`
    console.log(updatedSort);
    setSort(updatedSort)

  }

  useEffect(() => {
    fetchTableData();
  },[pageSize, pageNumber, sort, status, totalPages, totalEvents])

  const fetchTableData = async() => {
    setIsLoading(true);
    try {
      // Build the request query params.
      let queryParams = `?page=${pageNumber}&pageSize=${pageSize}&sort=${sort}`
      if(status) {
        queryParams += `&status=${status}`
      }

      const {data} = await httpService.get(`/events${queryParams}`);
      console.log(data);
      setEvents(data.data);
      setTotalPages(data.meta.totalPages)
      setTotalEvents(data.meta.total)
    } catch (err) {
      console.error("Unexpected Error Occured when fetching the Statistics");
    }
    updateStatsCallback((prev)=> !prev);
    setIsLoading(false);
  }


  useEffect(() => {
    if (selectedRow != null) {
      const currentEventStatus = events[selectedRow]?.request?.status ?? "N/A"
      if (currentEventStatus === "PENDING"){
        setIsUpdatableStatus(true)
      } else {
        setIsUpdatableStatus(false)
      }
      setNotes(events[selectedRow].eventNotes?.notes);

    } else {
      fetchTableData();
    }
  }, [selectedRow])

  const handleEventClick = async (index: number) => {
    // Fetch Package Details for the Event.
    try {
      const {data} = await httpService.get(`/userpage/package_details/${events[index].package_id}`)
      setPackageDetails(data);
    } catch (err) {
      console.error(err);
    }

    setSelectedRow(index);
  }

  const handleFilterClick = (event)  => {
    const buttonClickedID = event.target.id;

    if (status == buttonClickedID) {
      setStatus(null);
    } else {
      switch (buttonClickedID) {
        case PENDING_BUTTON_ID:
          setStatus(PENDING_BUTTON_ID);
          setPageNumber(1);
          break;
        case APPROVED_BUTTON_ID:
          setStatus(APPROVED_BUTTON_ID);
          setPageNumber(1);
          break;
        case REJECTED_BUTTON_ID:
          setStatus(REJECTED_BUTTON_ID);
          setPageNumber(1);
          break;
        default: 
          console.error("Unknown Button Click ID");
          break;
      }
    }
  }

  const handlePageChange = (event, value) => {
    console.debug(event)
    setPageNumber(value)
  }


  const handleApprovedClick = async () => {
    const selectedEvent = events[selectedRow]
    if (selectedEvent) {
      const requestObject = {
        confirmationID: selectedEvent.confirmationId,
        status: APPROVED_BUTTON_ID,
        notes: notes,
      }

      try {
        const {data} = await httpService.post('/events', requestObject);
        console.log(data);
        toast.success("🎉 Approved The Event! 🎉")
      } catch (err) {
        toast.error("Unable to Approve The Event \n please try again later");
      }
    }

    setSelectedRow(null)
  }

  const handleNotesSave = async () => {
    try {
      const selectedEvent = events[selectedRow]
      if (selectedEvent) {
        const requestObject = {
          confirmationID: selectedEvent.confirmationId,
          notes: notes,
        }

        await httpService.post('/events/notes', requestObject);
        toast.success("Successfully Updated Note");
      }
    } catch (err) {
      console.error("Unable to save Notes for User");
      toast.error("Unable To Save Event Notes.\n Please Try Again.");
      // TODO : MAKE VISIBLE ERROR;
    }
  }

  return (
    <div className="flex flex-col justify-center p-4 text-start h-fit text-sm">
      <div className="flex flex-row justify-between p-2">
        <div className="flex flex-row justify-center items-center">
          Filters By:
          <div className="flex flex-row">
            <button className={`p-1 rounded-md text-black m-2 ${status === PENDING_BUTTON_ID ? "bg-brand-600 text-white" : "bg-gray-200 text-black"}`}
              onClick={handleFilterClick} 
              id={PENDING_BUTTON_ID}
            >
              Pending
            </button>
            <button className={`p-1 rounded-md text-black m-2 ${status === APPROVED_BUTTON_ID ? "bg-brand-600 text-white" : "bg-gray-200 text-black"}`}
              onClick={handleFilterClick} 
              id={APPROVED_BUTTON_ID}
            >
              Approved
            </button>
            <button className={`p-1 rounded-md text-black m-2 ${status === REJECTED_BUTTON_ID ? "bg-brand-600 text-white" : "bg-gray-200 text-black"}`}
              onClick={handleFilterClick} 
              id={REJECTED_BUTTON_ID}
            >
              Rejected
            </button>
          </div>
        </div>
        <div className="">
          <span className="rounded-md m-2">
            Page Size
          </span>
          <select className="p-1 rounded-md m-2" value={pageSize} 
            onChange={(e) => {setPageSize(Number(e.target.value))}}>
            {pageSizes.map((pageSizeObj, index) => {
              return (
                <option key={index} value={pageSizeObj.value}>{pageSizeObj.name}</option>
              )
            })}
          </select>
        </div>
      </div>
      {
        isLoading ? <span className="w-full h-[90%] flex justify-center items-center">
          <CircularProgress size={40}/>
        </span>
          :
          <div className="w-full">
            <div className="text-xs pl-2 mb-2 w-full">
              {totalEvents} events found
            </div>
            <table className="bg-white drop-shadow-xl text-start w-full">
              <thead>
                <tr className="border-2">
                  <th className="text-center pl-2 text-nowrap w-fit" id="id" onClick={handleUpdateSort}>
                    <div className="flex flex-row items-center text-center pl-4">
                      <span>
                        Created On
                      </span>
                      {sortColumn != "id" 
                        ? <ArrowsUpDownIcon className="w-3 h-3 ml-2"/>
                        : sortColumn == "id" && sortDirection==false 
                        ? <ArrowDownIcon className="w-3 h-3 ml-2"/> 
                        : <ArrowUpIcon className="w-3 h-3 ml-2"/>
                      }
                    </div>
                  </th>
                  <th className=" text-start pt-2 pb-2">
                    Client Name
                  </th>
                  <th className=" text-start pt-2 pb-2">
                    Event Type
                  </th>
                  <th className="text-start pl-2 pt-2 pb-2 text-nowrap" id="event_date" onClick={handleUpdateSort}>
                    <div className="flex flex-row items-center">
                      <span>
                        Event Date
                      </span>
                      {sortColumn != "event_date" 
                        ? <ArrowsUpDownIcon className="w-3 h-3 ml-2"/>
                        : sortColumn == "event_date" && sortDirection==false 
                        ? <ArrowDownIcon className="w-3 h-3 ml-2"/> 
                        : <ArrowUpIcon className="w-3 h-3 ml-2"/>
                      }
                    </div>
                  </th>
                  <th className=" text-start pt-2 pb-2" id="guest_count">
                    Guest Count
                  </th>
                  <th className=" text-start pt-2 pb-2">
                    Status
                  </th>
                  <th className="text-start pl-1 pt-2 pb-2">
                    <PencilSquareIcon className="w-4 h-4"/>
                  </th>
                </tr>
              </thead>
              <tbody className="text-start overflow-y-scroll">
                { events && events.length > 0 && 
                  events.map((event, index) => {
                    return (
                      <tr key={index} className={`border-2 h-16`}>
                        <td className="pl-4">
                        <td className="text-start pl-2 pt-1 pb-1">
                          {new Date(event.created_at).toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </td>
                        </td>
                        <td className="text-start pt-1 pb-1">
                          {`${event.personal_details.firstName} ${event.personal_details.lastName}`}
                        </td>
                        <td className="pt-1 pb-1">
                          {event.event_type}
                        </td>
                        <td className="text-start pl-2 pt-1 pb-1">
                          {new Date(event.event_date).toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </td>
                        <td className="pt-1 pb-1">
                          {event.guest_count}
                        </td>
                        <td className="text-start pt-1 pb-1">
                          {event.request?.status ?? "N/A"}
                        </td>
                        <td className="flex items-center pr-2 pb-1 pt-4" onClick={() => handleEventClick(index)}>
                          {
                            event.request?.status === "APPROVED"  
                              ? 
                              <span className="bg-brand-600 p-1 rounded-full items-center">
                                <CheckBadgeIcon className="w-4 h-4 stroke-gray-100 hover:stroke-gray-700 cursor-pointer"/>
                              </span>
                              : event.request?.status === "REJECTED"  
                                ? 
                                <span className="bg-brand-red p-1 rounded-full items-center">
                                  <XMarkIcon className="w-4 h-4 stroke-gray-100 hover:stroke-gray-700 cursor-pointer"/>
                                </span>
                                : 
                                <span className="bg-brand-yellow p-1 rounded-full items-center">
                                  <PencilSquareIcon className="w-4 h-4 stroke-gray-800 hover:stroke-gray-200 cursor-pointer" />
                                </span>
                          }
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </div>
      }
      <div className="flex flex-row justify-center mt-8">
        <Pagination count={totalPages} 
          page={pageNumber} 
          onChange={handlePageChange}
        />
      </div>
      {selectedRow != null &&
        <div className="flex flex-row justify-center">
          <Dialog 
            open={selectedRow != null} 
            onClose={() => setSelectedRow(null)} 
            className="relative z-50 w-full h-full">
            <DialogBackdrop className="fixed inset-0 bg-black/60" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className="w-[70%] h-[90%] max-w-[1080px] max-h-fit border bg-white p-12 flex flex-col justify-between text-gray-700 overflow-y-scroll">
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-center border-b-2 pb-2">
                    <DialogTitle className="font-bold flex flex-row items-center text-lg">
                      <TicketIcon className="h-6 w-6 mr-2 fill-brand-600"/>
                      Event Details
                    </DialogTitle>
                    <div className="mt-2 font-semibold">
                      Event Created On :
                      <span className="font-normal italic ml-2">
                        {new Date(events[selectedRow].created_at)
                          .toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-8 pb-2 pr-4 pl-4">
                    <div className="font-semibold">
                      Confirmation Id: 
                      <span className="font-normal italic ml-2">
                        {events[selectedRow].confirmationId}
                      </span>
                    </div>
                    <div className="flex flex-col mr-2">
                      <DialogTitle 
                        className={`font-bold text-xs 
${events[selectedRow].request?.status == "PENDING" ? 
"bg-brand-yellow text-gray-700" : 
events[selectedRow].request?.status == "REJECTED" ? 
"bg-brand-red text-white" : "bg-brand-600 text-white"
} 
p-2 rounded-md`}
                      >
                        {
                          events[selectedRow].request?.status
                        }
                      </DialogTitle>
                    </div>
                  </div>
                  {/* Client Personal Details Section */}
                  <div className="mt-4 flex-col justify-between h-1/3">
                    <DialogTitle className="font-bold flex flex-row items-center mb-2">
                      <UsersIcon className="w-4 h-4 mr-2"/>
                      Client Personal Details
                    </DialogTitle>
                    <div className="flex flex-row w-full justify-between border-b-2 border-t-2 p-4">
                      <div className="flex flex-col">
                        <span className="flex flex-row items-center">
                          <UserIcon className="w-4 h-4"/>
                          <span className="ml-2">
                            Client Name
                          </span>
                        </span>
                        <span className="">
                          {events[selectedRow].personal_details.firstName + " "}
                          {events[selectedRow].personal_details.lastName}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="flex flex-row items-center">
                          <PhoneIcon className="w-4 h-4"/>
                          <span className="ml-2">
                            Phone
                          </span>
                        </span>
                        <span>
                          {events[selectedRow].personal_details.phone}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="flex flex-row items-center">
                          <EnvelopeIcon className="w-4 h-4"/>
                          <span className="ml-2">
                            Email
                          </span>
                        </span>
                        <span>
                          {events[selectedRow].personal_details.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Event MII Details Section */}
                  <div className="mt-8 flex-col justify-between h-2/3 bg-gray-50 p-4 drop-shadow-md">
                    <DialogTitle className="font-bold">
                      Event
                    </DialogTitle>
                    <div>
                      <div className="flex justify-between mt-4">
                        <div className="flex flex-row w-1/2">
                          <span className="flex flex-row items-center mr-2">
                            <CakeIcon className="w-4 h-4"/>
                            <span className="ml-2">
                              Event Type :
                            </span>
                          </span>
                          <span className="italic font-medium bg-white p-2 rounded-sm drop-shadow-md w-1/2">
                            {events[selectedRow].event_type}
                          </span>
                        </div>
                        <div className="flex flex-row w-1/2">
                          <span className="flex flex-row items-center mr-2 w-1/2">
                            <UserGroupIcon className="w-4 h-4"/>
                            <span className="ml-2">
                              Guest Count : 
                            </span>
                          </span>
                          <span className="italic font-medium bg-white p-2 rounded-sm drop-shadow-md w-1/2 text-end">
                            {events[selectedRow].guest_count}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center mt-4">
                      <div className="flex flex-row">
                        <span className="flex flex-row items-center mr-2">
                          <CalendarIcon className="w-4 h-4"/>
                          <span className="ml-2">
                            Event Date :
                          </span>
                        </span>
                        <span className="italic font-medium bg-white p-2 rounded-sm drop-shadow-md pr-4 pl-4">
                          {new Date(events[selectedRow].event_date)
                            .toLocaleString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })}
                        </span>
                      </div>
                      <div className="flex flex-row text-center">
                        <div className="flex flex-row mr-4">
                          <span className="flex flex-row items-center mr-2">
                            <ClockIcon className="w-4 h-4"/>
                            <span className="ml-1">
                              Start Time :
                            </span>
                          </span>
                          <span className="italic font-medium bg-white p-2 rounded-sm drop-shadow-md">
                            {events[selectedRow].start_time}
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="flex flex-row items-center mr-2">
                            <ClockIcon className="w-4 h-4"/>
                            <span className="ml-1">
                              End Time : 
                            </span>
                          </span>
                          <span className="italic font-medium bg-white p-2 rounded-sm drop-shadow-md">
                            {events[selectedRow].end_time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-4 mt-4">
                      <span className="flex flex-row items-center mr-2">
                        <HomeIcon className="w-4 h-4"/>
                        <span className="ml-2">
                          Event Location
                        </span>
                      </span>
                      <span className="italic font-medium p-2 bg-white mb-1 mt-2 rounded-sm drop-shadow-md">
                        {events[selectedRow].location}
                      </span>
                    </div>
                  </div>
                  {/* Event Requirments Details Section */}
                  <div className="mt-8 flex-col bg-gray-50 p-4 drop-shadow-md">
                    <div className="">
                      <DialogTitle className="font-bold">
                        Requested Package
                      </DialogTitle>
                      {packageDetails && 
                        <PackageDisplay eventPackage={packageDetails}/>
                      }
                    </div>
                    <div className="w-full flex flex-col mt-4">
                      <DialogTitle className="font-bold flex flex-row items-center">
                        <span className="mr-2">
                          <ChatBubbleLeftIcon className="w-4 h-4"/>
                        </span>
                        <span>
                          Client Comments
                        </span>
                      </DialogTitle>
                      <span className="bg-white drop-shadow-md rounded-sm p-2 w-full m-2">
                        {events[selectedRow].personal_details.comments}
                      </span>
                    </div>
                  </div>
                </div>
                { events[selectedRow].request?.status == REJECTED_BUTTON_ID &&
                  <div className="flex flex-col mt-8 bg-gray-50 p-4 drop-shadow-md pb-4 mb-4">
                    <DialogTitle className="font-bold flex flex-row items-center">
                      <XCircleIcon className="w-4 h-4 mr-2" />
                      Given Rejection Reason:
                    </DialogTitle>
                    <textarea readOnly className="mt-2 rounded-md resize-none p-4 text-sm italic" cols={80} rows={3}>
                      {events[selectedRow].eventNotes?.rejectionNotes}
                    </textarea>
                  </div>
                }
                <div className="flex flex-col mt-8 bg-gray-50 p-4 drop-shadow-md pb-4 mb-4 w-full">
                  <DialogTitle className="font-bold flex flex-row items-center">
                    <BookmarkIcon className="w-4 h-4 mr-2" />
                    Notes
                  </DialogTitle>
                  <textarea className="bg-gray-200 mt-2 rounded-md resize-none p-2" cols={80} rows={10} onChange={(e)=> setNotes(e.target.value)}>
                    {notes}
                  </textarea>
                  <div className="flex flex-row justify-end w-full">
                    <button disabled={notes == ""} 
                      className={`text-xs bg-brand-green mt-4 pt-2 pb-2 pl-4 pr-4 text-white self-center rounded-sm drop-shadow-lg mb-4
                                ${!notes ? "bg-gray-500": ""}
                                `} 
                      onClick={handleNotesSave}>Save Notes</button>
                  </div>
                </div>
                {isUpdateableStatus ?
                  <div className="flex gap-4 self-end text-sm">
                    <button className="font-bold bg-gray-500 mt-4 pt-2 pb-2 pl-4 pr-4 text-white self-center rounded-sm drop-shadow-lg mb-4" onClick={() => setSelectedRow(null)}>Close</button>
                    <button className="font-bold bg-brand-red mt-4 pt-2 pb-2 pl-4 pr-4 text-white self-center rounded-sm drop-shadow-lg mb-4" onClick={()=> setIsRejectionOpen(true)}>Reject</button>
                    <button className="font-bold bg-brand-green mt-4 pt-2 pb-2 pl-4 pr-4 text-white self-center rounded-sm drop-shadow-lg mb-4" 
                      onClick={handleApprovedClick}>Approve</button>
                  </div>
                  : 
                  <div className="flex gap-4 self-end text-sm">
                    <button className="font-bold bg-brand-red mt-4 pt-2 pb-2 pl-4 pr-4 text-white self-center rounded-sm drop-shadow-lg mb-4" onClick={() => setSelectedRow(null)}>Close</button>
                  </div>
                }
              </DialogPanel>
            </div>
          </Dialog>
          <RejectionModal event={events[selectedRow]} isOpen={isRejectionOpen} setIsOpen={setCloseAllRejectionTabs} notes={notes}/>
        </div>
      }
    </div>
  )
}

const PackageDisplay = ({eventPackage}: {eventPackage: PackageDetailsDto}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between m-2">
        <div className="flex flex-row items-center w-2/3">
          <span className="flex flex-row items-center">
            <InboxStackIcon className="w-4 h-4"/>
            <span className="ml-2 mr-2">
              Name:
            </span>
          </span>
          <span className="italic font-medium bg-white p-2 pl-4 pr-4 ml-4 drop-shadow-md w-full text-center rounded-md">
            {eventPackage.title}
          </span>
        </div>
        <div className="rounded-full bg-brand-600/50 h-16 w-16 text-center mr-8 flex justify-center items-center drop-shadow-md">
          <span className="text-4xl drop-shadow-lg"
          >
            {eventPackage.icon}
          </span>
        </div>
      </div>
      <div className="flex flex-col m-2">
        <span className="flex flex-row items-center mb-2">
          <PuzzlePieceIcon className="w-4 h-4"/>
          <span className="ml-2 mr-2">
            Includes:
          </span>
        </span>
        <span className="italic font-medium bg-white p-2 pl-4 pr-4 rounded-sm drop-shadow-md flex flex-col">
          {eventPackage.includes.map((item, key) => {
            return (
              <span key={key} className="font-medium pt-1">
                - {item}
              </span>
            )
          })}
        </span>
      </div>
    </div>
  )
}

const DashboardCard = ({text, icon, value, filterValue}
  : {text: string, icon: any, value: number, filterValue: string}) => {

  return (
    <div className="w-1/3 p-2 m-2 bg-white flex flex-col rounded-sm justify-around items-center h-1/2 cursor-pointer
      drop-shadow-md
      " 
      onClick={() => {console.log(filterValue)}}>
      <div className="flex flex-row items-center text-nowrap">
        {icon}
        <label className="text-gray-700 font-semibold ml-2">{text}</label>
      </div>
      <label className="font-extrabold mr-4">
        {value}
      </label>
    </div>
  )
}

/**
 * A Modal that comes over everything when a event will be rejected.
 */
const RejectionModal = ({event, isOpen, setIsOpen, notes}:{event: any, isOpen: boolean, setIsOpen: any, notes: string}) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionError, setShowRejectionError] = useState<boolean>(false);

  const handleRejectedClick = async () => {
    setShowRejectionError(false);

    if (!rejectionReason) {
      setShowRejectionError(true);
      return
    }

    if (event && rejectionReason) {
      const requestObject = {
        confirmationID: event.confirmationId,
        status: REJECTED_BUTTON_ID,
        rejectionReason: rejectionReason,
        notes: notes,
      }

      try {
        const {data} = await httpService.post('/events', requestObject);
        toast.success("Event was Rejected.")
      } catch (err) {
        toast.error("Unable to Reject Event at this time \n Please try again at a later time.")
      }
    }
    setIsOpen(false);
  }

  return (
    <Dialog 
      open={isOpen} 
      onClose={() => setIsOpen(false)} 
      className="relative z-50 w-full h-full">
      <DialogBackdrop className="fixed inset-0 bg-black/80" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-[50%] h-[90%] max-w-[1080px] max-h-fit border bg-white p-12 flex flex-col justify-between text-gray-700 rounded-lg">
          <DialogTitle>
            Are You Sure You Would Like to Reject This Event?
          </DialogTitle>
          <label className={`mt-2 font-light text-sm mb-2 ${showRejectionError ? "text-brand-red": ""}`}>
            Rejection Reason
          </label>
          <textarea className={`bg-gray-100 resize-none ${showRejectionError ? "border-brand-red border-2": ""}`}
            cols={50} rows={5} onChange={(e) => setRejectionReason(e.target.value)}/>
          <button className="font-bold bg-brand-red mt-4 pt-2 pb-2 pl-4 pr-4 text-white self-center rounded-sm drop-shadow-lg mb-4" onClick={handleRejectedClick}>
            Reject Event
          </button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
