import React from 'react'
import UserCard from '../components/UserCard'
import { Container } from '../styles'
import { useParams } from 'react-router-dom'
import ReadingLists from '../components/ReadingLists'

const UserPage = ({users, onUpdateUser, onUpdateBook}) => {

  const { username } = useParams(); 

  const displayUser = users.find(user => username === user.username)

  return (
    <Container>
      <UserCard  user={displayUser} onUpdateUser={onUpdateUser}/>
      <ReadingLists user={displayUser} onUpdateBook={onUpdateBook} onUpdateUser={onUpdateUser}/>
    </Container>
  )
}

export default UserPage