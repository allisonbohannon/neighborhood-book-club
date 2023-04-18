import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import { Error} from "../styles";
import { UserContext } from "../context/User";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Button, Box, Container } from "@mui/material";


const LoginForm = () => {

    const { setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
  
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            setCurrentUser(user)
            navigate('/')
          });
        } else {
          r.json().then((err) => {
            console.log(err)
            setError(err.error.login)});
        }
      });

      

    }
  
    return (
      <Container sx={{display:'flex', justifyContent:'center'}}>
        <Box sx={{ display: 'block'}}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth >
              <TextField
                type="text"
                label="username"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{margin:'3px'}}
              />
              <TextField
                type="password"
                label="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{margin:'3px'}}
              />
              <Button variant="contained" color="primary" type="submit">
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </FormControl>
            <FormControl>
              {error? <Error>{error}</Error> : "" }
            </FormControl>
        </form>
          <Button sx={{display:'block'}}>
            <Link sx={{color:'black'}}
                    style={{textDecoration:"none", color:"black"}}
                    to='/signup'> 
                    Not a Member? Sign up now!
              </Link>
          </Button>
              
        </Box>
      </Container>
     
       );
   
  }

export default LoginForm