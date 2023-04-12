import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/User';
import { Button } from '../styles';


const CommentCard = ({comment}) => {


    const {currentUser} = useContext(UserContext)

    const checkIfCurrentUser = currentUser.id === comment.user.id ? true : false 
    
    const author = <p style={{fontStyle:"italic"}}>{comment.user.username}</p>
    const button = <Link to={`/wineries/${comment.winery.id}/comments/${comment.id}/edit`}>
                    <Button>Edit</Button>
                    </Link>

  return (
    <div>
        <p>{comment.text}</p>
        {checkIfCurrentUser ? button : author}

    </div>
  )
}

export default CommentCard