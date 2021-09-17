import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from 'state/contexts/UserContext'

const ProfileCard = ({ name, img}) => {

    const { settings } = useContext(UserContext)

    return (
        <MyProfileCard>
            <ProfileImage src={img} />
            <div>
                <h5>Welcome, {settings.name}</h5>
                <h6>Happy Calculating!</h6>
            </div>
        </MyProfileCard>
    )
}

export default ProfileCard

const MyProfileCard = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-template-rows: 40px;
    background-color: #F2F3F5;
    border-radius: 1rem;
    padding: 1rem;
    gap: 1rem;
    align-items: center;
    margin: 1rem;
`

const ProfileImage = styled.img`
    width: 100%;
    border-radius: 50%;
`