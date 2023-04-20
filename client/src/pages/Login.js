import React from 'react'
import LoginForm from '../components/LoginForm'
import { Container } from '../styles'



const Login = () => {
  return (
    <Container style={{ display:'inline-block'}}>
        <LoginForm />
    </Container>
  )
}

export default Login