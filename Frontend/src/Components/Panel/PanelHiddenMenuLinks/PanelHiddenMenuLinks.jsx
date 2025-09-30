import React from 'react'
import './PanelHiddenMenuLinks.css';
import IconsComp from '../../IconsComp/IconsComp';
import { NavLink } from 'react-router-dom';

export default function PanelHiddenMenuLinks({ id, to, iconName, title, isLoaded }) {
    if (isLoaded) {
        return (
            <NavLink className={(link) => { return link.isActive ? "PanelHiddenMenuLinks activePanelHiddenMenuLinks" : "PanelHiddenMenuLinks" }} id={id} to={to}>
                <IconsComp iconName={iconName}></IconsComp>
                {title}
            </NavLink>
        )
    } else {
        return (
            <div className='PanelHiddenMenuLinks skeleton'></div>
        )
    }
}
