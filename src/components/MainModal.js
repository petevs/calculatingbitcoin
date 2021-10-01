import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'

const MainModal = (props) => {

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

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: 0,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
        }
    }


    return (
        <Modal
            as={motion.Modal}
            variants={dropIn}
            initial='hidden'
            animate='visible'
            exit='exit'
            open={props.open}
            onClose={props.onClose}
            disableEnforceFocus
        >
            <div style={modalStyle}>
                {props.children}
            </div>
        </Modal>
    )
}

export default MainModal