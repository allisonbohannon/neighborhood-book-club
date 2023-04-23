import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { FormControl, InputBase } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


 const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop:"1em",
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const SearchBar = ({setSearchActive, setSearchResults, searchTerm, setSearchTerm}) => {

    const navigate = useNavigate()

 const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm == null) {
            return;
        } else {
            const parsedSearch = `q=${searchTerm.split(' ').join('+')}`
            setSearchTerm("")
            fetch(`https://openlibrary.org/search.json?${parsedSearch}`)
            .then(r => r.json())
            .then(data => {
                setSearchActive(true)
                setSearchResults(data.docs)
            })
            navigate('/~books')
        }
        
    }


  return (
    <form onSubmit={handleSubmit}>
        <FormControl>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                        </SearchIconWrapper>
                            <StyledInputBase
                                    placeholder="search books"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchTerm}
                                    onChange={(e)=>setSearchTerm(e.target.value)}
                                />
            </Search>
        </FormControl>
    </form>
  )
}

export default SearchBar