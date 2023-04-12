import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/User';
import { Container, FormField, Button, CardHeading, Error } from '../styles';


const EditCommentForm = ({comments, wineries, onEditComment, onDeleteComment}) => {

    const navigate = useNavigate()
    const {currentUser} = useContext(UserContext)
    const {wineryId, commentId} = useParams()
    const [error, setError] = useState(null);
    
    const comment = comments.find(comment => comment.id === parseInt(commentId))
   
    const [commentText, setCommentText] = useState(comment.text)

    const winery = wineries.find(winery => winery.id === parseInt(wineryId))

    
    useEffect(() => {
        if (comment.user.id !== currentUser.id) {
            navigate(`/wineries/${winery.id}/comments/${comment.id}`)
        }
    }, [currentUser])
  
    const handleEditComment = (e) => {
        e.preventDefault()

        setError(null)

        fetch(`/comments/${comment.id}`, { 
            method: "PATCH", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({text: commentText})
             })
         .then((r) =>  {
          if (r.ok) {
            r.json().then((data) => {
              onEditComment(data)
              navigate(`/wineries/${winery.id}`)
            })
          } else {
            r.json().then((err) => {
              setError(err.error)
            })
          }
         })
    }

    const handleDelete = () => {
      fetch(`/comments/${comment.id}`, { 
        method: "DELETE", 
        headers: { "Content-Type": "application/json" }
         })
     .then(response => response.json())
     .then(data => onDeleteComment(comment))

      navigate(`/wineries/${winery.id}`)
        
    }
    

   
  return (
    <Container>
      <CardHeading>Tell us what you think about {winery.name}! </CardHeading>
      <br></br>
      <form onSubmit={handleEditComment}>
        <FormField>
          <textarea
            type="textarea"
            id="comment"
            autoComplete="off"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{height:'15em', width:'30em', borderRadius:'6px'}}
          ></textarea>
        </FormField>
        <FormField>
          <Button variant="fill" color="primary" type="submit">Submit</Button>
          <Button variant="fill" color="primary" onClick={handleDelete}>Delete</Button>
        </FormField>
        <FormField>
          {error? <Error>{error}</Error> : "" }
        </FormField>
      </form>
    </Container>
  )
}

export default EditCommentForm