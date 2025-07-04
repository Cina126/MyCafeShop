import './HiddenMenue.css'
import { NavLink } from 'react-router-dom'

export default function HiddenMenue({ id, title, to, isLoaded }) {
    if (isLoaded) {
        return <NavLink className={link => link.isActive ? "activeHiddMenue HiddenMenue" : "HiddenMenue"} id={id} to={to}>{title}</NavLink>
    } else {
        return <NavLink className="Loading-Hidd-menue" id={id} to={to}>{title}</NavLink>
    }

}
