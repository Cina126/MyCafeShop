import './HiddenMenuesLinks.css'
import { NavLink } from 'react-router-dom'

export default function HiddenMenuesLinks({ id, title, to, isLoaded }) {
    if (isLoaded) {
        return <NavLink className={link => link.isActive ? "activeHiddMenue HiddenMenuesLinks" : "HiddenMenuesLinks"} id={id} to={to}>{title}</NavLink>
    } else {
        return <NavLink className="Loading-Hidd-menue" id={id} to={to}>{title}</NavLink>
    }

}
