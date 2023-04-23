import React, { useContext, useState } from 'react'
import NewMessage from '../components/NewMessage';
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/User';
import { Box } from '@mui/system';
import { Paper, Button, List, IconButton, Typography } from '@mui/material';
import { Container } from '../styles';
import MyBookCard from '../components/MyBookCard';
import AddCommentIcon from '@mui/icons-material/AddComment';
import MessageCard from '../components/MessageCard';

const BookClubPage = ({ bookClubs, onUpdateBookClub, onUpdateUser, onUpdateBook }) => {

  const { bookClubId } = useParams();
  const { currentUser } = useContext(UserContext); 
  const navigate = useNavigate()

  const [showInput, setShowInput] = useState(false)

  const displayClub = bookClubs.find(club => club.id === parseInt(bookClubId));
 
  let userMember = null; 
  let userMemberStatusCheck = null; 
  if (displayClub.book_club_members.find(member => member.user.id === currentUser.id)) {
    userMember = displayClub.book_club_members.find(member => member.user.id === currentUser.id); 
    userMemberStatusCheck = userMember.status; 
  }

  const [ userMemberStatus, setUserMemberStatus ] = useState(userMemberStatusCheck)
 
  let userBook = null;
  if (currentUser.reading_lists.length >= 1) {
     userBook = currentUser.reading_lists.find(item => item.book_id === displayClub.book.id)
  };

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
      <Box sx={{display:"flex", justifyContent:"space-around", alignItems:'center'}}>
        <Box sx={{width:'40%'}}>
            <Typography> Book club for </Typography>
            <Typography variant="h5">{displayClub.book.title}</Typography>
        </Box>
       
        <Box textAlign={'center'} sx={{display:'flex', width:'40%'}}>
          <Button variant='outlined' sx={{height:'3em', padding:'3em', margin:'3em', width:'40%'}} onClick={() => {navigate(`/bookclubs/${bookClubId}/members`)}}>View Members ({displayClub.total_members})</Button>
          <Button variant='outlined' sx={{height:'3em', padding:'3em', margin:'3em', width:'40%'}} onClick={handleUpdateMembership}>{userMemberStatus === "Active"? "Leave Club" :"Join Club"}</Button>
        </Box> 
      </Box>
      <br></br>
      <Box>
        <Box textAlign={'center'} style={{ display:'flex', justifyContent:'space-between', backgroundColor:'gray', color:"white", alignItems:'center'}}>
            <Typography style={{padding:'1em'}} variant='h5'>Book Club Message Board - No Spoilers!</Typography>
            <IconButton onClick={()=> setShowInput(true)} style={{display:"inline-block", float:"right"}} >
              <AddCommentIcon  sx={{ fontSize:'2em', color:"white" }} />
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