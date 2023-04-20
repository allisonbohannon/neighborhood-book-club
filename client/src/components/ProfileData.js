import React, { useContext, useState} from 'react'
import { UserContext } from '../context/User';
import { IconButton, Card, Typography,} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProfileData = ({setEdit}) => {

const { currentUser } = useContext(UserContext);

  return (
    <Card sx={{ padding:"3em"}}>
            <IconButton sx={{float:'right'}} onClick={() => setEdit(true)}>
                <EditIcon />
            </IconButton>
            <Typography gutterBottom variant="h5" >My Info: </Typography>
            <br></br>
                <Card sx={{ padding:'.5em', margin:'.5em'}}>
                    <Typography>username: {currentUser.username}</Typography>
                </Card>
                <Card sx={{ padding:'.5em', margin:'.5em'}}>
                    <Typography>first name: {currentUser.first_name}</Typography>
                </Card>
                <Card sx={{ padding:'.5em', margin:'.5em'}}>
                    <Typography>last name: {currentUser.last_name}</Typography>
                </Card>
                <Card sx={{ padding:'.5em', margin:'.5em'}}>
                    <Typography>zipcode: {currentUser.zipcode}</Typography>
                </Card>
                <Card sx={{ padding:'.5em', margin:'.5em'}}>
                    <Typography>email: {currentUser.email}</Typography>
                </Card>
                <Card sx={{ padding:'.5em', margin:'.5em'}}>
                    <Typography>Bio: {currentUser.bio}</Typography>
                </Card>
    </Card>
  )
}

export default ProfileData