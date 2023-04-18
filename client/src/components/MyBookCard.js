import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Box } from '@mui/material'
import { CardHeader, CardHeading, CardBody } from '../styles'
import { UserContext } from '../context/User'
import StarRatingEdit from './StarRatingEdit'

const MyBookCard = ({item, onUpdateUser, onUpdateBook}) => {

    const { currentUser } = useContext(UserContext)

    const {id, rating, read_status, book } = item

    const [readStatus, setReadStatus] = useState(read_status)
  
    const handleUpdateReadStatus = () => {
        let newStatus;
        if (read_status === "Want to read") {
            newStatus = "Have read";
        } else {
            newStatus = "Want to read";
        };
        fetch(`/reading_lists/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({read_status: newStatus}),
            }).then(r => r.json())
            .then(data => setReadStatus(newStatus))
            .then(onUpdateUser(currentUser.id))
        };
        
    const handleRemoveFromList = () => {
        fetch(`/reading_lists/${item.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
            })
            .then(r => r.json())
            .then(data => {
                onUpdateUser(currentUser.id)
                setReadStatus(null)})
        };

    const onRatingChange = (newRating) => {
        fetch(`/reading_lists/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({rating: newRating}),
            }).then(r => r.json())
            .then(data => console.log(data))

        onUpdateBook(book.id)
    } 

  return (
        <Card variant='outlined' style={{display:"inline-flex", margin:"10px", minWidth:"100%", maxWidth:"100%"}}>
            <Box>
                <img src={book.cover_url} style={{displayStyle:"block", height:"15em"}} />
            </Box>
            <Box>
                <CardHeader>
                    <CardHeading>
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
                    </CardHeading>
                </CardHeader>
                <Box textAlign="left" style={{padding:"3px"}}>
                    <p>Written By: {book.author}</p>
                    <p>Published {book.published_date}</p>
                    <p>Genres: {book.subject}</p>
                    <p>{read_status === "Have read"? <StarRatingEdit userRating={rating} onRatingChange={onRatingChange} /> : "" }</p>
                </Box>
                <Box textAlign="center">
                    <Button 
                        style={{fontSize:"10px", margin:"2px", maxWidth:"40%", minWidth:"40%"}}
                        variant="outlined"
                        onClick={handleUpdateReadStatus}
                        >
                            {read_status === "Want to read"? "Mark Read" : "Mark Unread"}
                    </Button>
                    <Button
                        style={{fontSize:"10px",margin:"2px", maxWidth:"40%", minWidth:"40%"}}
                        variant="outlined"
                        onClick={handleRemoveFromList}
                        >
                            Remove
                    </Button>
                </Box>
            </Box>
        </Card>
  )
}

export default MyBookCard