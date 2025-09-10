import React from 'react'
import './PanelArticles.css';
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelEditor from './../../../Components/Panel/PanelEditor/PanelEditor'
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders';

export default function PanelArticles() {
    return (
        <div className='PanelArticles'>

            <PanelRightSide></PanelRightSide>

            <div className='PanelArticles__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='PanelArticles__Left-Side__Space'></div>

                <span>افزودن مقاله جدید</span>

                <div className='PanelArticles__Left-Side__Add-New-Art-Titles'>
                    <input type="text" />
                    <input type="text" />
                </div>

                <textarea name="" id=""></textarea>
                <PanelEditor></PanelEditor>
            </div>
        </div>
    )
}
