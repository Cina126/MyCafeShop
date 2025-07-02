/* eslint-disable no-unused-vars */

import React from 'react'
import './PanelCampains.css';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelOffCodes from './../../../Components/Panel/PanelOffCodes/PanelOffCodes'
import { context } from '../../../Context/Context';
import swal from 'sweetalert';

export default function PanelCampains() {
    return (
        <div className='PanelCampains'>
            <PanelRightSide></PanelRightSide>

            <div className='PanelSubComments__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='Space'></div>
                <span className='PanelSubComments__Left-Side__Title'>افزودن کمپین جدید</span>
                {/* 
                      <div className='PanelOffers__Add-New-Code'>
                          <input ref={codeName} type="text" placeholder='کد تخفیف را وارد کنید :' />
                          <input ref={codePrecent} type="text" placeholder='درصد تخفیف را وارد کنید ' />
                          <input ref={codeAmount} type="text" placeholder='تعداد استفاده کد را وارد کنید' />
                          <button onClick={sumbitNewOffCode}>ثبت کد</button>
                      </div>
      
                      <div className='PanelOffers__Show-All-Codes'>
                          <div className='PanelOffers__Show-All-Codes__Title'>
                              <span>کد تخفیف</span>
                              <span>درصد تخفیف</span>
                              <span>مقدار</span>
                              <span>تعداد استفاده</span>
                              <span>سازنده کد</span>
                              <span>تاریخ ثبت کد</span>
                              <div></div>
                              <div></div>
                          </div>
                          {contextUser.offersCode?.length ? contextUser.offersCode.map((code) => {
                              return <PanelOffCodes key={code.id} {...code}></PanelOffCodes>
                          }) : ""}
                      </div> */}

            </div>
        </div>
    )
}
