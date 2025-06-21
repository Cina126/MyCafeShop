import React from 'react'
import './PanelHeaders.css';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function PanelHeaders() {
    return (
        <div className='PanelHeaders'>
            <div className='PanelHeaders__Right-Side'>
                <span>سید سینا سید رضایی</span>
                <span>برنامه نویس فرانت</span>
            </div>
            <div className='PanelHeaders__Left-Side'>
                <span className='PanelHeaders__Left-Side__Logout'>خروج از اکانت</span>
                <span><Brightness3Icon></Brightness3Icon></span>
                <span><ShoppingCartIcon></ShoppingCartIcon></span>
            </div>
        </div>
    )
}
