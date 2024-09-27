import { PlusCircleIcon, TrashIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, {useState} from "react"
import { useNavigate } from "react-router-dom";

export const Links = () => {

  const navigate = useNavigate();

  const [links, setLinks] = useState<{title: string, url: string}[]>([]);
  const [title, setTitle]  = useState('');
  const [url, setUrl] = useState('');
 
  const handleNewLink = () => {
    setLinks((curr) => [...curr, {title, url}])
  }

  const handleRemoveLink = (index: number) => {
    setLinks((curr) =>  {
      return [...curr.slice(0, index), ...curr.slice(index+1)]
    });
  }

  const navigateToNext = () => {
    console.log('todo; save user links')
    console.log(links)
    navigate("/signup/stripe")
  }

  return (
  <div className="w-screen h-screen flex flex-col justify-between items-center">
      <div>
        <div>
          Add Your Links
        </div>
        {/* Text Area to Add Links*/}
        <div className="w-1/3 text-lg">
          <div className="flex flex-row justify-center mt-8">
            <div className="flex flex-col mr-8">
              <label className="self-start mb-2">Title</label>
              <input type='text' placeholder="Instagram..." className="mb-8 p-2"
              onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col ml-8">
              <label className="self-start">Url</label>
              <input type='text' placeholder="www.Instagram.com" className="mb-8 p-2"
              onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button className="flex flex-col ml-8 items-center justify-center" onClick={handleNewLink}>
              <PlusCircleIcon className="h-8 w-8"/>
            </button>
          </div>
        </div>
      </div>
      {/* Display Area with all the Links*/}
      <div>
        {links.map((link, index) => {
          return (
            <div key={index} className="p-4 m-4 flex flex-row">
              <div className="mr-4">
                {link.title}
              </div>
              <div className="ml-4">
                {link.url}
              </div>
              <TrashIcon className="h-7 w-7 ml-4" onClick={() => handleRemoveLink(index)} />
            </div>
          )
        })}

      </div>
      {/* Continue Button or Skip button if no links set*/}
      <div>
          <div onClick={() => navigateToNext()} 
            className="bg-[#047460] text-white p-2 rounded-xl w-32 flex flex-row items-center justify-center drop-shadow-lg 
            hover:text-[#047460] hover:bg-[#FAFAFA] mb-10">
            <button type="submit">
              Next
            </button>
            <ArrowRightIcon className="ml-2 w-4 h-7"/>
          </div>
      </div>
  </div>
  )
}
