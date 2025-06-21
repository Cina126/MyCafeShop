import React from 'react';
import './PanelMenus.css'
import { NavLink } from 'react-router-dom'

export default function PanelMenus({ id, title, to }) {
    return <NavLink className={(link) => { return link.isActive ? "activePanelMenus" : "" }} id={id} to={to}>{title}</NavLink>
}
