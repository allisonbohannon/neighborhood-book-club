import React from 'react';  
import { CardActionArea, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const UserCard = ({user}) => {  
    
    const navigate = useNavigate(); 
  
 return (
   <CardActionArea onClick={() => navigate(`/users/${user.id}`)}>
        <Card variant="outlined">
            <CardContent>
                <Typography>{user.username}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {user.bio}
                </Typography>
            </CardContent>
        </Card>
   </CardActionArea>
  )
}

export default UserCard