import React from 'react'
import { Link } from 'react-router-dom'

const SubMenuItem = ({item}) => {
    return (
            <li>
                <Link to={item.path}>
                    {item.title}
                </Link>
            </li>
    )
}

export default SubMenuItem
