import React from "react";
import { Rating } from "@mui/material";


function StarRatingShow({ rating }) {

  return (
    <span>
      <Rating name="disabled" value={rating} disabled />
    </span>
  );
}
export default StarRatingShow;