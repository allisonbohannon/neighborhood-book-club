import React from 'react'
import SignUpForm from '../components/SignupForm'

const SignUp = ({onAddUser}) => {
  return (
    <SignUpForm onAddUser={onAddUser} />
  )
}

export default SignUp