import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import httpService from "../../services/http.service";

export const UserReviews = () => {
  const {user} = useParams();

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const url = `/userpage/gallery/${user}`
        const {data} = await httpService.get(url);
        console.log(data);
      }finally {

      }
    }

    fetchUserReviews();
  },[])

  return (
    <div>
      Reviews Page for {user}
    </div>
  )
}
