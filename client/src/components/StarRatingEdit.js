import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { Rating } from "@mui/material";



function StarRatingEdit({userBook, onUpdateBook, onUpdateUser }) {

  const { currentUser } = useContext(UserContext);

  const [userRating, setUserRating] = useState(userBook.rating);

  const handleRatingChange = (e) => {
    fetch(`/reading_lists/${userBook.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({rating: e.target.value}),
      }).then(r => r.json())
      .then(data => {
          onUpdateUser(currentUser.id)
          onUpdateBook(data.book.id)
      })

  }

  return (
  
    <span>
         <Rating
        name="size-medium"
        value={userRating}
        precision={0.5}
        onChange={(e) => {
          setUserRating(e.target.value);
          handleRatingChange(e)
        }}
      />
    </span>
  
    
  );
}
export default StarRatingEdit;