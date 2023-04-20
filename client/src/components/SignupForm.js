import React, { useState, useContext } from "react";
import { Error, Container } from "../styles";
import { UserContext } from "../context/User";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Button} from "@mui/material";


function SignUpForm({onAddUser}) {

  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        zipcode,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onAddUser(user)
          setCurrentUser(user)})
          navigate(`/`)
          ;
      } else {
        r.json().then((err) => {
          setErrors(err.errors)
        });
      }
    });
  }

  return (
    <Container style={{width:"40em", display:'flex', justifyContent:'center', }}>
        <form onSubmit={handleSubmit}>
        <FormControl  fullWidth >
          <TextField
            style={{margin:'1em'}}
            type="text"
            label="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            style={{margin:'1em'}}
            type="text"
            label="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            style={{margin:'1em'}}
            type="text"
            label="zipcode"
            id="zipcode"
            autoComplete="off"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            style={{margin:'1em'}}
            type="password"
            label="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            style={{margin:'1em'}}
            type="password"
            label="confirm password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
          />
        </FormControl>
          <Button type="submit" sx={{float:'right'}}>{isLoading ? "Loading..." : "Sign Up"}</Button>
        <FormControl>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </FormControl>
      </form>
    </Container>
    
  );
}

export default SignUpForm;
