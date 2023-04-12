import React from 'react'
import { CardHeading, Container } from '../styles'

const Maps = () => {
  return (
    <Container>
      <div >
        <CardHeading>Napa Valley Maps</CardHeading>
        <img src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,q_75/v1/clients/napavalley/Napa_Valley_Wineries_and_Tasting_Rooms_8c469a00-4162-4a50-aa2c-05cbc27097d1.png"
        alt="Napa valley map"
        style={{ display: "block", marginLeft:"auto", marginRight:"auto", width:"66%"}}/>
      </div>
      <div>
        <CardHeading>Sonoma Maps</CardHeading>
        <img src="https://s3.amazonaws.com/winecountry-media/wp-content/uploads/sites/5/2016/02/18063038/Sonoma-County-Map-high3.jpg"
        alt="Sonoma map"
        style={{ display: "block", marginLeft:"auto", marginRight:"auto", width:"66%"}}/>
      </div>
    </Container>
  )
}

export default Maps