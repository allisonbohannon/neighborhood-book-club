import { FaStar } from "react-icons/fa";

function Star({ filled, onClick }) {
  return (
    <FaStar 
     color={filled ? "rgb(101,62,82)" : "lightgray"} 
     onClick={onClick} />
  );
}
export default Star;