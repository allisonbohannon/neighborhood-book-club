import React, { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';

const NewMessage = ({memberId, clubId, onUpdateBookClub, setShowInput}) => {

    const [content, setContent] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                book_club_member_id: memberId, 
                message: content,
            }),
            }).then(r => r.json())
            .then(data => {
                onUpdateBookClub(clubId)
            })
            setShowInput(false)
    }

  return (
    <form onSubmit={handleSubmit} >
        <FormControl fullWidth >
            <TextField value={content} 
                        multiline
                        rows={4} 
                        onChange={(e) => setContent(e.target.value)} 
                        />
        </FormControl>
            <Button  
                type="submit"
                >
                Submit
            </Button>
    </form>

  )
}

export default NewMessage