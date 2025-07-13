/* eslint-disable no-unused-vars */

import './MenuesLinks.css'
import { NavLink } from 'react-router-dom'

export default function MenuesLinks({ id, title, to, isLoaded }) {
    if (isLoaded) {
        return <NavLink id={id} className={(headerLink) => { return headerLink.isActive ? "activeHeaderLink HeaderLink" : "HeaderLink" }} to={to}>{title}</NavLink>
    } else {
        return <NavLink id={id} className='HeaderLink skeleton' to={to}></NavLink>
    }
}
