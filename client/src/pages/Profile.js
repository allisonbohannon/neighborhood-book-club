import React, { useContext, useState } from 'react'
import { UserContext } from '../context/User'; 
import { Container } from '../styles';
import ProfileData from '../components/ProfileData';
import ProfileEdit from '../components/ProfileEdit';


const Profile = ({onUpdateUser}) => {

    const { currentUser } = useContext(UserContext); 
    const [edit, setEdit] = useState(false)

    const updateEdit = () => {
        setEdit(!edit)
    }
   

    return (
    <Container>
            {edit === false? <ProfileData setEdit={setEdit} updateEdit={updateEdit} /> : <ProfileEdit onUpdateUser={onUpdateUser} setEdit={setEdit} updateEdit={updateEdit}/>}
    </Container>
    )

}    

export default Profile