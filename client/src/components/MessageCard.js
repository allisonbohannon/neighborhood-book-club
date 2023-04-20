import React, {useContext, useState} from 'react';
import { UserContext } from '../context/User';
import {ListItem, ListItemText, IconButton, FormControl, Button, TextField, ListItemSecondaryAction } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const MessageCard = ({ member, message, admin, clubId, onUpdateBookClub }) => {

    const { currentUser } = useContext(UserContext);
    const [edit, setEdit] = useState(false)
    const [content, setContent] = useState(message.message)


    const handleDeleteMessage = () => {
      fetch(`/messages/${message.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
        })
        .then(r => r.json())
        .then(data => onUpdateBookClub(clubId))
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`/messages/${message.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({message: content}),
          }).then(r => r.json())
          .then(data => {
              onUpdateBookClub(clubId)
          })
          setEdit(false)
  }

    if (edit === true) {
      return  (
      <form onSubmit={handleSubmit} >
          <FormControl fullWidth >
              <TextField value={content} onChange={(e) => setContent(e.target.value)} />
          </FormControl>
          <Button style={{float:"right"}}
              type="submit"
              >
              Submit
          </Button>
       </form>)
    }

    ///
 
    if (member.user.id === currentUser.id) {
        return (
        <ListItem key={message.id} >
           <ListItemText primary={message.message} 
                        secondary={`${member.user.username}, ${message.posted_date}`}
                        />
            <ListItemSecondaryAction edge="end">
              <IconButton onClick={() => setEdit(true)}>
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