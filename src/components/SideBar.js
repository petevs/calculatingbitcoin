import React from 'react'
import styled from 'styled-components'
import { menuList } from 'data/sidebar';
import SideBarHeading from './SideBarHeading';
import Logo from './Logo';

const SideBar = () => {
    return (
        <MyDrawer>
            <Logo />
            <ProfileCard>
                <ProfileImage src='https://res.cloudinary.com/minimal-ui/image/upload/v1614655910/upload_minimal/avatar/minimal_avatar.jpg' />
                <div>
                    <h5>User Name</h5>
                    <h6>Some Text</h6>
                </div>
            </ProfileCard>
            {
                menuList.map(item => {
                    return(
                        <SideBarHeading
                            item={{...item}}
                        />
                    )
                })
            }
        </MyDrawer>
    )
}

export default SideBar

const MyDrawer = styled.div`
    display: grid;
    align-content: start;
    gap: 0rem;
    border-right: 1px solid rgba(145, 158, 171, 0.24);
    background-color: #fff;
    grid-area: sidecar;

    // & h3{
    //     text-transform: uppercase;
    //     font-size: .75rem;
    //     color: rgb(33, 43, 54);
    // }
`

const ProfileCard = styled.div`
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

const Heading = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: .5rem;
    font-size: .875rem;
    color: rgb(99, 115, 129);
    font-weight: 400;
    padding: 1rem 2rem;
    cursor: pointer;
    
    &:hover {
        background-color: #F7F7F8 !important;
    }
`