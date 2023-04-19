import React, {useContext, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, CardHeader, CardHeading, CardBody, CardButton } from '../styles';
import { Button, Card } from '@mui/material';
import StarRatingShow from '../components/StarRatingShow';
import StarRatingEdit from '../components/StarRatingEdit';
import { UserContext } from '../context/User';
import { Box } from '@mui/system';
import BookClubCard from '../components/BookClubCard';


const BookPage = ({books, onAddBookClub, onUpdateUser, onUpdateBook}) => {
  const { bookId } = useParams();

  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const displayBook = books.find(book => book.id === parseInt(bookId));

    const [readStatus, setReadStatus] = useState();

  let userBook = null;
  if (currentUser.reading_lists.length >= 1) {
     userBook = currentUser.reading_lists.find(item => item.book_id === displayBook.id)
     if (userBook) {
      setReadStatus(userBook.read_status)
     }
  };



  let localBookClub = null; 
  if (displayBook.book_clubs.length>=1) {
    localBookClub = displayBook.book_clubs.filter(club => club.status === "Active")
      .find(club => club.zip_three == currentUser.zipcode.slice(0, 3))
  }
  
  const handleClick = () => {
    navigate(-1)
  }

  const handleUpdateReadingList = (e) => {
    if ( userBook ) {
      fetch(`/reading_lists/${userBook.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({read_status: e.target.value}),
        }).then(r => r.json())
        .then(data => {
            setReadStatus(e.target.value)
            onUpdateUser(currentUser.id)
        })
    } else {
      fetch("/reading_lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          book_id: displayBook.id,
          read_status: e.target.value
        }),
      }).then(r => r.json())
      .then(data => {
        setReadStatus(e.target.value)
        onUpdateUser(currentUser.id)
      })
     }
  }

  const handleAddBookClub = () => {
    const bookClubObj = {
      book_id: displayBook.id,
      zip_three: currentUser.zipcode.slice(0, 3),
      admin: currentUser.username,
      status: "Active", 
    };
    fetch("/book_clubs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookClubObj),
        }).then(r => r.json())
        .then(data => { 
          onAddBookClub(data)
          fetch("/book_club_members", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: currentUser.id, 
              book_id: displayBook.id,
              book_club_id: data.id
            }),
          }).then(r => r.json())
          navigate(`/bookclubs/${data.id}`)})
  };

  const displayAvgRating = () =>  <StarRatingShow rating={displayBook.average_rating}/>
  const displayUserRating = () => <div>Your Rating: <StarRatingEdit userRating={0} onChange={handleUpdateReadingList} /></div> 

  return (
    <Container>
      <Button onClick={handleClick}>Back to Search</Button>
      <br></br>
        <Card variant="outlined">
          <CardHeader style={{justifyContent:"space-around"}}>
              <img src={displayBook.cover_url} alt={displayBook.title} />
              <div style={{width: "40%"}}>
                <CardHeading style={{fontSize:'2em', color:'#aaa', borderBottom: '1px solid #ddd', padding:'1em', }}>{displayBook.title}</CardHeading>
                <CardHeading style={{fontSize:'1.1em', color:'rgb(150,78,108)' }}> Written by: {displayBook.author}</CardHeading>
                <p style={{color:"#aaa", textAlign:"center", margin:"0px"}}>Published: {displayBook.published_date}</p>
                <p style={{color:"#aaa", textAlign:"center", margin:"0px"}}>Pages: {displayBook.pages}</p>
                <p style={{overflow:'none'}}>Genre: {displayBook.subject}</p>
                <p>Avg Rating: {displayAvgRating()} </p>
                <p>{readStatus === "read" ? displayUserRating() : '' }</p>
              </div> 
             
          </CardHeader>
            <Box textAlign="center">
              <Button 
                  value="Have read"
                  onClick={handleUpdateReadingList}
                  variant={readStatus === "Have read" ? "outlined" : "contained"}
                  style={{margin:"1em"}}>
                    I've Read This!
                </Button>
              <Button 
                  value="Want to read"
                  onClick={handleUpdateReadingList}
                  variant={readStatus === "Want to read" ? "outlined" : "contained"}
                  style={{margin:"1em"}}>
                    I Want to Read This!
                </Button>
            </Box>
        </Card>
      
      <Box textAlign="center" style={{margin:"1em"}}>
         {/* if a book club exists, display the book club info here, otherwise, link to create a new bookclub */}
        { localBookClub ? <BookClubCard club={localBookClub} /> : <Button onClick={handleAddBookClub}>Start a book club!</Button>}
      </Box>
     

        
    </Container>
  )
}

export default BookPage