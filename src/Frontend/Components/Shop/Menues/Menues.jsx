/* eslint-disable no-unused-vars */

import './Menues.css'
import { NavLink } from 'react-router-dom'

export default function Menues({ id, title, to, isLoaded }) {
    if (isLoaded) {
        return <NavLink id={id} className={(headerLink) => { return headerLink.isActive ? "activeHeaderLink HeaderLink" : "HeaderLink" }} to={to}>{title}</NavLink>
    } else {
        return <NavLink id={id} className='HeaderLink' to={to}><span className="loader"></span></NavLink>
    }
}
