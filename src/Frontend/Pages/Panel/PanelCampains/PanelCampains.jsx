/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react'
import './PanelCampains.css';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import { context } from '../../../Context/Context';
import swal from 'sweetalert';
import PanelCampainsComp from './../../../Components/Panel/PanelCampainsComp/PanelCampainsComp'

export default function PanelCampains() {

    const contextUser = useContext(context)

    useEffect(() => {
        contextUser.setAllProductsFlag(prev => !prev)
        contextUser.setPanelCampainsFlag(prev => !prev)
    }, [])

    return (
        <div className='PanelCampains'>
            <PanelRightSide></PanelRightSide>

            <div className='PanelSubComments__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='Space'></div>
                <span className='PanelSubComments__Left-Side__Title'>افزودن کمپین جدید</span>

                <div className='PanelSubComments__Left-Side__Add-New-Campain'>
                    <input type="text" placeholder='عنوان کمپین را وارد کنید ...' required />
                    <input type="number" placeholder='مدت زمان کمپین به روز را وارد کنید ...' required />
                    <input type="number" placeholder='مقدار درصد کمپین را وارد کنید ...' required />
                    <button>انتخاب محصولات</button>
                    <button>ثبت کمپین</button>
                </div>

                <div className='PanelSubComments__Left-Side__All-Campains'>
                    {
                        contextUser.panelCampains ?
                            contextUser.panelCampains.map(campain => <PanelCampainsComp key={campain.id} {...campain}></PanelCampainsComp>)
                            : ""
                    }
                </div>
                
            </div>
        </div>
    )
}
