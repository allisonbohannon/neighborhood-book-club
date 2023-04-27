import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import BookClubCard from '../components/BookClubCard'
import { Container } from '../styles'

const MyBookClubs = ({bookClubs}) => {

    const { currentUser } = useContext(UserContext)

    const displayList = currentUser.book_club_members.map(userClub => {
      if (userClub.status === "Active") {
        const displayClub = bookClubs.find(club => userClub.book_club_id === club.id) 
        if (displayClub) {
            return (<li key={displayClub.id} style={{listStyle:'none'}}><BookClubCard club={displayClub} book={displayClub.book} /></li>)
        }
       }
    })

    

  return (
    <Container>
         <div>{displayList}</div>
    </Container>
   
  )
}

export default MyBookClubs