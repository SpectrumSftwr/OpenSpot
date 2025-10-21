import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../services/http.service";
import { UserTopNavSection } from "./components/TopNavSection";
import { UserContext, useUser } from "./layouts/UserContext";

export const FAQsPage = () => {

  const {user} = useParams();
  const {userType} = useUser();
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState(null)

  useEffect(() => {
    const fetchUserFaqs = async () => {
      try {
        const url = `/userpage/allfaq/${user}`
        const {data} = await httpService.get(url);
        console.log(data);

        if (data && !data['hasError']) {
          setFaqs(data)
        } else {
          setFaqs([])
        }

      } catch {
      }
    }

    fetchUserFaqs();
  },[user])


  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100 h-full w-full">
      <div className="flex justify-center">
          <UserTopNavSection 
            isHome={true} 
            providerName={userType.businessName} 
            providerType={userType.businessType}
            providerOverallRating={null}
            providerTotalRatings={null} 
            profilePicUrl={userType.profilePictureUrl}
            bannerUrl={userType.bannerPicUrl} 
          />
      </div>
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 mt-8 md:mt-16">
          { faqs &&
            faqs.map((faq, index) => {
              return (
                <FAQCard faq={faq} index={index}/>
              )
            })
          }
        </div>
        <div className="w-full flex justify-center mt-8 items-end pr-4 pb-4 bg-gray-100">
          <button
            type="button"
            className="px-4 py-2 bg-brand-800 text-white rounded-md hover:bg-gray-400 ml-8 mb-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

const FAQCard = ({faq ,index}: {faq: any, index: number}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl pt-4 pl-6 pb-4 pr-6 border border-gray-200 w-[95%] m-2" key={index}>
      <div className="font-bold text-lg">
        {faq.question}
      </div>
      <div className="mt-4">
        {faq.answer}
      </div>
    </div>
  );
};
