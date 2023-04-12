import React from 'react'
import UserCard from '../components/UserCard'
import { CardContainer } from '../styles'

const Users = ({users, wineries, visits, comments}) => {

  const displayUsers = users.map(user => {
    return (<li key={user.id} style={{listStyle:'none'}}><UserCard  user={user} wineries={wineries} visits={visits} comments={comments}/>
      </li>)
})

  return (
    <CardContainer>{displayUsers}</CardContainer>
  )
}

export default Users