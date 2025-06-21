import React from 'react';
import './PanelMenus.css'
import { NavLink } from 'react-router-dom';
import IconsComp from './../../IconsComp/IconsComp'

export default function PanelMenus({ id, title, to, iconName }) {
    return (
        <NavLink className={(link) => { return link.isActive ? "PanelMenus activePanelMenus" : "PanelMenus" }} id={id} to={to}>
            <IconsComp iconName={iconName}></IconsComp>
            {title}
        </NavLink>
    )
}
