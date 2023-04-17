import React, {useContext, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/User';
import { styled, alpha } from '@mui/material/styles';
import { AppBar,Toolbar, CssBaseline, Typography, makeStyles, Box, IconButton, Menu, MenuItem, InputBase} from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import pic from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(5),
      display: "inline-flex",
      justifyContent: "space-evenly"
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
      maxHeight: "100%",
      marginLeft: theme.spacing(1)
    },
    link: {
        textDecoration: "none",
        position: "relative",
        top: "1em",
        left: ".1em",
        color: "white",
        fontSize: "20px",
        "&:hover": {
          color: "white",
          borderBottom: "1px solid white",
        },
      },
    menulink: {
      textDecoration: "none",
      color: "black",
      fontSize: "20px",
      "&:hover": {
        color: "purple",
        borderBottom: "1px solid white",
      },
    },
  }));

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
  

const NavigationBar = () =>  {

    const classes = useStyles();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const { currentUser, setCurrentUser } = useContext(UserContext)
    console.log(currentUser)
    const navigate = useNavigate()

    const menuItems = [{title: 'Profile', url: '/profile'}, {title: 'My Books', url: '/mybooks'}, {title:'My BookClubs', url:'/mybookclubs'}, {title:'Logout', url:'/logout'}];

    const handleLogout = () =>{
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setCurrentUser(null)
              navigate(`/login`);
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
        <AppBar position="static">
            <CssBaseline />
            <Toolbar style={{display:"inline-block", top:"50%"}}>
                <div className={classes.navlinks}>
                    <Box>
                        <Typography><Link to='/' className={classes.link}>Neighborhood Book Club</Link></Typography>
                         {/* <Link
                            to="/"
                            exact="true"
                            className={classes.logo}
                            >
                            <img src={pic} alt="logo" style={{height:"8em"}}></img>
                        </Link> */}
                    </Box>
                    <Box>
                    <Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                             placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    </Box>
                    <Box>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                             <AccountCircle sx={{ width: 32, height: 32 }}/>
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
                        </Menu>
                    </Box>
                   
                  
                    {/* {currentUser?  (
                            <Link><Button variant="outline" onClick={handleLogout}>Logout</Button></Link>) : (
                            <Link to="/Login"><Button>Log In</Button></Link>)} */}
                </div>
            </Toolbar>
               
        </AppBar>
       
     )
}

export default NavigationBar