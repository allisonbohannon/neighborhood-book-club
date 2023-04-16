import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea } from '@mui/material'


const BookClubCard = ({club}) => {

    const navigate = useNavigate(); 
    const handleClick = () => {navigate(`bookClubs/${club.id}`)}

  return (
    <CardActionArea onClick={handleClick}>
        <p>Check out this club!</p>
        <p>Total Members: </p>
        <p>Active since: {club.created_at} </p>
    </CardActionArea>
  )
}

export default BookClubCard