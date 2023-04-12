import React from "react";
import Star from "../styles/Star";


function StarRatingShow({ rating }) {

  return (
    <span>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
        />
      ))}
    </span>
  );
}
export default StarRatingShow;