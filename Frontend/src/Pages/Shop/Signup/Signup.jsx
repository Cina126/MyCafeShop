/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useRef } from 'react'
import './Signup.css';

// strat add componenets
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone';
import Footer from '../../../Components/Shop/Footer/Footer';
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';
import Notice from '../../../Components/Shop/Notice/Notice';
import CampainComp from '../../../Components/Shop/CampainComp/CampainComp';
import IconsComp from './../../../Components/IconsComp/IconsComp'
// end add componenets

// start add depends 
import swal from 'sweetalert'
import { Link, useNavigate } from 'react-router-dom'
import { context } from '../../../Context/Context';
import toast from 'react-hot-toast';
// end add depends 

export default function Signup() {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const navigate = useNavigate()
    const contextUser = useContext(context)

    useEffect(() => {
        contextUser.setIsSignupNameValid(null)
        contextUser.setIsSignupFamilyValid(null)
        contextUser.setIsSignupPassValid(null)
        contextUser.setIsSignupMailValid(null)
        contextUser.setIsSignupPhoneValid(null)
    }, [])

    async function userSignupHandler(event) {
        event.preventDefault();
        if (
            new RegExp(contextUser.nameValidation).test(firstNameRef.current.value) &&
            new RegExp(contextUser.nameValidation).test(lastNameRef.current.value) &&
            new RegExp(contextUser.passwordValidation).test(passwordRef.current.value) &&
            new RegExp(contextUser.emailValidation).test(emailRef.current.value) &&
            new RegExp(contextUser.iranPhoneValidation).test(phoneRef.current.value)
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
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/users/registerNewUser`,
                    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
                if (Fetch.ok) {
                    const userToken = await Fetch.text();
                    localStorage.setItem("Caffe-User-Token", userToken);
                    swal({
                        title: "با موفقیت ثبت نام شدید",
                        buttons: "رفتن به صفحه اصلی",
                        icon: "success"
                    }).then(res => navigate("/"))
                }
            }
            catch (error) {
                console.log(error);
                toast.error("خطا در دیافت اطلاعات")
            }
        } else {
            toast.error("لطفا اطلاعات کامل وارد کنید")
        }


    }

    function changeNameLogic(event) {
        if (new RegExp(contextUser.nameValidation).test(event.target.value)) {
            contextUser.setIsSignupNameValid(true)
        } else {
            contextUser.setIsSignupNameValid(false)
        }
    }

    function changeFamilyLogic(event) {
        if (new RegExp(contextUser.nameValidation).test(event.target.value)) {
            contextUser.setIsSignupFamilyValid(true)
        } else {
            contextUser.setIsSignupFamilyValid(false)
        }
    }

    function changePassLogic(event) {
        if (new RegExp(contextUser.passwordValidation).test(event.target.value)) {
            contextUser.setIsSignupPassValid(true)
        } else {
            contextUser.setIsSignupPassValid(false)
        }
    }

    function changeMailLogic(event) {
        if (new RegExp(contextUser.emailValidation).test(event.target.value)) {
            contextUser.setIsSignupMailValid(true)
        } else {
            contextUser.setIsSignupMailValid(false)
        }
    }

    function changePhoneLogic(event) {
        if (new RegExp(contextUser.iranPhoneValidation).test(event.target.value)) {
            contextUser.setIsSignupPhoneValid(true)
        } else {
            contextUser.setIsSignupPhoneValid(false)
        }
    }

    function changeVisibilityLogic() {
        if (contextUser.passSignupInputType !== "text") {
            contextUser.setPassSignupInputType("text")
        } else {
            contextUser.setPassSignupInputType("password")
        }
    }

    return (
        <div className='Signup'>

            {/* start add notice comp  */}
            {
                contextUser.panelNotices
                    ?
                    contextUser.panelNotices.map(notice => <Notice isLoaded={true} key={notice.id} {...notice}></Notice>)
                    :
                    ""
            }
            {/* end add notice comp  */}

            {/* start campains comp  */}
            {
                contextUser.panelCampains
                    ?
                    contextUser.panelCampains.map(campain => <CampainComp key={campain.id} {...campain}></CampainComp>)
                    :
                    ""
            }
            {/* end campains comp  */}

            <div className='Signup__Form'>

                    <div className='Signup__Form__Input-Container'>
                        <div className={contextUser.isSignupNameValid === null || contextUser.isSignupNameValid ? "ValidSign" : "InValidSign"}>
                            <span>
                                <IconsComp iconName={"Person"}></IconsComp>
                            </span>
                            <input onChange={changeNameLogic} ref={firstNameRef} type="text" placeholder='لطفا نام خود را وارد کنید' required />
                        </div>
                        {
                            contextUser.isSignupNameValid || contextUser.isSignupNameValid === null
                                ?
                                ""
                                :
                                <span className='Signup__Form__Input-Container__Show-Valid-Structure'>
                                    نام باید بیشتر از  2 حرف باشد و شامل اعداد و حروف خاص نباشد
                                </span>
                        }
                    </div>

                    <div className='Signup__Form__Input-Container'>
                        <div className={contextUser.isSignupFamilyValid === null || contextUser.isSignupFamilyValid ? "ValidSign" : "InValidSign"}>
                            <span>
                                <IconsComp iconName={"People"}></IconsComp>
                            </span>
                            <input onChange={changeFamilyLogic} ref={lastNameRef} type="text" placeholder='لطفا نام خانوادگی خود را وارد کنید' required />
                        </div>
                        {
                            contextUser.isSignupFamilyValid || contextUser.isSignupFamilyValid === null
                                ?
                                ""
                                :
                                <span className='Signup__Form__Input-Container__Show-Valid-Structure'>
                                    نام خانوادگی باید بیشتر از  2 حرف باشد و شامل اعداد و حروف خاص نباشد
                                </span>
                        }
                    </div>

                    <div className='Signup__Form__Input-Container'>
                        <div className={contextUser.isSignupPassValid === null || contextUser.isSignupPassValid ? "ValidSign" : "InValidSign"}>
                            <span onClick={changeVisibilityLogic} style={{ cursor: "pointer" }}>
                                {
                                    contextUser.passSignupInputType === "password"
                                        ?
                                        <IconsComp iconName={"VisibilityOff"}></IconsComp>
                                        :
                                        <IconsComp iconName={"Visibility"}></IconsComp>
                                }
                            </span>
                            <input onChange={changePassLogic} ref={passwordRef} type={contextUser.passSignupInputType} placeholder='لطفا رمز عبور خود را وارد کنید' required />
                        </div>
                        {
                            contextUser.isSignupPassValid || contextUser.isSignupPassValid === null
                                ?
                                ""
                                :
                                <span className='Signup__Form__Input-Container__Show-Valid-Structure'>
                                    رمز عبور باید بیشتر از  8 حرف باشد و شامل اعداد و حروف (#,%,*,&,....) باشد
                                </span>
                        }
                    </div>

                    <div className='Signup__Form__Input-Container'>
                        <div className={contextUser.isSignupMailValid === null || contextUser.isSignupMailValid ? "ValidSign" : "InValidSign"}>
                            <span>
                                <IconsComp iconName={"Email"}></IconsComp>
                            </span>
                            <input onChange={changeMailLogic} ref={emailRef} type="email" placeholder='لطفا ایمیل خود را وارد کنید' required />
                        </div>
                        {
                            contextUser.isSignupMailValid || contextUser.isSignupMailValid === null
                                ?
                                ""
                                :
                                <span className='Signup__Form__Input-Container__Show-Valid-Structure'>
                                    فرمت ایمیل صحیح نیست (customName@gmail.com)
                                </span>
                        }
                    </div>

                    <div className='Signup__Form__Input-Container'>
                        <div className={contextUser.isSignupPhoneValid === null || contextUser.isSignupPhoneValid ? "ValidSign" : "InValidSign"}>
                            <span>
                                <IconsComp iconName={"PhoneIphone"}></IconsComp>
                            </span>
                            <input onChange={changePhoneLogic} ref={phoneRef} type="tel" placeholder='لطفا شماره همراه  خود را وارد کنید' required />
                        </div>
                        {
                            contextUser.isSignupPhoneValid || contextUser.isSignupPhoneValid === null
                                ?
                                ""
                                :
                                <span className='Signup__Form__Input-Container__Show-Valid-Structure'>
                                    فرمت شماره همراه صحیح نیست (09151234567)
                                </span>
                        }
                    </div>

                    {
                        (contextUser.isSignupPhoneValid || contextUser.isSignupPhoneValid === null)
                            &&
                            (contextUser.isSignupNameValid || contextUser.isSignupNameValid === null)
                            &&
                            (contextUser.isSignupFamilyValid || contextUser.isSignupFamilyValid === null)
                            &&
                            (contextUser.isSignupPassValid || contextUser.isSignupPassValid === null)
                            &&
                            (contextUser.isSignupMailValid || contextUser.isSignupMailValid === null)
                            ?
                            <button onClick={userSignupHandler}>ثبت نام</button>
                            :
                            <button style={{ backgroundColor: "var(--modal-background)", cursor: "auto" }} onClick={userSignupHandler}>ثبت نام</button>

                    }

                    <Link to={"/Login"} className='Signup__Form__Login-Container'>قبلا ثبت نام کردید ؟ <span>وارد شوید</span></Link>

            </div >

        </div >
    )
}
