import React, { useState } from 'react'
import ResultCard from '../components/ResultCard';
import { Container, FormField, Input, CardButton, Error } from '../styles'


const Books = ({onAddBook}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([])


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
                setSearchResults(data.docs)
                setIsLoading(false)
            })
        }
    }

    let displayResults; 
    if (searchResults.length == 0) {
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
            <FormField>
                <Input
                type="text"
                id="searchTerm"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                >
                </Input>
            </FormField>
            <FormField>
                <CardButton variant="fill" color="primary" type="submit">
                    {isLoading ? "Loading..." : "Search"}
                </CardButton>
            </FormField>
            <FormField>
                {error? <Error>{error}</Error> : "" }
            </FormField>
        </form>
         {displayResults}
    </Container>
  )
}

export default Books