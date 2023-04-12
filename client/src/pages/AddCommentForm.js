import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/User';
import { Container, FormField, Button, CardHeading, Error} from '../styles';

const AddCommentForm = ({wineries, onAddComment}) => {

  const [comment, setComment] = useState("")
  const [error, setError] = useState(null);
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate()
  
  const { wineryId } = useParams()

  const winery = wineries.find(winery => winery.id === parseInt(wineryId))

  const handleAddComment = (e) => {
    e.preventDefault()
    
    const newCommentObj = {
      winery_id: winery.id,
      user_id: currentUser.id,
      text: comment
    }
    setError(null)
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentObj),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          onAddComment(data)
          navigate(`/wineries/${winery.id}`)
        })
      } else {
        r.json().then((err) => {
          setError(err.error)
        });
      }
      })
  }

  return (
    <Container>
      <CardHeading>Tell us what you think about {winery.name}! </CardHeading>
      <br></br>
      <form onSubmit={handleAddComment}>
        <FormField>
          <textarea
            type="textarea"
            id="comment"
            autoComplete="off"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{height:'15em', width:'30em', borderRadius:'6px'}}
          ></textarea>
        </FormField>
        <FormField>
          <Button variant="fill" color="primary" type="submit">Submit</Button>
        </FormField>
        <FormField>
          {error? <Error>{error}</Error> : "" }
        </FormField>
      </form>
    </Container>
  )
}

export default AddCommentForm