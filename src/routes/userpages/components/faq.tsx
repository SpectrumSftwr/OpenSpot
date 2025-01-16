import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Questions } from "../dtos/questions.dto";

export const FAQS = ({username} : {username: string}) => {
  console.log(`TODO: Fetch Users FAQ for ${username}`);

  const questions = [
    {
      id: 0,
      question: "What types of events do you specialize in?",
      answer:"We specialize in creating unforgettable experiences for weddings, corporate events, birthday parties, school dances, and more! Whether you’re planning an elegant wedding or a lively birthday bash, our team tailors our services to fit the vibe and make your event truly special."
    },
    {
      id: 1,
      question: "How far in advance should I book your services?",
      answer:"We’d love to check for you! Please share your event date and location, and we’ll confirm availability as soon as possible. Our calendar fills up quickly, so don’t wait too long to reach out!"
    },
    {
      id: 2,
      question: "Do you travel for events? Are there additional costs for travel?",
      answer:"To secure your desired date, we recommend booking 6-12 months in advance for weddings and other major events. For smaller gatherings, 2-3 months is usually sufficient. However, we’re happy to accommodate last-minute bookings if our schedule allows—just ask!"
    },
  ]

  return (
    <div className="flex flex-col items-center w-3/4 mt-12 text-sm text-gray-700 lg:text-[16px]">
      <span className="font-semibold text-md lg:text-lg">
        Frequently Asked Questions
      </span>
      {questions.map((question, index) => {
          return (
          <div className="w-full h-full flex flex-col justify-center items-center mt-4" key={index}>
            <FAQ faQuestion={question} />
          </div>
          )
        })
      }
    </div>
  )
}

const FAQ = ({faQuestion}: {faQuestion: Questions}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <div className="flex flex-col text-left h-fit w-full md:2/3 lg:w-2/3 m-2 hover:cursor-pointer" key={faQuestion.id} 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-row font-medium justify-start border-b-gray-300 border-b-2">
        <button onClick={() => setIsOpen(!isOpen)} className="mr-4">
          <ChevronDownIcon className="h-3 w-3" />
        </button>
        {faQuestion.id + 1}. {faQuestion.question}
      </div>
      {isOpen && 
        <div className="p-4 text-xs bg-white">
          {faQuestion.answer}
        </div>
      }
    </div>
  )
}
