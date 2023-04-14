import { useState } from "react";
import Star from "../styles/Star";


function StarRatingEdit({ onRatingChange, userRating }) {

  const [rating, setRating] = useState(userRating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
  
    <span>
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            filled={value <= rating}
            onClick={() => handleRatingChange(value)}
          />
        ))}
    </span>
  
    
  );
}
export default StarRatingEdit;