import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User';
import ProfileData from '../components/ProfileData';
import ProfileEdit from '../components/ProfileEdit';
import UserCard from '../components/UserCard';
import { Container } from '../styles';
import { Button, Grid, Typography } from '@mui/material';


const Profile = ({onUpdateUser}) => {

    const { currentUser } = useContext(UserContext)


    const [edit, setEdit] = useState(false)
    const [display, setDisplay] = useState('')

    const displayFollowers = currentUser.following_relationships.map(follower => {
        return (<li key={follower.id} style={{listStyle:'none'}}><UserCard user={follower.follower} onUpdateUser={onUpdateUser}/> </li>)
    }); 

    const displayFollowing = currentUser.follower_relationships.map(following => {
        return (<li key={following.id} style={{listStyle:'none'}}><UserCard user={following.following} onUpdateUser={onUpdateUser}/></li>)
    })


    return (
    <Container>
            {edit === false? <ProfileData setEdit={setEdit} /> : <ProfileEdit onUpdateUser={onUpdateUser} setEdit={setEdit} />}
            <br></br>
            <span style={{display:'flex', justifyContent:'space-evenly'}}>
                <Button onClick={(e) => setDisplay(e.target.value)} value="Followers">Followers: {currentUser.following_count}</Button>
                <Typography> | </Typography>
                <Button onClick={(e) => setDisplay(e.target.value)} value="Following">Following: {currentUser.follower_count}</Button>
            </span>
            <Grid item xs={8} gutter textAlign={'center'} >
                <Typography variant="h4" >{display}</Typography>
                <br></br>
                {display === "Followers"? displayFollowers : ''}
                {display === "Followings"? displayFollowing : ''}
            </Grid>
    </Container>
    )

}    

export default Profile