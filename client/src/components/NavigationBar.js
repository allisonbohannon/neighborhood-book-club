import React, {useContext} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { NavBar, Button, NavLinkStyle } from "../styles";
import { UserContext } from '../context/User';
import pic from '../images/logo.png'

const NavigationBar = () =>  {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () =>{
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setCurrentUser(null)
              navigate(`/`);
            } else {
                console.log("Unable to log out")
            }
          });
    }; 

    return (
        <NavBar>
            <NavLinkStyle>
                <NavLink
                    to="/"
                    exact="true"
                    style={{position:"absolute", left:"0px", top:"0px"}}
                    >
                    <img src={pic} alt="logo" style={{height:"8em"}}></img>
                </NavLink>
            </NavLinkStyle>
            <NavLinkStyle>
                <NavLink
                    to="/books"
                    style={{color: '#ffffff'}}
                    >
                   Find Books + Clubs
                </NavLink>
            </NavLinkStyle>
            <NavLinkStyle>
                <NavLink
                    to='/mybooks'
                    style={{color: '#ffffff'}}
                    >
                    My Books
                </NavLink>
            </NavLinkStyle>
            <NavLinkStyle>
                <NavLink 
                     to='/mybookclubs'
                     style={{color: '#ffffff'}}
                    >
                     My Book Clubs
                </NavLink>
            </NavLinkStyle>
            <NavLinkStyle>
                <NavLink 
                     to='/me'
                     style={{color: '#ffffff'}}
                    >
                     Me
                </NavLink>
            </NavLinkStyle>
            <div>{currentUser?  (
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>) : (
                    <NavLink to="/Login"><Button>Log In</Button></NavLink>)}
            </div> 
        </NavBar>
       
     )
}

export default NavigationBar