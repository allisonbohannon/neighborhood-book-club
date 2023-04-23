import React, {useContext, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/User';
import { Container } from '../styles';
import { Button, Card, CardMedia, Typography, Box } from '@mui/material';
import StarRatingShow from '../components/StarRatingShow';
import StarRatingEdit from '../components/StarRatingEdit';
import BookClubCard from '../components/BookClubCard';


const BookPage = ({books, onAddBookClub, onUpdateUser, onUpdateBook}) => {
  const { bookId } = useParams();

  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const displayBook = books.find(book => book.id === parseInt(bookId));

  let userBook = null;
  if (currentUser.reading_lists.length >= 1) {
     userBook = currentUser.reading_lists.find(item => item.book_id === displayBook.id)
  };

  const [readStatus, setReadStatus] = useState((userBook) => userBook? userBook.read_status : 'none');

  let localBookClub = null; 
  if (displayBook.book_clubs.length>=1) {
    localBookClub = displayBook.book_clubs.filter(club => club.status === "Active")
      .find(club => club.zip_three == currentUser.zipcode.slice(0, 3))
  };
  
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
      })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        onAddBookClub(data)
         if (!userBook) {
            fetch("/reading_lists", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user_id: currentUser.id,
                  book_id: displayBook.id,
                }),
                }).then(r => r.json())
                .then(data => {
                  onUpdateUser(currentUser.id)
                })
            }; 
            navigate(`/bookclubs/${data.id}`)
          });
      
  };


  const displayAvgRating = () =>  <StarRatingShow rating={displayBook.average_rating}/>
  const displayUserRating = () => <div>Your Rating: <StarRatingEdit userBook={userBook} onChange={onUpdateBook} /></div> 

  return (
    <Container>
        <Card variant="outlined" sx={{display:'flex', justifyContent:"space-around"}}>
            <Box>
              <CardMedia style={{justifyContent:"space-around"}}>
                <img src={displayBook.cover_url} alt={displayBook.title} />
              </CardMedia>
            </Box>
            <Box textAlign={'center'}>
                <Box style={{width: "100%"}}>
                  <Typography style={{fontSize:'2em', color:'#aaa', borderBottom: '1px solid #ddd', padding:'.5em', }}>{displayBook.title}</Typography>
                  <Typography style={{fontSize:'1.1em', padding:'.5em' }}> Written by: {displayBook.author}</Typography>
                  <Typography style={{ textAlign:"center", margin:"0px"}}>Published: {displayBook.published_date}</Typography>
                  <Typography style={{ textAlign:"center", margin:"0px"}}>Pages: {displayBook.pages}</Typography>
                  <Typography style={{ textAlign:"center", margin:"0px", overflow:'none'}}>Genre: {displayBook.subject}</Typography>
                  <Typography>Avg Rating: {displayAvgRating()} </Typography>
                  <Typography>{readStatus === "read" ? displayUserRating() : '' }</Typography>
                </Box> 
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
            </Box>
        </Card>
      
      <Box textAlign="center" style={{margin:"1em"}}>
        { localBookClub ? <BookClubCard club={localBookClub} book={displayBook}/> : <Button onClick={handleAddBookClub} variant='outlined'>Start a book club!</Button>}
      </Box>
     

        
    </Container>
  )
}

export default BookPage