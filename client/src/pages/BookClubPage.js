import React, { useContext, useState } from 'react'
import NewMessage from '../components/NewMessage';
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/User';
import { Box } from '@mui/system';
import { Paper, Card, Button, List, IconButton } from '@mui/material';
import { Container } from '../styles';
import AddCommentIcon from '@mui/icons-material/AddComment';
import MessageCard from '../components/MessageCard';


const BookClubPage = ({ bookClubs, onUpdateBookClub, onUpdateUser }) => {

  const { bookClubId } = useParams();
  const { currentUser } = useContext(UserContext); 
  const navigate = useNavigate()

  const [showInput, setShowInput] = useState(false)

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
      return <li key={message.id}><MessageCard member={member} message={message} admin={displayClub.admin} onUpdateBookClub={onUpdateBookClub} clubId={displayClub.id} /></li>
   })})

  return (
    <Container >
      <Box style={{display:"flex", justifyContent:"space-around"}}>
        <Card variant="outlined">
          <p>{displayClub.book.title}</p>
        </Card>
        <Box textAlign={'center'}>
          <Button onClick={() => {navigate(`/bookclubs/${bookClubId}/members`)}}>View Members ({displayClub.total_members})</Button>
          <Button onClick={handleUpdateMembership}>{userMemberStatus === "Active"? "Leave Club" :"Join Club"}</Button>
        </Box>
      </Box>
      <br></br>
      <Box>
        <Box textAlign={'center'} style={{backgroundColor:'blue', color:"white"}}>
            <p style={{display:"inline-block"}}>Book Club Message Board - No Spoilers!</p>
            <IconButton onClick={()=> setShowInput(true)} style={{display:"inline-block", float:"right"}} >
              <AddCommentIcon color="primary" fontSize='large' />
            </IconButton>
        </Box>
        <Paper variant="outlined" styles={{minWidth:"80%", maxWidth:"80% "}}>
          {showInput? <NewMessage memberId={userMember.id} clubId={displayClub.id} onUpdateBookClub={onUpdateBookClub} setShowInput={setShowInput} /> : ""}
          <List>{displayMessages}</List>
        </Paper>
      </Box>
    </Container>

  )
}

export default BookClubPage