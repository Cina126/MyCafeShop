/* eslint-disable no-unused-vars */

import './Menues.css'
import { NavLink } from 'react-router-dom'

export default function Menues({ title, to, isLoaded }) {
    if (isLoaded) {
        return <NavLink className={(link) => { return link.isActive ? "activeLink Link" : "Link" }} to={to}>{title}</NavLink>
    } else {
        return <NavLink className='Link' to={to}><span className="loader"></span></NavLink>
    }
}
