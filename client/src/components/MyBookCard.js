import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardMedia, Box, Typography } from '@mui/material';
import { UserContext } from '../context/User';
import StarRatingEdit from './StarRatingEdit'; 
import StarRatingShow from './StarRatingShow';

const MyBookCard = ({book, onUpdateUser, onUpdateBook}) => {
    console.log(book)

    const { currentUser } = useContext(UserContext)
    const [readStatus, setReadStatus] = useState()
 
    let userBook = null;
    if (currentUser.reading_lists.length >= 1) {
       userBook = currentUser.reading_lists.find(item => item.book_id === book.id)
       if (userBook) {
        setReadStatus(userBook.read_status)
       }
    };
   
    const handleUpdateReadStatus = () => {
        let newStatus;
        if (readStatus === "Want to read") {
            newStatus = "Have read";
        } else {
            newStatus = "Want to read";
        };
        fetch(`/reading_lists/${userBook.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({read_status: newStatus}),
            }).then(r => r.json())
            .then(data => {
                setReadStatus(data.read_status)
                onUpdateUser(currentUser.id)
            })
                
        };
        
    const handleRemoveFromList = () => {
        fetch(`/reading_lists/${userBook.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
            })
            .then(r => r.json())
            .then(data => {
                onUpdateUser(currentUser.id)
                setReadStatus(null)})
        };

     const removeButton = (
        <Button
            style={{fontSize:"10px",margin:"2px", width:"45%", height:'3em', alignSelf: "end", }}
            variant="outlined"
            onClick={handleRemoveFromList}
            >
                Remove
         </Button>
    ); 

  return (
        <Card variant='outlined' sx={{display:"inline-flex", margin:"10px", padding:'.5em',minWidth:"100%", maxWidth:"100%", height:'20em', margin:'1px'}}>
             <Box sx={{display:'block', alignSelf:'center', margin:'1em', minWidth:'40%', maxWidth:'40%', padding:'1em'}}>
                <CardMedia component="img"
                        image={book.cover_url} 
                        title={book.title}
                        style={{display:"block", maxHeight:"80%"}}
                        />
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <Box sx={{borderBottom:"1px solid lightgray"}}>
                    <Typography variant='h5'>
                        <Link to={`/books/${book.id}`}
                                style={{display: 'inline-block',
                                fontSize: '1em',
                                textDecoration: 'none',
                                color: '#472d30',
                                justifySelf: 'center',
                                padding:'1em',
                                cursor: 'pointer',
                                transition: 'color 0.25s ease-in',
                                '&':'hover {color: #135;}'}}
                              >{book.title}
                        </Link>
                    </Typography>
                </Box>
                <Box textAlign="left" style={{padding:"3px"}}>
                    <Typography>Written By: {book.author}</Typography>
                    <Typography>Published: {book.published_date}</Typography>
                    <Typography>Genres: {book.subject}</Typography>
                    <Box sx={{display:'flex'}}>
                        <Typography >Rating: </Typography>
                        <StarRatingShow rating={book.average_rating} />
                        <Typography>({book.total_ratings})</Typography>
                    </Box>
                    
                    <Box sx={{display:'flex'}}>
                        <Typography >{readStatus === "Have read"? "My Rating: " : ""}</Typography>
                        {readStatus === "Have read"? <StarRatingEdit userBook={userBook} onUpdateBook={onUpdateBook} onUpdateUser={onUpdateUser} /> : "" }
                    </Box>
                </Box>
                <Box >
                    <Button 
                        style={{fontSize:"10px", margin:"2px", width:"45%", height:'3em', float:'bottom', alignSelf: "end", }}
                        variant="outlined"
                        onClick={handleUpdateReadStatus}
                        >
                            {readStatus === "Want to read"? "Mark Read" : "Mark Unread"}
                    </Button>
                    {userBook? removeButton : ''}
                </Box>
            </Box>
        </Card>
  )
}

export default MyBookCard