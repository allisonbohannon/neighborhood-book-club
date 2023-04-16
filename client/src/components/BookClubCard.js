import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material'
import { UserContext } from '../context/User';



const BookClubCard = ({club}) => {

    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate(); 
    const handleClick = () => {navigate(`bookClubs/${club.id}`)}

  return (
    <CardActionArea onClick={handleClick}>
        <p>Check out this club!</p>
        <p>Total Members: {club.total_members}</p>
        <p>Active since: {club.created_at} </p>
        <p>{club.admin === currentUser.username ? "ADMIN" : "" }</p>
    </CardActionArea>
  )
}

export default BookClubCard