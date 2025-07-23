import React from 'react'
import ResultCard from '../components/ResultCard';
import { Container} from '../styles';



const Books = ({onAddBook, searchActive, searchResults}) => {

    let displayResults; 
    if (searchActive === true && searchResults.length === 0) {
        displayResults = "Hmm... no matches found"
    } else {
      console.log(searchResults);
        displayResults = searchResults.filter(result => result.cover_i)
            .map(result => {
      
                return <li key={result.key} style={{listStyle:'none'}}><ResultCard result={result} onAddBook={onAddBook}/></li>
            })
    }

  return (
    <Container>
         {displayResults}
    </Container>
  )
}

export default Books