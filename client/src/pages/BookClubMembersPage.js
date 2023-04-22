import React, { useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/User';
import { Container } from '../styles';
import UserCard from '../components/UserCard'


const BookClubMembersPage = ({bookClubs, onUpdateUser}) => {

    const { bookClubId } = useParams(); 
    const { currentUser } = useContext(UserContext);

    const displayClub = bookClubs.find(club => club.id === parseInt(bookClubId));

    const displayMembers = displayClub.book_club_members.filter(member => member.user.user_id !== currentUser.id )
    .map((member) => { 
        return <li key={member.id} style={{listStyle:"none"}}><UserCard user={member.user} onUpdateUser={onUpdateUser}/></li>

    });

  return (
    <Container>
        <p>{displayClub.total_members} {displayClub.total_members > 1? "people want" : "person wants"} to talk about {displayClub.book.title}</p>
        {displayMembers}
    </Container>
  )
}

export default BookClubMembersPage