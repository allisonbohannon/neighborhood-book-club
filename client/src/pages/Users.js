import React from 'react'
import { Container } from '../styles'
import UserCard from '../components/UserCard'

const Users = ({users, onUpdateUser}) => {

    const displayList = users.map(user => {
        return (<li key={user.id} style={{listStyle:'none'}}><UserCard user={user} onUpdateUser={onUpdateUser} /></li>)
    })

  return (
    <Container>
        {displayList}
    </Container>
  )
}

export default Users