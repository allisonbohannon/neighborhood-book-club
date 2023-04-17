import React, { useState } from 'react'
import ResultCard from '../components/ResultCard';
import { Container, Error } from '../styles'
import { FormControl, TextField, Button, Typography} from '@mui/material';


const Books = ({onAddBook}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [searchActive, setSearchActive ] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        setIsLoading(true);
        if (searchTerm == null) {
            setIsLoading(false)
            setError('Please enter a search term');
            return;
        } else {
            const parsedSearch = `q=${searchTerm.split(' ').join('+')}`
            fetch(`https://openlibrary.org/search.json?${parsedSearch}`)
            .then(r => r.json())
            .then(data => {
                setSearchActive(true)
                setSearchResults(data.docs)
                setIsLoading(false)
            })
        }
    }

    let displayResults; 
    if (searchActive === true && searchResults.length == 0) {
        displayResults = "Hmm... no matches found"
    } else {
        displayResults = searchResults.filter(result => result.isbn )
            .map(result => {
                return <li key={result.key} style={{listStyle:'none'}}><ResultCard result={result} onAddBook={onAddBook}/></li>
            })
    }

  return (
    <Container>
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <TextField
                type="text"
                id="searchTerm"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                >
                </TextField>
            </FormControl>
                <Button style={{float:"right"}} type="submit" >
                    Search
                </Button>
            <FormControl>
                {error? <Error>{error}</Error> : "" }
            </FormControl>
            <br></br>
            <Typography>{isLoading ? "Loading..." : ""}</Typography>
        </form>
        <br></br>
         {displayResults}
    </Container>
  )
}

export default Books