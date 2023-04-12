import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import { CardButton, Error, Input, FormField, Label, Container} from "../styles";
import { UserContext } from "../context/User";
import { useNavigate } from "react-router-dom";


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
      <Container style ={{width:"40em"}}>
         <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormField>
          <CardButton variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
          </CardButton>
        </FormField>
        <FormField>
          {error? <Error>{error}</Error> : "" }
        </FormField>
      </form>
      <CardButton>
            <Link 
                style={{textDecoration:"none", color:"white"}}
                to='/signup'> 
                Not a Member? Sign up now!
            </Link>
          </CardButton>
      </Container>
       );
   
  }

export default LoginForm