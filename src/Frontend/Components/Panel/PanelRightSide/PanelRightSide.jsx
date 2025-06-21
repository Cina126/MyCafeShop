/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from 'react';
import './PanelRightSide.css';

import PanelMenus from '../PanelMenus/PanelMenus';
import PanelMenusLoading from '../../PanelLoading/PanelMenusLoading';

import { context } from '../../../Context/Context';

export default function PanelRightSide() {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
        contextUser.setPanelMenusFlag(prev => !prev)
    }, [])

    return (
        <div className='PanelRightSide'>
            <span className='PanelRightSide__Welcome'>خوش آمدید {contextUser.userInforms?.[0]?.firstName + " " + contextUser.userInforms?.[0]?.lastName}</span>
            <div className='PanelRightSide__Line'></div>
            {
                contextUser.panelMenus
                    ?
                    contextUser.panelMenus.map((menu) => { return <PanelMenus key={menu.id} {...menu} ></PanelMenus> })
                    :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((menu) => { return <PanelMenusLoading key={menu}></PanelMenusLoading> })
            }
        </div>
    )
}
