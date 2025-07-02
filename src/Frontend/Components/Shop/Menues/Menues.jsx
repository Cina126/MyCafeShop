/* eslint-disable no-unused-vars */

import './Menues.css'
import { NavLink } from 'react-router-dom'

export default function Menues({ title, to, isLoaded }) {
    if (isLoaded) {
        return <NavLink className={(headerLink) => { return headerLink.isActive ? "activeHeaderLink HeaderLink" : "HeaderLink" }} to={to}>{title}</NavLink>
    } else {
        return <NavLink className='HeaderLink' to={to}><span className="loader"></span></NavLink>
    }
}
