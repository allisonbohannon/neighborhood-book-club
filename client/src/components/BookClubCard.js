import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, Typography } from '@mui/material'
import { UserContext } from '../context/User';



const BookClubCard = ({club, book}) => {

    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate(); 
    const handleClick = () => {navigate(`/bookClubs/${club.id}`)}

  return (
    <CardActionArea onClick={handleClick} sx={{display:"block"}}>
      <Card sx={{margin:'1em'}}>
        <Typography>Local Book Club for</Typography>
        <Typography variant="h5">{book.title}</Typography>
        <Typography>Total Members: {club.total_members}</Typography>
        <Typography>Active since: {club.created_at} </Typography>
        <Typography sx={{color:'red'}}>{club.admin === currentUser.username ? "ADMIN" : "" }</Typography>
      </Card>
    </CardActionArea>
  )
}

export default BookClubCard