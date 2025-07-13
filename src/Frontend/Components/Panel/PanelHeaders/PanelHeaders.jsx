import React from 'react'
import './PanelHeaders.css';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { useNavigate } from 'react-router-dom';

export default function PanelHeaders() {

    const navigate = useNavigate()

    return (
        <div className='PanelHeaders'>
            <div className='PanelHeaders__Right-Side'>
                <span>سید سینا سید رضایی</span>
                <span>برنامه نویس فرانت</span>
            </div>
            <div className='PanelHeaders__Left-Side'>
                <span><Brightness3Icon></Brightness3Icon></span>
                <span className='PanelHeaders__Left-Side__Logout'>خروج از اکانت</span>
                <span onClick={() => { navigate("/") }} className='PanelHeaders__Left-Side__Home'>رفتن به صفحه اصلی</span>
            </div>
        </div>
    )
}
