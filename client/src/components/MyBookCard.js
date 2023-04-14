import React, {useContext, useState} from 'react'
import { Button, Card, Box, CardActionArea } from '@mui/material'
import { CardHeader, CardHeading, CardBody } from '../styles'
import { UserContext } from '../context/User'

const MyBookCard = ({item, onUpdateUser}) => {

    const { currentUser } = useContext(UserContext)

    const {id, rating, read_status, book, user } = item
    const {title, author, pages, cover_url, published_date, subject } = book 


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
            .then(data => console.log(data))

        onUpdateUser(currentUser.id)
        };
        

    const handleRemoveFromList = () => {
        fetch(`/reading_lists/${item.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
            })
            .then(r => r.json())
            .then(data => console.log(data))
        fetch(`/users/${currentUser.id}`)
            .then(r => r.json())
            .then(data => onUpdateUser(data))
        };

  return (
        <Card variant='outlined' style={{display:"inline-flex", margin:"3px"}}>
            <Box>
                <img src={cover_url} style={{displayStyle:"block", height:"15em"}} />
            </Box>
            <Box>
                <CardHeader>
                    <CardHeading>{title}</CardHeading>
                </CardHeader>
                <Box textAlign="left" style={{padding:"3px"}}>
                    <p>Written By: {author}</p>
                    <p>Published {published_date}</p>
                    <p>Genres: {subject}</p>
                    <p>My rating: {rating}</p>
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