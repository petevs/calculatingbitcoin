import React, { useState, useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import NavDropDown from './styledComponents/NavDropDown';
import { MenuWrapper } from './styledComponents/MenuWrapper';
import MenuHeading from './styledComponents/MenuHeading';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from 'firebase'
import { AuthContext } from 'state/contexts/Auth';

import { UserContext } from "state/contexts/UserContext";
import { updateEditingTransaction } from 'state/actions/updatePortfolio';
import { updateSettings } from 'state/actions/updateSettings';


const EditTransaction = (props) => {

    const { user } = useContext(AuthContext);
    const { settingsDispatch, portfolioDispatch } = useContext(UserContext)

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e) => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)


    const handleDelete = () => {
        db.collection('users').doc(user.uid).collection('transactions').doc(props.id).delete()
        handleClose()
    }


    const handleEditClick = () => {
        const payload = {
            name: 'modalOpen',
            value: true
        }
        settingsDispatch(updateSettings(payload))
        portfolioDispatch(updateEditingTransaction({...props}))
        handleClose()
    }


    return (
        <div>
            <IconButton
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <NavDropDown
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
            >
                <MenuWrapper>
                    <div onClick={handleEditClick}>
                        <MenuHeading>
                            <EditIcon />
                            Edit
                        </MenuHeading>
                    </div>
                    <div onClick={handleDelete}>
                        <MenuHeading>
                            <DeleteIcon />
                            Delete
                        </MenuHeading>
                    </div>
                </MenuWrapper>
            </NavDropDown>
        </div>
    )
}

export default EditTransaction
