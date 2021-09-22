import { Modal } from '@mui/material'
import React from 'react'

const MainModal = ({open, onClose, children}) => {

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'rgb(33, 43, 54)',
        border: '1px solid rgba(145, 158, 171, 0.08)',
        boxShadow: 'rgb(0 0 0 / 24%) 0px 0px 2px 0px',
        p: 4,
        color: '#fff',
        padding: '1rem',
        borderRadius: '6px'
    }


    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div style={modalStyle}>
                {children}
            </div>
        </Modal>
    )
}

export default MainModal