import React, { useContext, useState } from 'react';  
import { Link } from 'react-router-dom';
import { UserContext } from '../context/User';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People'; //two people
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



const UserCard = ({user, onUpdateUser}) => {  

const { currentUser } = useContext(UserContext)
    
let followingCheck; 
if (currentUser.following_relationships.find( relationship => relationship.follower.id === user.id )) {
    followingCheck = true
} else {
    followingCheck = false
}

let followerCheck; 
if (currentUser.follower_relationships.find( relationship => relationship.following.id === user.id )) {
    followerCheck = true
} else {
    followerCheck = false
}


let relationshipCheck; 
if (followerCheck || followingCheck) {
    relationshipCheck = true;
} else {
    relationshipCheck = false;
};

let mutualsCheck; 
if (followerCheck && followingCheck) {
    mutualsCheck = true; 
} else {
    mutualsCheck = false; 
};

const [ follower, setFollower ] = useState(followerCheck)
const [ following, setFollowing ] = useState(followingCheck)
const [ relationship, setRelationship ] = useState(relationshipCheck)
const [ mutuals, setMutuals ] = useState(mutualsCheck)
const [followerCount, setFollowerCount] = useState(user.following_count)


const handleUpdateFollow = () => {
        if ( following === true ) {
            fetch(`/users/${user.id}/unfollow`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              }).then(r => r.json())
              .then(data => {
                  setFollowing(false)
                  setFollowerCount(followerCount => followerCount - 1)
                  onUpdateUser(currentUser.id)
                  onUpdateUser(user.id)
              })
          } else {
            fetch(`/users/${user.id}/follow`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }).then(r => r.json())
            .then(data => {
                setFollowing(true)
                setFollowerCount(followerCount => followerCount + 1)
                onUpdateUser(currentUser.id)
                onUpdateUser(user.id)
            })
    }
}

  
 return (

        <Card variant="outlined" sx={{m:'1em'}}>
            <CardContent >
                <Box sx={{display:'flex', justifyContent:'space-between', padding:'1em'}}>
                    <Typography variant="h5" ><Link to={`/~users/${user.username}`} style={{color:'gray', textDecoration:'none' }}>{user.username}</Link></Typography>
                    <Box sx={{display:"flex", float:'right'}}>
                        <IconButton>
                            {relationship === true? <PeopleIcon /> : ''}
                        </IconButton>
                        <IconButton onClick={handleUpdateFollow}>
                            {following === true? <PersonRemoveIcon /> : <PersonAddIcon />}
                        </IconButton>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {user.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary">Books Read: </Typography>
                <Typography variant="body2" color="text.secondary">Book Clubs Joined: </Typography>
                <Typography>Followers: {followerCount} | Following: {user.follower_count}</Typography>
            </CardContent>
        </Card>

  )
}

export default UserCard