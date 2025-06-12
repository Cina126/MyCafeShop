/* eslint-disable no-unused-vars */

import { useRef } from 'react'
import './Signup.css';
import HeaderPc from '../../Components/HeaderPc/HeaderPc';
import HeaderPhone from '../../Components/HeaderPhone/HeaderPhone';
import Footer from '../../Components/Footer/Footer';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

    const navigate = useNavigate()

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

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
                    })
                    // .then(res => navigate("/"))
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

            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>

            <div className='Signup__Form'>
                <form>
                    <input ref={firstNameRef} type="text" placeholder='لطفا نام خود را وارد کنید' required value="سمیه" />
                    <input ref={lastNameRef} type="text" placeholder='لطفا نام خانوادگی خود را وارد کنید' required value="ترحمی" />
                    <input ref={passwordRef} type="password" placeholder='لطفا رمز عبور خود را وارد کنید' required />
                    <input ref={emailRef} type="email" placeholder='لطفا ایمیل خود را وارد کنید' required value="somayeh@gmail.com" />
                    <input ref={phoneRef} type="tel" placeholder='لطفا شماره همراه  خود را وارد کنید' required value="09145" />
                    <button onClick={userSignupHandler}>ثبت نام</button>
                </form>
            </div>


            <Footer></Footer>
        </div>
    )
}
