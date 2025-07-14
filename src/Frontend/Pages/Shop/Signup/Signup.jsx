/* eslint-disable no-unused-vars */

import { useContext, useRef } from 'react'
import './Signup.css';
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone';
import Footer from '../../../Components/Shop/Footer/Footer';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';
import { context } from '../../../Context/Context';
import Notice from '../../../Components/Shop/Notice/Notice';

export default function Signup() {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const navigate = useNavigate()
    const contextUser = useContext(context)

    async function userSignupHandler(event) {
        event.preventDefault();
        if (
            firstNameRef.current.value &&
            lastNameRef.current.value &&
            passwordRef.current.value &&
            emailRef.current.value &&
            phoneRef.current.value
        ) {
            const datas = [{
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                password: passwordRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                dateJoined: new Date().toLocaleDateString("fa-Ir"),
                isBlocked: 0
            }];
            try {
                const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/registerNewUser`,
                    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
                if (Fetch.ok) {
                    const userToken = await Fetch.text();
                    localStorage.setItem("Caffe-User-Token", userToken);
                    swal({
                        title: "با موفقیت ثبتنام شدید",
                        buttons: "رفتن به صفحه اصلی",
                        icon: "success"
                    }).then(res => navigate("/"))
                }
            }
            catch (error) {
                console.log(error);
                swal({
                    title: `خطا در دیافت اطلاعات`,
                    buttons: "تلاش دوباره",
                    icon: "error"
                })
            }
        } else {
            swal({
                title: `لطفا اطلاعات کامل وارد کنید`,
                buttons: "تلاش دوباره",
                icon: "error"
            })
        }


    }
    return (
        <div className='Signup'>

            {
                contextUser.panelNotices
                    ?
                    contextUser.panelNotices.map(notice => <Notice isLoaded={true} key={notice.id} {...notice}></Notice>)
                    :
                    ""
            }

            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>

            {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

            <div className='Signup__Form'>
                <form>
                    <input ref={firstNameRef} type="text" placeholder='لطفا نام خود را وارد کنید' required />
                    <input ref={lastNameRef} type="text" placeholder='لطفا نام خانوادگی خود را وارد کنید' required />
                    <input ref={passwordRef} type="password" placeholder='لطفا رمز عبور خود را وارد کنید' required />
                    <input ref={emailRef} type="email" placeholder='لطفا ایمیل خود را وارد کنید' required />
                    <input ref={phoneRef} type="tel" placeholder='لطفا شماره همراه  خود را وارد کنید' required />
                    <button onClick={userSignupHandler}>ثبت نام</button>
                </form>
            </div>


            <Footer></Footer>
        </div>
    )
}
