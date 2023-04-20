import { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { Rating } from "@mui/material";



function StarRatingEdit({userBook, onUpdateBook, onUpdateUser }) {

  const { currentUser } = useContext(UserContext);

  const [rating, setRating] = useState(userBook.rating);

  const handleRatingChange = () => {
    fetch(`/reading_lists/${userBook.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({rating: rating}),
      }).then(r => r.json())
      .then(data => {
          onUpdateUser(currentUser.id)
          onUpdateBook(userBook.book_id)
      })

  }

  return (
  
    <span>
         <Rating
        name="simple-controlled"
        value={userBook.rating}
        onChange={(e) => {
          setRating(e.target.value);
          handleRatingChange()
        }}
      />
    </span>
  
    
  );
}
export default StarRatingEdit;