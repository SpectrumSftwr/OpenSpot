import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import httpService from "../../../services/http.service";
import { Questions } from "../dtos/questions.dto";

export const FAQS = ({username} : {username: string}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchUserFaqs = async () => {
      console.log("fetching faqs" + username);
      try {
        setIsLoading(true);
        const url = `/userpage/faq/${username}`
        let {data} = await httpService.get(url);
        setQuestions(data);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserFaqs();
  },[])

  return (
    <div className="flex flex-col items-center w-3/5 mt-12 text-sm text-gray-700 lg:text-[16px] bg-gray-100 pt-8 pb-8 pr-4 pl-4 rounded-xl drop-shadow-md">
      <span className="font-semibold text-md lg:text-lg">
        Frequently Asked Questions
      </span>
      {questions.map((question, index) => {
          return (
          <div className="w-full h-full flex flex-col justify-center items-center mt-4 mb-4" key={index}>
            <FAQ index={index} faQuestion={question} />
          </div>
          )
        })
      }
    </div>
  )
}

const FAQ = ({index, faQuestion}: {index: number, faQuestion: Questions}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <div className="flex flex-col text-left h-fit w-full md:2/3 lg:w-2/3 m-2 hover:cursor-pointer bg-gray-50 drop-shadow-lg rounded-lg" key={faQuestion.id} 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`flex flex-row font-medium justify-start border-b-gray-300 pb-2 bg-gray-50 p-2 ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="mr-4">
          <ChevronDownIcon className="h-3 w-3" />
        </button>
        {index + 1}. {faQuestion.question}
      </div>
      {isOpen && 
        <div className="pt-2 pb-4 pl-8 pr-4 text-xs text-gray-600">
          {faQuestion.answer}
        </div>
      }
    </div>
  )
}
