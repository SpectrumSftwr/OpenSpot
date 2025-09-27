import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import httpService from "../../../services/http.service";
import { Questions } from "../dtos/questions.dto";

export const FAQS = ({username} : {username: string}) => {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchUserFaqs = async () => {
      try {
        const url = `/userpage/faq/${username}`
        let {data} = await httpService.get(url);
        if (data) {
          setQuestions(data);
        } else {
          setQuestions([])
        }
      } finally {
      }
    }

    fetchUserFaqs();
  },[username])

  return (
      <div className="flex flex-col items-center w-[90%] md:max-w-[50%] lg:max-w-[50%] mt-12 text-sm text-gray-700 lg:text-[16px] bg-gray-100 pt-8 pb-8 pr-4 pl-4 rounded-sm drop-shadow-md">
      <span className="font-bold text-lg lg:text-lg">
        Frequently Asked Questions
      </span>
      {questions.length > 0 ? 
      questions.map((question, index) => {
          return (
          <div className="w-full h-full flex flex-col justify-center items-center mt-2 mb-2" key={index}>
            <FAQ index={index} faQuestion={question} />
          </div>
          )
        })
        : null
      }
    </div>
  )
}

const FAQ = ({index, faQuestion}: {index: number, faQuestion: Questions}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <div className="flex flex-col text-left h-fit w-full md:2/3 lg:w-2/3 m-2 hover:cursor-pointer bg-gray-50 drop-shadow-lg rounded-sm" key={faQuestion.id} 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`flex flex-row font-bold justify-start ${isOpen && "border-b-2 ml-1 mr-1"} pb-2 bg-gray-50 p-2 ${isOpen ? "rounded-t-sm" : "rounded-sm"}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="mr-4">
          { !isOpen ? 
            <ChevronDownIcon className="h-3 w-3" />
            :
            <ChevronUpIcon className="h-3 w-3" />
          }
        </button>
        {index + 1}. {faQuestion.question}
      </div>
      {isOpen && 
        <div className="pt-2 pb-4 pl-4 pr-4 text-sm font-medium text-gray-700">
          {faQuestion.answer}
        </div>
      }
    </div>
  )
}
