import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/User';
import { Box } from '@mui/system';
import { List, Paper, Card, Button } from '@mui/material';
import { Container } from '../styles';

const BookClubPage = ({bookClubs}) => {

  const { bookClubId } = useParams();

  const currentUser = useContext(UserContext); 

  const displayClub = bookClubs.find(club => club.id === parseInt(bookClubId))
  console.log(displayClub)


  return (
    <Container style={{display:"inline-grid"}}>
      <Box style={{displayStyle:"block"}}>
        <Card variant="outlined">
          <p>{displayClub.book.title}</p>
        </Card>
        <Box textAlign={'center'}>
          <Button>View Users ({displayClub.total_members})</Button>
          <Button>Join Club</Button>
        </Box>
      </Box>
      <Box>
        <Paper>
          <List></List>
        </Paper>
      </Box>
    </Container>

  )
}

export default BookClubPage