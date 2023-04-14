import React, {useContext} from 'react'
import { Box, Paper, Grid } from '@mui/material'
import { Container } from '../styles'
import { UserContext } from '../context/User'
import { textAlign } from '@mui/system'
import MyBookCard from '../components/MyBookCard'

const MyBooks = ({books, users, onUpdateUser}) => {

    console.log(books)

    const { currentUser, setCurrentUser } = useContext(UserContext)

    const displayUser = users.find(user => user.id === currentUser.id)
  
    const displayReadList = displayUser.reading_lists.filter(item => item.read_status === "Have read")
        .map(item=> {
            return <li key={item.id} style={{listStyle:"none"}}><MyBookCard item={item} onUpdateUser={onUpdateUser} /></li>
    });

    const displayWantList = displayUser.reading_lists.filter(item => item.read_status === "Want to read")
        .map(item=> {
            return <li key={item.id} style={{listStyle:"none"}}><MyBookCard item={item} onUpdateUser={onUpdateUser} /></li>
    });

  return (
    <Container>
         <Grid container textAlign="center">
            <Grid item xs={5} styles >
                <h1>Have Read</h1>
                {displayReadList}
            </Grid>
            <Grid item xs={5}  >
                <h1>Want to Read</h1>
                {displayWantList}
            </Grid>
        </Grid>
    </Container>
  )
}

export default MyBooks