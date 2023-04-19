import { useState } from "react";
import { Rating } from "@mui/material";


function StarRatingEdit({ onRatingChange, userRating }) {

  const [rating, setRating] = useState(userRating);

  return (
  
    <span>
         <Rating
        name="simple-controlled"
        value={rating}
        onChange={(handle, newValue) => {
          setRating(newValue);
          onRatingChange(newValue)
        }}
      />
    </span>
  
    
  );
}
export default StarRatingEdit;