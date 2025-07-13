/* eslint-disable no-unused-vars */

import React from 'react'
import './PanelCampains.css';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
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
            </div>
        </div>
    )
}
