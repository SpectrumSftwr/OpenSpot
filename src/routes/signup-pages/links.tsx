import { PlusCircleIcon, TrashIcon, ArrowRightIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import React, {SetStateAction, useState, useRef, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { StepContext } from "../../layouts/signupflowlayout";

export const Links = () => {

  const {activeStep, setActiveStep} = useContext(StepContext)
  useEffect(() => {
    setActiveStep(2)
  },[])

  const navigate = useNavigate();

  const [links, setLinks] = useState<TLink[]>([]);
  const [title, setTitle]  = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [showMaxErrorMessage,setShowMaxErrorMessage] = useState(false);
  const [showUrlRequired, setShowUrlRequired] = useState<boolean>(false);

  const dragLink = useRef<number>(0);
  const draggedOverLink = useRef<number>(0);

  function handleSort() {
    const linkClone = [...links];
    const temp = linkClone[dragLink.current]
    linkClone[dragLink.current]  = linkClone[draggedOverLink.current]
    linkClone[draggedOverLink.current] = temp;
    setLinks(linkClone)
  }

  const handleNewLink = () => {
    setShowUrlRequired(false);
    setShowMaxErrorMessage(false);
    
    // Url Is required.
    if (!url) {
      setShowUrlRequired(true)
      return;
    }

    if (links.length > 3) {
      setShowMaxErrorMessage(true);
      return
    }

    // Title is Optional
    if (!title) {
      // When no title is present just set the title as the URL
      setLinks((curr) => [...curr, {title: url, url: url}])
      return;
    }
     
    setLinks((curr) => [...curr, {title, url}])
  }

  const handleRemoveLink = (index: number) => {
    setShowMaxErrorMessage(false)
    setLinks((curr) =>  {
      return [...curr.slice(0, index), ...curr.slice(index+1)]
    });
  }

  const navigateToNext = () => {
    navigate("/signup/services")
  }

  return (
    <div className="h-[calc(100vh-150px)] flex flex-col justify-between items-center text-gray-700 text-sm mb-10">
      <div className="flex flex-col items-center w-full mt-20">
        <div className="text-lg font-semibold">
          Add Your Links
        </div>
        <div className="text-gray-400 text-sm">
          {!showMaxErrorMessage ?
            <span>
              Max of 4 Links
            </span>
            :
            <span className="font-bold text-lg text-red-800">
              Max of 4 Links
            </span>

          }        
        </div>
        {/* Text Area to Add Links*/}
        <form className="bg-white p-2 w-1/2 drop-shadow-lg mt-2 mb-2 rounded-lg" onSubmit={(e) => {e.preventDefault(); handleNewLink()}}>
          <div className="flex flex-row justify-center mt-4">
            <div className="flex flex-row w-2/3 h-fit">
              <div className="flex flex-col mr-12">
                <label className="self-start mb-1 font-semibold">
                  Title
                </label>
                <input type='text' placeholder="OpenSpot" 
                  className={`mb-4 p-1 border-solid border-2 rounded-lg drop-shadow-md ${showUrlRequired && 'border-red-400'}`}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="self-start mb-1 font-semibold">
                  Link
                </label>
                <input type='text' placeholder="www.openspot.com" 
                  className={`mb-4 p-1 border-solid border-2 rounded-lg drop-shadow-md ${showUrlRequired && 'border-red-400'}`}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="flex flex-col items-center justify-center" onSubmit={handleNewLink}>
              <PlusCircleIcon className="h-7 w-7 text-gray-800 hover:text-gray-300"/>
            </button>
          </div>
        </form>
      </div>
      {/* Display Area with all the Links*/}
      <div className="w-2/5 flex flex-col justify-center items-center">
        <div className="items-start flex-col flex justify-start w-full">
          {links.map((link, index) => {
            return (
              <div className="w-full pl-4 pr-4 h-24">
                <div key={index} 
                  className="p-2 flex flex-row border-solid border-2 drop-shadow-md w-full justify-center 
                  items-center bg-white rounded-lg pointer-events-auto" 
                  draggable
                  onDragStart={() => (dragLink.current = index)}
                  onDragEnter={() => (draggedOverLink.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="flex flex-row w-full divide-x-4">
                    <div className="items-center flex justify-center">
                      <span className="ml-2 font-semibold text-xl mr-2">
                        {index + 1}
                      </span>
                      <EllipsisVerticalIcon className="w-7 h-7"/>
                    </div>
                    <div className="w-full flex flex-row ml-4">
                      <div className="items-start self-start m-4 w-full">
                        <div className="">
                          <span className="font-bold mr-4">
                            Title: 
                          </span>
                          {link.title}
                        </div>
                        <div className="">
                          <span className="font-bold ml-3 mr-4">
                            Url: 
                          </span>
                          {link.url}
                        </div>
                      </div>
                      <TrashIcon className="h-7 w-7 ml-4 self-center" onClick={() => handleRemoveLink(index)} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* Continue Button or Skip button if no links set*/}
      <div className="justify-self-end">
        <div onClick={() => navigateToNext()} 
            className="bg-[#047460] text-white p-2 rounded-xl w-24 flex flex-row items-center justify-center drop-shadow-lg 
            hover:text-[#047460] hover:bg-[#FAFAFA] mb-10 text-sm">
          <button type="submit">
            Next
          </button>
          <ArrowRightIcon className="ml-2 w-4 h-7"/>
        </div>
      </div>
    </div>
  )
}

interface TLink {
  title: string,
  url: string,
}

