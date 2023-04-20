import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CardActionArea, Typography } from '@mui/material'
import { UserContext } from '../context/User';



const BookClubCard = ({club}) => {

    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate(); 
    const handleClick = () => {navigate(`bookClubs/${club.id}`)}

  return (
    <CardActionArea onClick={handleClick}>
        <Typography>Check out this club!</Typography>
        <Typography>Total Members: {club.total_members}</Typography>
        <Typography>Active since: {club.created_at} </Typography>
        <Typography sx={{color:'red'}}>{club.admin === currentUser.username ? "ADMIN" : "" }</Typography>
    </CardActionArea>
  )
}

export default BookClubCard