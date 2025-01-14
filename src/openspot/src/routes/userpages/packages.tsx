import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./layouts/bookingslayout";
import { getUrlUser } from "./utility/common";


export const Packages = () => {
  const navigate = useNavigate();

  const [userPackages,setUserPackages] = useState<packageDto[]>([]);
  const bookingContext = useContext(BookingContext);
  const [packageChoiceId, setPackageChoiceId] = bookingContext.packageChoiceId;
  const [expandedId, setExpandedId] = useState(packageChoiceId);
  const [error, setError] = useState(false);

  const fetchUserPackage = () => {
    setUserPackages([
      {
        id: 0,
        icon: '🤩',
        title: 'Basic',
        duration: 4,
        price: 750.00, 
        description: "Short description for each package that will have a max of 100 chars",
        includes: [
          "Consultation",
          "Sound/PA System",
          "Microphones",
          "MC",
          "Up-Lighting",
          "Dance Floor Lighting",
        ],
      },
      {
        id: 1,
        icon: '🤪',
        title: 'PRO',
        duration: 5,
        price: 1400.00, 
        description: "Short description for each package that will have a max of 100 chars",
        includes: [
          "Consultation",
          "Sound/PA System",
          "Microphones",
          "Dance Floor Lighting",
          "MC",
          "Up-Lighting",
          "Dance Floor Lighting",
          "Sound/PA System",
          "MC",
        ],
      },
      {
        id: 2,
        icon: '🤪',
        title: 'PRO',
        duration: 5,
        price: 1400.00, 
        description: "Short description for each package that will have a max of 100 chars",
        includes: [
          "Consultation",
          "Sound/PA System",
          "Microphones",
          "Dance Floor Lighting",
          "MC",
          "Up-Lighting",
          "Dance Floor Lighting",
          "Sound/PA System",
          "MC",
        ],
      },
      {
        id: 3,
        icon: '💸',
        title: 'ELITE',
        duration: 6,
        price: 2400.00, 
        description: "Short description for each package that will have a max of 100 chars",
        includes: [
          "Consultation",
          "Consultation",
          "Sound/PA System",
          "Microphones",
          "MC",
          "Sound/PA System",
          "Microphones",
          "MC",
          "Up-Lighting",
          "Dance Floor Lighting",
        ],
      },
      {
        id: 4,
        icon: '💸',
        title: 'ELITE',
        duration: 6,
        price: 2400.00, 
        description: "Short description for each package that will have a max of 100 chars",
        includes: [
          "Consultation",
          "Consultation",
          "Sound/PA System",
          "Microphones",
          "MC",
          "Sound/PA System",
          "Microphones",
          "MC",
          "Up-Lighting",
          "Dance Floor Lighting",
        ],
      },
      {
        id: 5,
        icon: '💸',
        title: 'ELITE',
        duration: 6,
        price: 2400.00, 
        description: "Short description for each package that will have a max of 100 chars",
        includes: [
          "Consultation",
          "Consultation",
          "Sound/PA System",
          "Microphones",
          "MC",
          "Sound/PA System",
          "Microphones",
          "MC",
          "Up-Lighting",
          "Dance Floor Lighting",
        ],
      },
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPackageChoiceId(expandedId)

    if (expandedId == -1) {
      setError(true)
      return;
    }

    navigate(`/myspot/${getUrlUser()}/bookings/personalinfo`)
  }

  useEffect(() => {
    fetchUserPackage()
  }, [])


  return (
    <div className="h-full w-screen flex flex-col items-center">
      <div className={`mt-4 font-semibold text-gray-700 ${error ? "text-red-500 font-bold" : ""}`}>
        Select an Event Package
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
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
    <div className="w-96 px-8 pt-4 items-center">
      <div
        className={`rounded-lg p-4 max-w-sm cursor-pointer transition-shadow ${
                  currentSelectedPackageId == packageInfo.id
                  ? "shadow-md border-blue-600 border-2"
                  : "shadow-md border-gray-100 border-2"
                  }`}
        onClick={handleExpandClick}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Render the emoji icon */}
            <span className="text-2xl mr-4">{packageInfo.icon}</span>

            <div className="flex flex-row text-center items-center">
              <div className="text-lg font-bold">{packageInfo.title}</div>
              <div className="text-xs text-gray-500 ml-1">
                ({packageInfo.duration} hours)
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-lg font-bold mr-2">${packageInfo.price.toFixed(2)}</div>

            {/* Chevron icon (unicode character) */}
            <span
              className={`text-xl transform transition-transform select-none ${
              currentSelectedPackageId == packageInfo.id ? "rotate-180" : "rotate-0"
              } md:hidden lg:hidden`}
            >
              <ChevronDownIcon className="w-2 h-2"/>
            </span>
          </div>
        </div>

        {/* Expandable details */}
        {(currentSelectedPackageId == packageInfo.id || showOpenForScreenSize)  && (
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-normal">
              {packageInfo.description}
            </span>
            <div className="flex font-thin text-gray-800 drop-shadow-sm border-t justify-center mt-2">
              <ul className="flex flex-wrap mt-2">
                {packageInfo.includes.map((includedItem, index) => {
                  return (
                    <li key={index} className="text-xs w-1/2">
                      - {includedItem}
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
