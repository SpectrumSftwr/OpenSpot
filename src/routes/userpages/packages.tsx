import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../services/http.service";
import { useEnsureBookingContext } from "./hooks/useEnsureBookingContext";
import { BookingContext } from "./layouts/bookingslayout";

export const Packages = () => {
  const {user} = useParams();
  const navigate = useNavigate();

  const [userPackages,setUserPackages] = useState<packageDto[]>([]);
  const bookingContext = useContext(BookingContext);
  const [packageChoiceId, setPackageChoiceId] = bookingContext.packageChoiceId;
  const [expandedId, setExpandedId] = useState(packageChoiceId);
  const [error, setError] = useState(false);

  const [, _setCurrentStep] = bookingContext.currentStep;

  useEnsureBookingContext(2);

  const fetchUserPackage = async () => {
    try {
      const { data } = await httpService.get(`/userpage/packages/${user}`)
      setUserPackages(data)
    } catch {

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPackageChoiceId(expandedId)

    if (expandedId === -1) {
      setError(true)
      return;
    }

    _setCurrentStep(3)
    navigate('../personalinfo')
  }

  useEffect(() => {
    fetchUserPackage()
  }, [])


  return (
    <div className="h-full w-screen flex flex-col items-center">
      <div className={`mt-4 flex flex-col font-semibold text-gray-700 text-center ${error ? "text-red-500 font-bold" : ""}`}>
        <span>Select an Event Package </span>
        <span className="italic text-xs">or</span> 
        <span>Build A Package</span>
      </div>
      <div className="flex flex-wrap w-full md:w-3/4 lg:w-4/5 flex-row justify-center">
        {userPackages.map((currentPackage, index) => {
          return (
            <PackageComponent key={index} packageInfo={currentPackage} currentSelectedPackageId={expandedId} onClick={(id: number) => {
              setPackageChoiceId(id); 
              setExpandedId(id);
            }} />
          )
        })}
        {/* TODO: Create a Custom Option This will be available to those that set a la cart items and price will be TBD */}
      </div>
      <form onSubmit={handleSubmit} className="relative bottom-2 w-2/3">
        <div className="flex justify-around mt-8 space-x-2 w-full">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={() => {
              _setCurrentStep(1)
              navigate(-1)
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-brand-700 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        </div>        
      </form>
    </div>
  )
}

const PackageComponent = ({packageInfo, currentSelectedPackageId, onClick}: 
  {
    packageInfo: packageDto,
    currentSelectedPackageId: number
    onClick: (id: number) => void
  }) => {

  const [showOpenForScreenSize, setShowOpenForScreenSize] = useState(false);

  const handleExpandClick = () => {
    onClick(packageInfo.id)
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowOpenForScreenSize(true);
      } else {
        setShowOpenForScreenSize(false);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)
  },[])

  return (
    <div className="w-96 md:w-1/3 px-4 pt-4 items-center">
      <div
        className={`rounded-sm p-4 max-w-sm cursor-pointer transition-shadow h-full ${
                  currentSelectedPackageId === packageInfo.id
                  ? "shadow-md border-blue-600 border-2"
                  : "shadow-md border-gray-100 border-2"
                  }`}
        onClick={handleExpandClick}
      >
        <div className="flex justify-between items-center flex-col">
          <div className="flex items-center">
            {/* Render the emoji icon */}
            <span className="text-2xl mr-4">{packageInfo.icon}</span>

            <div className="flex flex-row text-center items-center">
              <div className="text-lg font-bold">{packageInfo.title}</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-sm mr-2">Starting at ${packageInfo.price.toFixed(2)}</div>

            {/* Chevron icon (unicode character) */}
            <span
              className={`text-xl transform transition-transform select-none ${
              currentSelectedPackageId === packageInfo.id ? "rotate-180" : "rotate-0"
              } md:hidden lg:hidden`}
            >
              <ChevronDownIcon className="w-2 h-2"/>
            </span>
          </div>
        </div>
        {/* Expandable details */}
        {(currentSelectedPackageId === packageInfo.id || showOpenForScreenSize)  && (
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-normal">
              {packageInfo.description}
            </span>
            <div className="flex font-normal text-gray-900 drop-shadow-sm border-t justify-center mt-4">
              <ul className="flex flex-col mt-4">
                {packageInfo.includes.map((includedItem, index) => {
                  return (
                      <li key={index} className="text-sm p-2 flex flex-row ">
                        <span className="mr-1">-</span>
                        <span>
                          {includedItem}
                        </span>
                      </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>  );
}

interface packageDto {
  id: number,
  icon: string,
  title: string,
  duration: number,
  price: number, 
  description: string,
  includes: string[],
}
