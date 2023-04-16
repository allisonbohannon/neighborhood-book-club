import React, { useState, useContext } from "react";
import { CardButton, Error, Input, FormField, Label, Container } from "../styles";
import { UserContext } from "../context/User";
import { useNavigate } from "react-router-dom";

function SignUpForm({onAddUser}) {

  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
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
        zip,
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
          console.log(err.errors)
          setErrors(err.errors)
        });
      }
    });
  }

  return (
    <Container style={{width:"40em", }}>
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
          <Label htmlFor="email">e-mail address</Label>
          <Input
            type="text"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="zip">Zipcode</Label>
          <Input
            type="text"
            id="zip"
            autoComplete="off"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password Confirmation</Label>
          <Input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
          />
        </FormField>
        
        <FormField>
          <CardButton type="submit">{isLoading ? "Loading..." : "Sign Up"}</CardButton>
        </FormField>
        <FormField>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </FormField>
      </form>
    </Container>
    
  );
}

export default SignUpForm;
