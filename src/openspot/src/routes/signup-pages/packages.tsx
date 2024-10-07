import React , {useContext, useEffect, useState} from "react"
import { StepContext } from "../../layouts/signupflowlayout"
import { ArrowRightIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';

interface Package {
  title: string;
  icon: string;
  description:string[];
  price: number; 
}

export const PackagesSetup = () => {
  const {activeStep, setActiveStep} = useContext(StepContext)
  const navigate = useNavigate();

  const testPackages: Package[] = [
    {
      title: "Bronze",
      icon: '🤯',
      description: [
        "Up to 4 Hours of Dj Service",
        "Basic Lighting And Sound",
        "Setup and Tear down before and after event",
        "PreEvent Alignment Meeting",
        "All The Music You would ever want",
      ],
      price: 899
    },
    {
      title: "Silver",
      icon: '🤫',
      description: [
        "Up to 5 Hours of Dj Service",
        "Uplighting and Event Lighting",
        "Setup and Tear down before and after event",
        "PreEvent Alignment Meeting",
        "All The Music You would ever want",
      ],
      price: 1699.02
    },
    {
      title: "Gold",
      icon: '🤑',
      description: [
        "Up to 6 Hours of Dj Service",
        "State of the Art Sound System",
        "Lighting, Uplighting, and Event Party Lighting included",
        "PreEvent Alignment Meetinhg",
        "All The Music You would ever want",
      ],
      price: 2399.00
    }
  ]
  const [packages, setPackages] = useState<Package[]>(testPackages);
  const [open, setOpen] = useState<boolean>(false)


  const handleOpen = () => {setOpen(true);}
  const handleClose = () => {setOpen(false);}

  useEffect(() => {
    setActiveStep(3)
    setPackages(testPackages)
  },[])

  const handleNavigateToNext = () => {
    navigate("/signup/stripe")
  }

  return (
    <div className="w-full h-[calc(100vh-150px)] flex flex-col justify-between items-center">
      <div className="w-full items-center flex flex-col h-1/5">
        <div className="mt-8 font-semibold ">
          Setup Your Packages
        </div>
        <button type="button" className="flex flex-row items-center text-center mt-2" onClick={handleOpen}>
          <label className="mr-2">Create New Pacakge</label>
          <PlusCircleIcon className="w-8 h-8"/>
        </button>
        <SimpleDiaglog 
          open={open}
          onClose={handleClose} 
        />
      </div>
      <Carousel userPackages={packages} />
      <div onClick={() => handleNavigateToNext()} 
        className="bg-[#047460] text-white p-2 rounded-xl w-24 flex flex-row items-center justify-center drop-shadow-lg 
        hover:text-[#047460] hover:bg-[#FAFAFA] mb-10 text-sm">
        <button type="submit">
          Next
        </button>
        <ArrowRightIcon className="ml-2 w-4 h-7"/>
      </div>
    </div>
  )
}

interface dialogProps {
  open: boolean,
  onClose: (value: string) => void
}
const SimpleDiaglog = (props : dialogProps) => {
  const {onClose, open} = props;

  return (
    <Dialog 
      fullWidth={true}
      maxWidth={false}
      onClose={onClose} 
      className="h-92"
      open={open}>
      <div className="flex flex-col justify-between items-center">
        <div className="mt-12 text-xl font-bold text-center">
          Create New Pacakge
        </div>
        <form className="">
          <div className="flex flex-row m-4">
            <label className="mr-12">Title</label>
            <input className="ml-16" type='text' placeholder="Title"/>
          </div>
          <div className="flex flex-row m-4">
            <label className="mr-12">Add Services</label>
            <input type='text' placeholder="New Service"/>
          </div>
          <div className="flex flex-row m-4">
            <label className="mr-10">Price:</label>
            <input className="ml-16" type='text' placeholder="$XX.XX"/>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

const Carousel = ({userPackages}: {userPackages: Package[]}) => {

  // If no pacakges set show skeletons
  if (!userPackages) {
    return (
      <div className="bg-red-600 h-24">
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center w-full h-1/2">
      {userPackages.map((item, key) => {
        return(
          <div key={key} 
            className="flex flex-col justify-between rounded-xl p-2 drop-shadow-lg bg-white m-2 text-center
            w-1/4 
            ">
            <div className="flex flex-col justify-around">
              <div className="flex flex-col">
                <span className="font-bold text-lg">{item.title}</span>
                <span className="drop-shadow-lg text-3xl">{item.icon}</span>
              </div>
              <ul>
                {item.description.map((desc, index) => {
                  return (
                    <li key={index} className="m-2 text-start text-sm self-start">
                      <span className="m-2">{desc}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <span className="font-extrabold text-xl text-brand-600">${item.price.toFixed(2)}</span>
          </div>
        )
      })}
    </div>
  )
}
