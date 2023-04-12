import React from 'react';  
import { Card, CardBody, CardHeader, CardHeading } from '../styles';
import StarRatingShow from './StarRatingShow';


const UserCard = ({user}) => {    
        
    const userRatings = user.visits.map(visit => { 
            return <li key={visit.id}>{visit.winery.name}: <StarRatingShow rating={visit.rating}/></li>
    })
 
  
 return (
    <Card style={{height:'20em'}}>
        <CardHeader>
            <CardHeading style={{position:"absolute", top:"0px", left:"3px"}}>{user.username}</CardHeading>
        </CardHeader>
        <CardBody style={{position:"absolute", top:"5em"}}>
            <CardHeading style={{'font-size':'1.1em', color:'rgb(150,78,108)' }}>Wineries Visited:</CardHeading>
            <div style={{height:"12em", overflow:"auto"}} >
                {userRatings}
            </div>
        </CardBody>
    </Card>
  
  )
}

export default UserCard