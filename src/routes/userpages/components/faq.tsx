import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../../services/http.service";
import { Questions } from "../dtos/questions.dto";

export const FAQS = ({username} : {username: string}) => {

  const navigate = useNavigate();
  const {user} = useParams();
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

  const handleGoToFAQs = () => {
    navigate(`/${user}/faqs`)
  }

  return (
      <div className="flex flex-col items-center w-[90%] md:max-w-[50%] lg:max-w-[50%] mt-4 text-sm text-gray-700 lg:text-[16px] bg-gray-100 pt-8 pb-8 pr-4 pl-4 rounded-sm drop-shadow-md">
      <span className="font-bold text-lg lg:text-lg">
        Frequently Asked Questions
      </span>
      {questions.length > 0 ? 
      questions.map((question, index) => {
          return (
          <div className="w-full h-full flex flex-col justify-center items-center mt-2 mb-1" key={index}>
            <FAQ index={index} faQuestion={question} />
          </div>
          )
        })
        : null
      }
      <button 
        className="w-fit  max-w-72 pl-4 pr-4 rounded-xl font-bold text-white pt-4 pb-4 drop-shadow-md
        bg-brand-800 hover:bg-gray-400 hover:text-gray-700 mt-4"
        onClick={handleGoToFAQs}
      >
          See All FAQs 
      </button>
    </div>
  )
}

const FAQ = ({index, faQuestion}: {index: number, faQuestion: Questions}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col text-left bg-gray-50 h-fit w-full md:2/3 lg:w-2/3 hover:cursor-pointer drop-shadow-lg rounded-sm" key={faQuestion.id} 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`flex flex-row font-bold justify-between ${isOpen && "border-b-2 ml-1 mr-1"} pb-2 bg-gray-50 p-2 ${isOpen ? "rounded-t-sm" : "rounded-sm"}`}>
        <span>
          {index + 1}. {faQuestion.question}
        </span>
        <button onClick={() => setIsOpen(!isOpen)} className="mr-4">
          { !isOpen ? 
            <ChevronDownIcon className="h-3 w-3" />
            :
            <ChevronUpIcon className="h-3 w-3" />
          }
        </button>
      </div>
      {isOpen && 
        <div className="pt-2 pb-4 pl-4 pr-4 text-sm font-medium text-gray-700">
          {faQuestion.answer}
        </div>
      }
    </div>
  )
}
