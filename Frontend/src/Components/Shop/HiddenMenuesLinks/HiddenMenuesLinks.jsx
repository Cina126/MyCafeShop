import './HiddenMenuesLinks.css'
import { NavLink } from 'react-router-dom'

export default function HiddenMenuesLinks({ id, title, to }) {
    return <NavLink className={link => link.isActive ? "activeHiddMenue HiddenMenuesLinks" : "HiddenMenuesLinks"} id={id} to={to}>{title}</NavLink>
}
