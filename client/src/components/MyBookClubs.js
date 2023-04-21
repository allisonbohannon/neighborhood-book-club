import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import BookClubCard from './BookClubCard'
import { Container } from '../styles'

const MyBookClubs = ({bookClubs, users, onUpdateBookClub, onUpdateUser}) => {

    const { currentUser } = useContext(UserContext)

    const displayList = currentUser.book_club_members.map(userClub => {
        const displayClub = bookClubs.find(club => userClub.book_club_id === club.id) 
        console.log(displayClub)
        if (displayClub) {
            return (<li key={displayClub.id} style={{listStyle:'none'}}><BookClubCard club={displayClub} book={displayClub.book} /></li>)
        }
       
    })

    

  return (
    <Container>
         <div>{displayList}</div>
    </Container>
   
  )
}

export default MyBookClubs