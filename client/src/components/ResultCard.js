import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardActionArea, CardContent, CardMedia, Typography, Box} from '@mui/material';


const ResultCard = ({result, onAddBook}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        const bookObj = {
            title: result.title, 
            author: author,
            published_date: result.first_publish_year,
            subject: subject,
            pages: result.number_of_pages_median,
            cover_url: url,
            isbn: isbn
        }
        //On the backend, user find_or_create_by isbn to add to DB
        fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookObj),
            }).then(r => {
                if (!r.ok) {
                } else if (r.status === 201) {
                    r.json().then(data => {
                        onAddBook(data)
                        navigate(`/books/${data.id}`)
                    })
                } else {
                    r.json().then(data => navigate(`/books/${data.id}`))
                }
            })
        }
          

    let isbn; 
    if (result.isbn.length > 0 ) {
        isbn = result.isbn[0]
    } else {
        isbn = result.isbn
    }

    let author = ''; 
    if (!result.author_name) {
       author = "Unknown"
    } else if (!Array.isArray(result.author_name)) {
        author = result.author_name
    } else {
        const maxThree = Math.min(3, result.author_name.length)
        for (let i = 0; i < maxThree; i++) {
            author = author.concat(result.author_name[i], ', ')
         }
    } 

    let subject = ''; 
    if (result.subject) {
        subject = "None listed"
    } else if (!Array.isArray(result.subject)) {
        subject = result.subject
    } else {
        const maxThree = Math.min(3, result.subject.length)
        for (let i = 0; i < 3; i++) {
            subject = subject.concat(result.subject[i], ',')
         }
    }

    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`


  return (
    <CardActionArea onClick={handleClick} sx={{ width:"50%", height:"15em", margin:'1px', }}>
        <Card variant='outlined' sx={{display: 'flex'}}>
            <Box sx={{display:'block', alignSelf:'center', margin:'1em'}}>
                <CardMedia component="img"
                        image={url} 
                        title={result.title}
                        style={{display:"block", height:"8em"}}
                        />
            </Box>
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >{result.title}</Typography>
                    <p>Written By: {result.author_name}</p>
                    <p>Published {result.first_publish_year}</p>
                    <p>Genres: {subject}</p>
                </CardContent>
            </Box>
        </Card>
    </CardActionArea>
  )
}

export default ResultCard