import React from 'react'
import SideBarDropdown from './SideBarDropdown'
import SideBarItem from './SideBarItem'

const SideBarMenu = ({item}) => {

    if (item.subMenu) {
        return(
            <SideBarDropdown
                item={{...item}}
            />
        )
    }



    return (
        <SideBarItem
            item={{...item}}
        />
    )


}

export default SideBarMenu
