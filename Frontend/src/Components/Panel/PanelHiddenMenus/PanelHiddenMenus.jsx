import React, { useContext, useEffect } from 'react'
import './PanelHiddenMenus.css';
import { context } from './../../../Context/Context';
import PanelHiddenMenuLinks from '../PanelHiddenMenuLinks/PanelHiddenMenuLinks';
import IconsComp from '../../IconsComp/IconsComp';

export default function PanelHiddenMenus({ styles }) {

    const contextUser = useContext(context)

    function closeHiddenMenuLogic() {
        contextUser.setIsOpenPanelHiddenMenu(false)
    }

    useEffect(() => {
        if (contextUser.windowSize >= 730) {
            contextUser.setIsOpenPanelHiddenMenu(false)
        }
    }, [contextUser.windowSize])

    return (
        <div className='PanelHiddenMenus' style={styles}>
            <span onClick={closeHiddenMenuLogic} className='PanelHiddenMenus__Close-Hidden-Menu'>
                <IconsComp iconName={"Clear"}></IconsComp>
            </span>
            <span className='PanelHiddenMenus__Welcome'>خوش آمدید {contextUser.userInforms?.[0]?.firstName + " " + contextUser.userInforms?.[0]?.lastName}</span>
            <div className='PanelHiddenMenus__Line'></div>
            {
                contextUser.panelMenuLinks
                    ?
                    contextUser.panelMenuLinks.map((menu) => { return <PanelHiddenMenuLinks key={menu.id} {...menu} isLoaded={true} ></PanelHiddenMenuLinks> })
                    :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((menu) => { return <PanelHiddenMenuLinks key={menu} isLoaded={false} ></PanelHiddenMenuLinks> })
            }
        </div>
    )
}
