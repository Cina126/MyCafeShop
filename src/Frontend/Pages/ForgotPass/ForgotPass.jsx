import React from 'react'
import './ForgotPass.css';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import HeaderPc from '../../Components/HeaderPc/HeaderPc';
import HeaderPhone from '../../Components/HeaderPhone/HeaderPhone';
import Footer from '../../Components/Footer/Footer';
import swal from 'sweetalert'

export default function ForgotPass() {

    const navigate = useNavigate()

    const firtNameRef = useRef()
    const LastNameRef = useRef()
    const phoneRef = useRef()

    async function userForgotHandler(event) {
        event.preventDefault()
        try {
            const datas = { firstName: firtNameRef.current.value, lastName: LastNameRef.current.value, password: phoneRef.current.value }
            const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/getUserInformsForgot`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
            if (Fetch.ok) {
                const Json = await Fetch.json()
                localStorage.setItem("Caffe-User-Token", JSON.stringify(Json[0].token));
                swal({
                    title: "با موفقیت وارد شدید",
                    buttons: "رفتن به صفحه اصلی",
                    icon: "success"
                })
                    .then(res => navigate("/"))
            } else {
                swal({
                    title: `خطا در دیافت اطلاعات`,
                    buttons: "تلاش دوباره",
                    icon: "error"
                })
            }
        } catch (error) {
            console.log(error);
            swal({
                title: `خطا در برقراری ارتباط `,
                buttons: "تلاش دوباره",
                icon: "error"
            });
        }
    }

    return (
        <div className='Forgot'>

            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>

            <div className='Forgot__Form'>
                <form>
                    <input ref={firtNameRef} type="text" placeholder='لطفا نام خود را وارد کنید' required />
                    <input ref={LastNameRef} type="text" placeholder='لطفا نام خانوادگی خود را وارد کنید' required />
                    <input ref={phoneRef} type="tel" placeholder='لطفا شماره خود را وارد کنید' required />
                    <button onClick={userForgotHandler}>بازیابی رمز عبور</button>
                </form>
            </div>

            <Footer></Footer>
        </div>
    )
}
