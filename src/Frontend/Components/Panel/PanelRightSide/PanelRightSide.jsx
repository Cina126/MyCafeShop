/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from 'react'
import './PanelRightSide.css';
import PanelMenus from '../PanelMenus/PanelMenus';
import context from '../../../Context/Context';

export default function PanelRightSide() {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.panelSetMenueFlag(prev => !prev)
    }, [])

    return (

        <div className='PanelRightSide'>
            {contextUser.panelMenues?.length ? contextUser.panelMenues.map((menu) => { return <PanelMenus key={menu.id} {...menu} ></PanelMenus> }) : ""}
        </div>
    )
}
