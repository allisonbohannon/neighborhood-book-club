import React, {useContext, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard';
import { DetailCard, Container, CardHeader, CardHeading, CardBody, CardButton } from '../styles';
import { Button, Card } from '@mui/material';
import StarRatingShow from '../components/StarRatingShow';
import StarRatingEdit from '../components/StarRatingEdit';
import { UserContext } from '../context/User';
import { Box } from '@mui/system';


const BookPage = ({books, onChangeRating, onAddRating, onAddBookClub}) => {

  const { bookId } = useParams();

  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const [readStatus, setReadStatus] = useState("none");

  const displayBook = books.find(book => book.id === parseInt(bookId));

  currentUser.reading_lists.forEach(item => {
    if (item.book_id === displayBook.id) {
      setReadStatus(item.read_status)
    } 
  });

  let userBook = null;
  if (currentUser.reading_lists.length >= 1) {
     userBook = currentUser.reading_lists.filter(item => item.book_id === displayBook.id)
  }

  let localBookClub = null; 
  if (displayBook.book_clubs.length>=1) {
    localBookClub = displayBook.book_clubs.filter(item => item.zip_three === currentUser.currentUser.zipcode.slice(0, 3))
    console.log(localBookClub)
  }
  
  const handleClick = () => {
    navigate(-1)
  }

  const handleAddReadingList = () => {
  //   const newVisitObj = {
  //       user_id: currentUser.id,
  //       winery_id: displayWinery.id,
  //       rating: 0
  //   }
  //   fetch("/visits", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newVisitObj),
  //   }).then(r => r.json())
  //   .then(data => onAddRating(data))
  }

  const handleUpdateReadingList = () => {
  //   fetch(`/visits/${userVisit.id}`, {
  //     method: "PATCH",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({rating: newRating}),
  //     }).then(r => r.json())
  //     .then(data => {
  //         onChangeRating(data)
  //         fetch(`/wineries/${displayWinery.id}`)
  //         .then(r => r.json())
  //         .then(data => onUpdateWinery(data))
  //     })

   }

  const handleMarkRead = () => {
    if (readStatus == null || readStatus === "Want to read") {
      setReadStatus("Have read")
    } else {
      setReadStatus(null)
    }
  }

  const handleMarkWant = () => {
    if (readStatus == null || readStatus === "Have read") {
      setReadStatus("Want to read")
    } else {
      setReadStatus(null)
    }
  }

  const handleAddBookClub = () => {
    const bookClubObj = {
      book_id: displayBook.id,
      zip_three: currentUser.zipcode.slice(0, 3),
      admin: currentUser.username,
      status: "Active"
    }
    fetch("/book_clubs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookClubObj),
        }).then(r => r.json())
        .then(data => { 
          onAddBookClub(data)
          navigate(`/bookclubs/${data.id}`)
        })   
  }

  const displayAvgRating = () =>  <StarRatingShow rating={displayBook.avgerage_rating}/>
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
            {/* <CardBody style={{margin:"1em", padding:"3px"}}>
            <p style={{fontSize:'1.1em', color:'rgb(150,78,108)' }}>Comments:</p>
                {displayComments}
            </CardBody> */}
            {/* <CardButton ><Link to={`/books/${displayBook.id}/comments/new`} style={{color:'white', textDecoration:'none'}} >Add Comment</Link></CardButton> */}
            <Box textAlign="center">
              <Button 
                  onClick={userBook? handleUpdateReadingList: handleAddReadingList}
                  variant={readStatus === "Have read" ? "outlined" : "contained"}
                  style={{margin:"1em"}}>
                    I've Read This!
                </Button>
              <Button 
                  onClick={userBook? handleUpdateReadingList: handleAddReadingList}
                  variant={readStatus === "Want to read" ? "outlined" : "contained"}
                  style={{margin:"1em"}}>
                    I Want to Read This!
                </Button>
            </Box>
        </Card>
      
      <Box textAlign="center" style={{margin:"1em"}}>
         {/* if a book club exists, display the book club info here, otherwise, link to create a new bookclub */}
        { displayBook.bookClub ? "Book Club Info" : <Button onClick={handleAddBookClub}>Start a book club!</Button>}
      </Box>
     

        
    </Container>
  )
}

export default BookPage