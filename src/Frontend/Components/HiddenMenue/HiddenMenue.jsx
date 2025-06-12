import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './HiddenMenue.css'
import context from '../../Context/Context'

import Coffee from './../../../Images/Ghahve/Other/coffee-beans.png'
import ClearIcon from '@mui/icons-material/Clear';

export default function HiddenMenue({ style }) {
    const contexUser = useContext(context);
    const navigate = useNavigate();

    function delete_Menue_Logic() {
        contexUser.setIsOpenHiddenMenue(false);
    }
    
    return (
        <section className="HiddenMenue" style={style}>
            <img src={Coffee} alt="" />
            <li onClick={() => { navigate("/") }}>صفحه اصلی</li>
            <li onClick={() => { navigate("/AllProducts") }}>همه محصولات</li>
            <li>بلاگ ها </li>
            <li>در باره ما </li>
            <li>تماس با ما</li>
            <div>
                ویژه در سطح جهانی
                <li>ترکیبات تجاری</li>
                <li>قهوه زینو برزیلی</li>
            </div>
            <li>دیکشنری</li>
            <div className='HiddenMenue__Tie_Line'></div>
            <li>ثبت نام </li>
            <li>ارتباط با ما</li>
            <span onClick={delete_Menue_Logic} className='HiddenMenue__Delete'><ClearIcon></ClearIcon></span>
        </section>
    )
}
