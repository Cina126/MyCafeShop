import './MenuesLinks.css'
import { NavLink } from 'react-router-dom'

export default function MenuesLinks({ id, title, to }) {
    return <NavLink id={id} className={(headerLink) => { return headerLink.isActive ? "activeHeaderLink HeaderLink" : "HeaderLink" }} to={to}>{title}</NavLink>
}
