import React from 'react'
import './PanelHeaders.css';
import Brightness3Icon from '@mui/icons-material/Brightness3';

export default function PanelHeaders() {
    return (
        <div className='PanelHeaders'>
            <div className='PanelHeaders__Right-Side'>
                <span>سید سینا سید رضایی</span>
                <span>برنامه نویس فرانت</span>
            </div>
            <div className='PanelHeaders__Left-Side'>
                <span><Brightness3Icon></Brightness3Icon></span>
                <span className='PanelHeaders__Left-Side__Logout'>خروج از اکانت</span>
            </div>
        </div>
    )
}
