import React from 'react'
import UserCard from '../components/UserCard'
import { Container } from '../styles'
import { useParams } from 'react-router-dom'
import ReadingLists from '../components/ReadingLists'


const UserPage = ({users, onUpdateUser, onUpdateBook}) => {

  const { username } = useParams(); 
  console.log(users)

  const displayUser = users.find(user => username === user.username)
  console.log(displayUser)

 let userHasReadingList = false; 
 if (displayUser.reading_lists) {
  userHasReadingList = true; 
 }

  return (
    <Container>
      <UserCard  user={displayUser} onUpdateUser={onUpdateUser}/>
      {userHasReadingList === true? <ReadingLists user={displayUser} onUpdateBook={onUpdateBook} onUpdateUser={onUpdateUser}/>: ""}
    </Container>
  )
}

export default UserPage