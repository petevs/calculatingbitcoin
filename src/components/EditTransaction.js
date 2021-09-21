import React, { useState, useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import NavDropDown from './styledComponents/NavDropDown';
import MenuWrapper from './styledComponents/MenuWrapper';
import MenuHeading from './styledComponents/MenuHeading';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from 'firebase'
import { AuthContext } from 'state/contexts/Auth';

const EditTransaction = (props) => {

    const { user } = useContext(AuthContext);

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
