import { Drawer } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const SideCar = () => {
    return (
        <MyDrawer
            variant='persistent'
            open={true}
        >
            <h2>Hello</h2>
        </MyDrawer>
    )
}

export default SideCar

const MyDrawer = styled(Drawer)`
    width: 500px;


`