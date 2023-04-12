import React from 'react'
import LoginForm from '../components/LoginForm'

import { CardContainer } from '../styles'



const Login = () => {
  return (
    <CardContainer style={{ display:'inline-block'}}>
        <LoginForm />
    </CardContainer>
  )
}

export default Login