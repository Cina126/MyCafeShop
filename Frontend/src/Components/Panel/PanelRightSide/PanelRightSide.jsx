/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from 'react';
import './PanelRightSide.css';

import PanelMenuLinks from './../PanelMenuLinks/PanelMenuLinks';

import { context } from '../../../Context/Context';

export default function PanelRightSide() {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
        contextUser.setPanelMenuLinksFlag(prev => !prev)
    }, [])

    return (
        <div className='PanelRightSide'>
            <span className='PanelRightSide__Welcome'>خوش آمدید {contextUser.userInforms?.[0]?.firstName + " " + contextUser.userInforms?.[0]?.lastName}</span>
            <div className='PanelRightSide__Line'></div>
            {
                contextUser.panelMenuLinks
                    ?
                    contextUser.panelMenuLinks.map((menu) => { return <PanelMenuLinks key={menu.id} {...menu} isLoaded={true} ></PanelMenuLinks> })
                    :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((menu) => { return <PanelMenuLinks key={menu} isLoaded={false} ></PanelMenuLinks> })
            }
        </div>
    )
}
