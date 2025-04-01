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
    <div className="flex flex-col items-center w-3/4 mt-12 text-sm text-gray-700 lg:text-[16px]">
      <span className="font-semibold text-md lg:text-lg">
        Frequently Asked Questions
      </span>
      {questions.map((question, index) => {
          return (
          <div className="w-full h-full flex flex-col justify-center items-center mt-4" key={index}>
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
    <div className="flex flex-col text-left h-fit w-full md:2/3 lg:w-2/3 m-2 hover:cursor-pointer" key={faQuestion.id} 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-row font-medium justify-start border-b-gray-300 border-b-2">
        <button onClick={() => setIsOpen(!isOpen)} className="mr-4">
          <ChevronDownIcon className="h-3 w-3" />
        </button>
        {index + 1}. {faQuestion.question}
      </div>
      {isOpen && 
        <div className="p-4 text-xs bg-white">
          {faQuestion.answer}
        </div>
      }
    </div>
  )
}
