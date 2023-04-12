import { useState } from "react";
import Star from "../styles/Star";


function StarRatingEdit({ onChange, userRating }) {


  const [rating, setRating] = useState(userRating);


  const changeRating = (newRating) => {

    setRating(newRating);
    onChange?.(newRating);
  };

  return (
    <span>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => changeRating(value)}
        />
      ))}
    </span>
  );
}
export default StarRatingEdit;