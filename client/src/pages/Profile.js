import React, { useState } from 'react'
import { Container } from '../styles';
import ProfileData from '../components/ProfileData';
import ProfileEdit from '../components/ProfileEdit';


const Profile = ({onUpdateUser}) => {

    const [edit, setEdit] = useState(false)

    return (
    <Container>
            {edit === false? <ProfileData setEdit={setEdit} updateEdit={updateEdit} /> : <ProfileEdit onUpdateUser={onUpdateUser} setEdit={setEdit} updateEdit={updateEdit}/>}
    </Container>
    )

}    

export default Profile