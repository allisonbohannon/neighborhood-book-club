import React from 'react'
import { useParams } from 'react-router-dom'

const ShowCommentForm = ({wineries}) => {

    const {wineryId, commentId} = useParams()

    const winery = wineries.find(winery => winery.id === parseInt(wineryId))
    const comment = winery.comments.find(comment => comment.id === parseInt(commentId))


  return (
    <div>
        <p>{winery.name}</p>
        <p>{comment.text}</p>
        <p>{comment.userId}</p>
    </div>
  )
}

export default ShowCommentForm