import React from 'react'
import './PanelNotice.css';
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders';

export default function PanelNotice() {
    return (
        <div className='PanelNotice'>
            <PanelRightSide></PanelRightSide>

            <div className='PanelSubComments__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='Space'></div>
                <span className='PanelSubComments__Left-Side__Title'>افزودن اطلاعیه جدید</span>

                <div className='PanelSubComments__Left-Side__Add-New-Notice'>
                    <input type="text" placeholder='متن اطلاعیه را وارد کنید ...' />
                    <button>ثبت اطلاعیه</button>
                </div>

                <div className='PanelSubComments__Left-Side__Show-All-Notices'></div>
            </div>
        </div>
    )
}
