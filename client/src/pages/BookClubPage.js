import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/User';
import { Box } from '@mui/system';
import { Paper, Card, Button, List, ListItem, ListItemText } from '@mui/material';
import { Container } from '../styles';

const BookClubPage = ({ bookClubs, onUpdateBookClub, onUpdateUser }) => {

  const { bookClubId } = useParams();
  const { currentUser } = useContext(UserContext); 

  const displayClub = bookClubs.find(club => club.id === parseInt(bookClubId));

  const userMember = displayClub.book_club_members.find(member => member.user.id === currentUser.id); 
  const [ userMemberStatus, setUserMemberStatus ] = useState(userMember.status)

  const handleUpdateMembership = () => {
    if ( userMember ) {
      let newStatus
      if (userMemberStatus === "Active") {
        newStatus = "Inactive"
      } else {
        newStatus = "Active"
      }
      fetch(`/book_club_members/${userMember.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({status: newStatus}),
        }).then(r => r.json())
        .then(data => {
            setUserMemberStatus(data.status)
            onUpdateBookClub(displayClub.id)
            onUpdateUser(currentUser.id)
        })
    } else {
      fetch("/book_club_members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          book_club: displayClub.id,
          status: "Active"
        }),
      }).then(r => r.json())
      .then(data => {
        setUserMemberStatus(data.status)
        onUpdateBookClub(displayClub.id)
        onUpdateUser(currentUser.id)
      })
     }
  }

  const displayMessages = displayClub.book_club_members.map(member => {
    return member.messages.map(message =>  {
    return (<ListItem key={message.id} >
              <ListItemText primary={message.message} 
                            secondary={`${member.user.username}, ${message.posted_date}`}
                            />
              

            </ListItem>)})})



  return (
    <Container >
      <Box style={{display:"flex", justifyContent:"space-around"}}>
        <Card variant="outlined">
          <p>{displayClub.book.title}</p>
        </Card>
        <Box textAlign={'center'}>
          <Button >View Users ({displayClub.total_members})</Button>
          <Button onClick={handleUpdateMembership}>{userMemberStatus === "Active"? "Leave Club" :"Join Club"}</Button>
        </Box>
      </Box>
      <br></br>
      <Box>
        <Box textAlign={'center'} style={{backgroundColor:'blue', color:"white"}}>Book Club Message Board - No Spoilers!</Box>
        <Paper elevation={3} styles={{minWidth:"80%", maxWidth:"80% "}}>
          <List>{displayMessages}</List>
        </Paper>
      </Box>
    </Container>

  )
}

export default BookClubPage