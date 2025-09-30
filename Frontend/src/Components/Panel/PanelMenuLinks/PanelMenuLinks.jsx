import React from 'react';
import './PanelMenuLinks.css'
import { NavLink } from 'react-router-dom';
import IconsComp from '../../IconsComp/IconsComp'

export default function PanelMenuLinks({ id, title, to, iconName, isLoaded }) {
    if (isLoaded) {
        return (
            <NavLink className={(link) => { return link.isActive ? "PanelMenuLinks activePanelMenuLinks" : "PanelMenuLinks" }} id={id} to={to}>
                <IconsComp iconName={iconName}></IconsComp>
                {title}
            </NavLink>
        )
    } else {
        return (
            <div className='PanelMenuLinksLoading skeleton'></div>
        )
    }

}
