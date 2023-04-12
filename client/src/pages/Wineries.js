import React from 'react'
import WineryCard from '../components/WineryCard'
import { CardContainer } from '../styles'

const Wineries = ({wineries, visits, comments, onChangeRating, onAddRating, onUpdateWinery}) => {

    const displayWineries = wineries.map(winery => {
         return (<li key={winery.id} style={{listStyle:'none'}}>
            <WineryCard  winery={winery} visits={visits} comments={comments} onChangeRating={onChangeRating} onAddRating={onAddRating} onUpdateWinery={onUpdateWinery}/>
          </li>)
    })

  return (
    <CardContainer>{displayWineries}</CardContainer>
  )
}

export default Wineries