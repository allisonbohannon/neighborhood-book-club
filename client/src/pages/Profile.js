import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User';
import ProfileData from '../components/ProfileData';
import ProfileEdit from '../components/ProfileEdit';
import UserCard from '../components/UserCard';
import { Container } from '../styles';
import { Grid, Typography } from '@mui/material';


const Profile = ({onUpdateUser}) => {

    const { currentUser } = useContext(UserContext)

    const [edit, setEdit] = useState(false)

    const displayFollowers = currentUser.following_relationships.map(follower => {
        return (<li key={follower.id} style={{listStyle:'none'}}><UserCard user={follower.following} onUpdateUser={onUpdateUser}/> </li>)
    }); 

    const displayFollowing = currentUser.following_relationships.map(following => {
        return (<li key={following.id} style={{listStyle:'none'}}><UserCard user={following.follower} onUpdateUser={onUpdateUser}/></li>)
    })

    return (
    <Container>
            {edit === false? <ProfileData setEdit={setEdit} /> : <ProfileEdit onUpdateUser={onUpdateUser} setEdit={setEdit} />}
            <br></br>
            <Grid container textAlign="center" spacing={8}>
            <Grid item xs={6} gutter >
                <Typography variant="h4" >Followers</Typography>
                <br></br>
                {displayFollowers}
            </Grid>
            <Grid item xs={6}  >
                <Typography variant="h4">Following</Typography>
                <br></br>
                {displayFollowing}
            </Grid>
        </Grid>

    </Container>
    )

}    

export default Profile