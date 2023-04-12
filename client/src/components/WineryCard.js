import React, { useContext } from 'react'
import { Button, Card, CardHeader, CardHeading, CardBody, CardButton } from '../styles';
import { Link } from 'react-router-dom';
import StarRatingShow from './StarRatingShow';
import StarRatingEdit from './StarRatingEdit';
import { UserContext } from '../context/User';

const WineryCard = ({winery, visits, onChangeRating, onAddRating, onUpdateWinery}) => { 

    const {currentUser} = useContext(UserContext)
  
    const {id, name, about, tastingcost, rezrequired, imagesrc, city, avgRating } = winery
    
    const wineryVisits = visits.filter(visit => visit.winery.id === id) 
 
    let userVisit; 
    
    if (wineryVisits.length >= 1 && currentUser) {
        userVisit = wineryVisits.find(visit => visit.user.id === currentUser.id) 
    } else {
        userVisit = null
    }

    const handleAddRating = () => {
        const newVisitObj = {
            user_id: currentUser.id,
            winery_id: winery.id,
            rating: 0
        }
         fetch("/visits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newVisitObj),
        }).then(r => r.json())
        .then(data => onAddRating(data))
    }

    const handleChangeRating = (newRating) => {
        fetch(`/visits/${userVisit.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({rating: newRating}),
            }).then(r => r.json())
            .then(data => {
                onChangeRating(data)
                fetch(`/wineries/${winery.id}`)
                .then(r => r.json())
                .then(data => {
                    onUpdateWinery(data)})
                })
    }
    
    const displayAvgRating = () =>  <StarRatingShow rating={avgRating}/>
    const displayUserRating = () => <div>Your Rating: <StarRatingEdit userRating={userVisit.rating} onChange={handleChangeRating} /></div> 


 

  return (
    <Card>
        <CardHeader>
            <img src={imagesrc} alt={name} style={{ width:'20em', border:'1px solid gray'} }/>
        </CardHeader>
        <Link to={`/wineries/${id}`} style={{display: 'inline-block',
                                    fontSize: '1.2em',
                                    textDecoration: 'none',
                                    color: '#472d30',
                                    borderBottom: '1px solid #ddd',
                                    justifySelf: 'center',
                                    padding:'1em',
                                    cursor: 'pointer',
                                    transition: 'color 0.25s ease-in',
                                    '&':'hover {color: #777;}'}}>
                {name}</Link>
        <CardHeading style={{margin:0}}>
            <p style={{fontSize:'.6em', fontWeight:'normal', color:'#aaa', margin:0, padding:0 }}>{city}</p>
            <p style={{fontSize:".4em", fontFamily:"cursive", padding:0}}> Tastings From ${tastingcost}</p>
            </CardHeading>
        <CardBody>
            <p style={{overflow:'none'}}>{about}</p>
            <p style={{fontSize:".8em", fontStyle:"italic"}}>Reservation Policy: {rezrequired}</p>
            <p>{displayAvgRating()} ({wineryVisits.length}) </p>
            <div>{userVisit? displayUserRating()  : <Button  onClick={handleAddRating}>Add Rating</Button>}</div>
            <CardButton ><Link to={`/wineries/${id}/comments/new`} style={{color:'white', textDecoration:'none'}} >Add Comment</Link></CardButton>
        </CardBody>
          
    </Card>
  )
}

export default WineryCard