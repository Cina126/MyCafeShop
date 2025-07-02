/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from 'react'
import './PanelRightSide.css';
import PanelMenus from '../PanelMenus/PanelMenus';
import { context } from '../../../Context/Context';

export default function PanelRightSide() {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
        contextUser.panelSetMenueFlag(prev => !prev)
    }, [])

    return (

        <div className='PanelRightSide'>
            <span className='PanelRightSide__Welcome'>خوش آمدید {contextUser.userInforms?.[0]?.firstName + " " + contextUser.userInforms?.[0]?.lastName}</span>
            <div className='PanelRightSide__Line'></div>
            {contextUser.panelMenues ? contextUser.panelMenues.map((menu) => { return <PanelMenus key={menu.id} {...menu} ></PanelMenus> }) : ""}
        </div>
    )
}
