import React, {useContext, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/User';
import SearchBar from './SearchBar';
import { AppBar,Toolbar, CssBaseline, Typography, makeStyles, Box, IconButton, Menu, MenuItem} from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';

import pic from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
    navlinks: {
      display: "inline-flex",

    },
   logo: {
      postiion:"relative",
      flexGrow: "1",
      cursor: "pointer",
      maxHeight: "100%",
    },
    link: {
        textDecoration: "none",
        position: "relative",
        top: "1em",
        color: "white",
        fontSize: "20px",
        "&:hover": {
          color: "white",
          borderBottom: "0px solid white",
        },
      },
    menulink: {
      textDecoration: "none",
      color: "black",
      fontSize: "20px",
      "&:hover": {
        color: "black",
        borderBottom: "1px solid white",
      },
    },
  }));

const NavigationBar = ({searchTerm, setSearchTerm, setSearchActive, setSearchResults}) =>  {

    const classes = useStyles();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const { setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()

    const menuItems = [{title: 'Profile', url: '/~profile'}, {title: 'My Books', url: '/~mybooks'}, {title:'My BookClubs', url:'/~mybookclubs'}];

    const handleLogout = () =>{
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setCurrentUser(null)
              setAnchorElUser(null)
              navigate(`/`);
            } else {
                console.log("Unable to log out")
            }
          });
    }; 

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    return (
        <AppBar position="fixed" >
            <CssBaseline />
            <Toolbar >
                <div className={classes.navlinks} >
                    {/* <Box className={classes.logo}>
                        <img src={pic} alt="logo" style={{height:"2em", postition:"relative"}}></img>
                    </Box> */}
                    <Box style={{displayStyle:"block", position:"relative", left:"1", bottom:'1.5em'}}>
                        <Typography><Link to='/' className={classes.link}>Neighborhood Book Club</Link></Typography>
                    </Box>
                    <Box style={{position:"absolute", right:"5%", bottom:'1em'}}>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchActive={setSearchActive} setSearchResults={setSearchResults}/>
                    </Box>
                    <Box style={{position:"absolute", right:0, bottom:0}}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p:0 }} >
                             <AccountCircle sx={{ width:'2em', height:'2em', color:'white' }}/>
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                             {menuItems.map((item) => (
                                <MenuItem key={item.title} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link to={item.url} className={classes.menulink} >{item.title}</Link></Typography>
                                </MenuItem>
                            ))} 
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center"className={classes.menulink} >Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </div>
            </Toolbar>
               
        </AppBar>
       
     )
}

export default NavigationBar