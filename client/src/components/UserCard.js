import React from 'react';  
import { CardActionArea, Card, CardContent, Typography, Icon, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People'; //two people
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



const UserCard = ({user}) => {  
    
    const navigate = useNavigate(); 
  
 return (

        <Card variant="outlined">
            <CardContent >
                <Box sx={{display:'flex', justifyContent:'space-between', padding:'1em'}}>
                    <Typography variant="h5" ><Link to={`/users/${user.id}`} sx={{color:"gray", textDecoration:'none' }}>{user.username}</Link></Typography>
                    <Icon>
                        <PeopleIcon />
                    </Icon>

                </Box>
                
                <Typography variant="body2" color="text.secondary">
                    {user.bio}
                </Typography>
            </CardContent>
        </Card>

  )
}

export default UserCard