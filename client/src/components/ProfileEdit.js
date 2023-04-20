import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User'; 
import { Box, Button, FormControl, TextField, Typography,} from '@mui/material';
import { Error } from '../styles';


const ProfileEdit = ({onUpdateUser, setEdit}) => {

    const { currentUser } = useContext(UserContext); 

    const [profileData, setProfileData ] = useState({
        username: currentUser.username, 
        first_name: currentUser.first_name, 
        last_name: currentUser.last_name, 
        zipcode: currentUser.zipcode, 
        bio: currentUser.bio,
        password: currentUser.password_digest
    })
    const [errors, setErrors] = useState([])

    function handleChange(event) {
        const name = event.target.name;
        let value = event.target.value;
    
        setProfileData({
          ...profileData,
          [name]: value,
        });
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
            }).then(r => {
                if (r.ok) {
                  r.json().then((user) => {
                    setEdit(false);
                    onUpdateUser(user.id);
                    
                  });
                } else {
                  r.json().then((err) => {
                    setErrors(err.errors)
                });
                }
            })
    }
  return (
    <Box >
        <Typography gutterBottom variant="h5" >My Info: </Typography>
        <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField 
                        style={{margin:'1em'}}
                        label="username"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        style={{margin:'1em'}}
                        label="first name"
                        name="first_name"
                        value={profileData.first_name}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        style={{margin:'1em'}}
                        label="last name"
                        name="last_name"
                        value={profileData.last_name}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        style={{margin:'1em'}}
                        label="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        style={{margin:'1em'}}
                        label="zipcode"
                        name="zipcode"
                        value={profileData.zipcode}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        style={{margin:'1em'}}
                        label="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        >
                    </TextField>
            </FormControl>
            <FormControl   style={{margin:'1em', padding:'1em'}} >
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
            </FormControl>
            <Button type="submit" sx={{float:'right'}}>update</Button>
        </form>
        
    </Box>
  )
}

export default ProfileEdit