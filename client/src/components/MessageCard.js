import React, {useContext} from 'react';
import { UserContext } from '../context/User';
import {ListItem, ListItemText, IconButton, TextField, ListItemSecondaryAction } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const MessageCard = ({ member, message, admin, clubId, onUpdateBookClub }) => {

    const { currentUser } = useContext(UserContext);

    const handleEditMessage = () => {}

    const handleDeleteMessage = () => {
      fetch(`/messages/${message.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
        })
        .then(r => console.log(r))
        .then(data => onUpdateBookClub(clubId))
    }

    ///
 
    if (member.user.id === currentUser.id) {
        return (
        <ListItem key={message.id} >
           <ListItemText primary={message.message} 
                        secondary={`${member.user.username}, ${message.posted_date}`}
                        />
            <ListItemSecondaryAction edge="end">
              <IconButton onClick={handleEditMessage}>
                      <EditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteMessage}>
                      <DeleteIcon />
                </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)
       } else if (admin === currentUser.username) {
        return (
          <ListItem key={message.id} >
            <ListItemText primary={message.message} 
                        secondary={`${member.user.username}, ${message.posted_date}`}
                        />
            <ListItemSecondaryAction edge="end">
                <IconButton onClick={handleDeleteMessage}>
                      <DeleteIcon />
                </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        )
       } else {
        return (
          <ListItem key={message.id} >
            <ListItemText primary={message.message} 
                        secondary={`${member.user.username}, ${message.posted_date}`}
                        />
        </ListItem>
        )
       }
    }
export default MessageCard