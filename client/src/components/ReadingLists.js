import React from 'react'
import MyBookCard from '../components/MyBookCard'
import { Grid, Typography } from '@mui/material'
import { Container } from '../styles'

const ReadingLists = ({user, onUpdateBook, onUpdateUser}) => {

     const displayList = (status) => {
        return user.reading_lists.filter(item => item.read_status === status)
         .map(item=> {
            return <li key={item.id} style={{listStyle:"none"}}><MyBookCard book={item.book} onUpdateUser={onUpdateUser} onUpdateBook={onUpdateBook} /></li>
    })};

  return (
     <Container style={{width:'100%'}}>
         <Grid container textAlign="center" spacing={8}>
            <Grid item xs={5} gutter >
                <Typography variant="h4" >Read</Typography>
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

export default ReadingLists