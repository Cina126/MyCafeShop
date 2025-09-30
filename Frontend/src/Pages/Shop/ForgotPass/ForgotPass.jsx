import React, { useContext } from 'react'
import './ForgotPass.css';

// start import componenets 
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone';
import Footer from '../../../Components/Shop/Footer/Footer';
import Notice from '../../../Components/Shop/Notice/Notice';
import CampainComp from '../../../Components/Shop/CampainComp/CampainComp';
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';
// end import componenets 

// start add depends 
import swal from 'sweetalert';
import { context } from '../../../Context/Context';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
// end add depends 

export default function ForgotPass() {

    const navigate = useNavigate()

    const firtNameRef = useRef()
    const LastNameRef = useRef()
    const phoneRef = useRef()
    const contextUser = useContext(context)

    async function userForgotHandler(event) {
        event.preventDefault()
        try {
            const datas = { firstName: firtNameRef.current.value, lastName: LastNameRef.current.value, password: phoneRef.current.value }
            const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/users/getUserInformsForgot`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
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

            {/* start notice componenet */}
            {
                contextUser.panelNotices
                    ?
                    contextUser.panelNotices.map(notice => <Notice isLoaded={true} key={notice.id} {...notice}></Notice>)
                    :
                    ""
            }
            {/* start notice componenet */}


            {/* start campains comp  */}
            {
                contextUser.panelCampains
                    ?
                    contextUser.panelCampains.map(campain => <CampainComp key={campain.id} {...campain}></CampainComp>)
                    :
                    ""
            }
            {/* end campains comp  */}

            {/* start headers  */}
            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>
            {/* start headers  */}

            {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

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
