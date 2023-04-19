import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User'; 
import { Button, FormControl, TextField, Typography,} from '@mui/material';
import { Error } from '../styles';


const ProfileEdit = ({onUpdateUser, updateEdit}) => {

    const { currentUser } = useContext(UserContext); 

    const [profileData, setProfileData ] = useState({
        username: currentUser.username, 
        first_name: currentUser.first_name, 
        last_name: currentUser.last_name, 
        zipcode: currentUser.zipcode, 
        bio: currentUser.bio
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
                    updateEdit();
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
    <div>
        <Typography gutterBottom variant="h5" >My Info: </Typography>
        <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField 
                        sx={{margin:'1em'}}
                        label="username"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        sx={{margin:'1em'}}
                        label="first name"
                        name="first_name"
                        value={profileData.first_name}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        sx={{margin:'1em'}}
                        label="last name"
                        name="last_name"
                        value={profileData.last_name}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        sx={{margin:'1em'}}
                        label="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        sx={{margin:'1em'}}
                        label="zipcode"
                        name="zipcode"
                        value={profileData.zipcode}
                        onChange={handleChange}
                        >
                    </TextField>
                    <TextField 
                        sx={{margin:'1em'}}
                        label="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        >
                    </TextField>
            </FormControl>
            <FormControl>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
            </FormControl>
            <Button type="submit" sx={{float:'right'}}>update</Button>
        </form>
        
    </div>
  )
}

export default ProfileEdit