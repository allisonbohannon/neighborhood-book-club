import React, {useContext} from 'react'
import { Container } from '../styles'
import { UserContext } from '../context/User'

import ReadingLists from '../components/ReadingLists'

const MyBooks = ({onUpdateUser, onUpdateBook}) => {

    const { currentUser } = useContext(UserContext) 

  return (
    <Container>
      <ReadingLists user={currentUser} onUpdateBook={onUpdateBook} onUpdateUser={onUpdateUser}/>
    </Container>
  )
}

export default MyBooks