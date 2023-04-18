import React, {useContext} from 'react'
import { Box, Paper, Grid } from '@mui/material'
import { Container } from '../styles'
import { UserContext } from '../context/User'
import { textAlign } from '@mui/system'
import MyBookCard from '../components/MyBookCard'

const MyBooks = ({onUpdateUser, onUpdateBook}) => {

    const { currentUser } = useContext(UserContext) 
  
    const displayList = (status) => {
        return currentUser.reading_lists.filter(item => item.read_status === status)
         .map(item=> {
            return <li key={item.id} style={{listStyle:"none"}}><MyBookCard item={item} onUpdateUser={onUpdateUser} onUpdateBook={onUpdateBook} /></li>
    })};

  return (
    <Container>
         <Grid container textAlign="center">
            <Grid item xs={5} >
                <h1>Have Read</h1>
                {displayList("Have read")}
            </Grid>
            <Grid item xs={5}  >
                <h1>Want to Read</h1>
                {displayList("Want to read")}
            </Grid>
        </Grid>
    </Container>
  )
}

export default MyBooks