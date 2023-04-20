import React, {useContext} from 'react'
import { Grid, Typography } from '@mui/material'
import { Container } from '../styles'
import { UserContext } from '../context/User'
import MyBookCard from '../components/MyBookCard'

const MyBooks = ({onUpdateUser, onUpdateBook}) => {

    const { currentUser } = useContext(UserContext) 
  
    const displayList = (status) => {
        return currentUser.reading_lists.filter(item => item.read_status === status)
         .map(item=> {
            return <li key={item.id} style={{listStyle:"none"}}><MyBookCard item={item} onUpdateUser={onUpdateUser} onUpdateBook={onUpdateBook} /></li>
    })};

  return (
    <Container style={{width:'100%'}}>
         <Grid container textAlign="center" spacing={8}>
            <Grid item xs={5} gutter >
                <Typography variant="h4" >Have Read</Typography>
                <br></br>
                {displayList("Have read")}
            </Grid>
            <Grid item xs={5}  >
                <Typography variant="h4">Want to Read</Typography>
                <br></br>
                {displayList("Want to read")}
            </Grid>
        </Grid>
    </Container>
  )
}

export default MyBooks