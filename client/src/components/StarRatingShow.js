import React from "react";
import { Rating } from "@mui/material";


function StarRatingShow({ rating }) {

  return (
    <span>
      <Rating name="read-only" value={rating}  precision={0.5} readOnly/>
    </span>
  );
}
export default StarRatingShow;