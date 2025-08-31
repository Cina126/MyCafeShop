/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from 'react';

import './Login.css';

// start add componenets
import Notice from '../../../Components/Shop/Notice/Notice';
import CampainComp from '../../../Components/Shop/CampainComp/CampainComp';
import IconsComp from '../../../Components/IconsComp/IconsComp';
// end add componenets

// start add depends 
import swal from 'sweetalert'
import { context } from '../../../Context/Context';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import LoadingRequest from '../../../Components/LoadingRequest/LoadingRequest';
// end add depends 



export default function Login() {

    const contextUser = useContext(context)

    const navigate = useNavigate()
    const firtNameRef = useRef()
    const LastNameRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        contextUser.setIsOpenHiddenMeues(false)
    }, [])

    // start add null value to inputs 
    useEffect(() => {
        contextUser.setIsLoginNameValid(null)
        contextUser.setIsLoginFamilyValid(null)
        contextUser.setIsLoginPassValid(null)
    }, [])
    // end add null value to inputs 


    async function userLoginHandler(event) {
        event.preventDefault()
        if (
            new RegExp(contextUser.nameValidation).test(firtNameRef.current.value) &&
            new RegExp(contextUser.nameValidation).test(LastNameRef.current.value) &&
            new RegExp(contextUser.passwordValidation).test(passwordRef.current.value)
        ) {
            const datas = { firstName: firtNameRef.current.value, lastName: LastNameRef.current.value, password: passwordRef.current.value }
            try {
                contextUser.setIsLoadingRequest(true)
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/users/getUserInformsLogin`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
                if (Fetch.ok) {
                    const Json = await Fetch.json()
                    if (Json[0].isBlocked === 0) {
                        localStorage.setItem("Caffe-User-Token", Json[0].token);
                        firtNameRef.current.value = ""
                        LastNameRef.current.value = ""
                        passwordRef.current.value = ""
                        swal({
                            title: "با موفقیت وارد شدید",
                            buttons: "رفتن به صفحه اصلی",
                            icon: "success"
                        }).then(res => navigate("/"))
                    } else {
                        toast.error("بنا به دلایلی تا اطلاع ثانوی اکانت شما مسدود میباشد")
                    }

                }
                else {
                    toast.error("خطا در برقراری ارتباط ")
                }
            }
            catch (error) {
                console.log(error);
                toast.error("خطا در برقراری ارتباط ")
            }
            finally {
                contextUser.setIsLoadingRequest(false)
            }

        } else {
            toast.error("لطفا فیلد هارو به درستی پر کنید ")
        }

    }

    function changeVisibilityLogic() {
        if (contextUser.passLoginInputType !== "text") {
            contextUser.setPassLoginInputType("text")
        } else {
            contextUser.setPassLoginInputType("password")
        }
    }

    function changeNameLogic(event) {
        if (new RegExp(contextUser.nameValidation).test(event.target.value)) {
            contextUser.setIsLoginNameValid(true)
        } else {
            contextUser.setIsLoginNameValid(false)
        }
    }

    function changeFamilyLogic(event) {
        if (new RegExp(contextUser.nameValidation).test(event.target.value)) {
            contextUser.setIsLoginFamilyValid(true)
        } else {
            contextUser.setIsLoginFamilyValid(false)
        }
    }

    function changePassLogic(event) {
        if (new RegExp(contextUser.passwordValidation).test(event.target.value)) {
            contextUser.setIsLoginPassValid(true)
        } else {
            contextUser.setIsLoginPassValid(false)
        }
    }

    return (
        <div className='Login'>

            {/* start add Loading Requerst Component */}
            {contextUser.isLoadingRequest ? <LoadingRequest></LoadingRequest> : ""}
            {/* end add Loading Requerst Component */}

            <div className='Login__Form'>

                <div className='Login__Form__Input-Container'>
                    <div className={contextUser.isLoginNameValid === null || contextUser.isLoginNameValid ? "validInput" : "inValidInput"}>
                        <span>
                            <IconsComp iconName={"Person"}></IconsComp>
                        </span>
                        <input onChange={changeNameLogic} ref={firtNameRef} type="text" placeholder='لطفا نام خود را وارد کنید' required />
                    </div>
                    {
                        contextUser.isLoginNameValid === null || contextUser.isLoginNameValid
                            ?
                            ""
                            :
                            <span className='Login__Form__Input-Container__Show-Valid-Structure'>
                                نام باید بیشتر از  2 حرف باشد و شامل اعداد و حروف خاص نباشد
                            </span>
                    }
                </div>

                <div className='Login__Form__Input-Container'>
                    <div className={contextUser.isLoginFamilyValid === null || contextUser.isLoginFamilyValid ? "validInput" : "inValidInput"}>
                        <span>
                            <IconsComp iconName={"People"}></IconsComp>
                        </span>
                        <input onChange={changeFamilyLogic} ref={LastNameRef} type="text" placeholder='لطفا نام خانوادگی خود را وارد کنید' required />
                    </div>
                    {
                        contextUser.isLoginFamilyValid === null || contextUser.isLoginFamilyValid
                            ?
                            ""
                            :
                            <span className='Login__Form__Input-Container__Show-Valid-Structure'>
                                نام خانوادگی باید بیشتر از  2 حرف باشد و شامل اعداد و حروف خاص نباشد
                            </span>
                    }
                </div>

                <div className='Login__Form__Input-Container'>
                    <div className={contextUser.isLoginPassValid === null || contextUser.isLoginPassValid ? "validInput" : "inValidInput"}>
                        <span onClick={changeVisibilityLogic} style={{ cursor: "pointer" }}>
                            {
                                contextUser.passLoginInputType !== "text"
                                    ?
                                    <IconsComp iconName={"VisibilityOff"}></IconsComp>
                                    :
                                    <IconsComp iconName={"Visibility"}></IconsComp>
                            }
                        </span>
                        <input onChange={changePassLogic} ref={passwordRef} type={contextUser.passLoginInputType} placeholder='لطفا رمز عبور خود را وارد کنید' required />
                    </div>
                    {
                        contextUser.isLoginPassValid === null || contextUser.isLoginPassValid
                            ?
                            ""
                            :
                            <span className='Login__Form__Input-Container__Show-Valid-Structure'>
                                رمز عبور باید بیشتر از  8 حرف باشد و شامل اعداد و حروف (#,%,*,&,....) باشد
                            </span>
                    }
                </div>

                {
                    (contextUser.isLoginPassValid === null || contextUser.isLoginPassValid)
                        &&
                        (contextUser.isLoginNameValid === null || contextUser.isLoginNameValid)
                        &&
                        (contextUser.isLoginFamilyValid === null || contextUser.isLoginFamilyValid)
                        ?
                        <button onClick={userLoginHandler}>ورود</button>
                        :
                        <button style={{ backgroundColor: "var(--modal-background)", cursor: "auto" }} onClick={userLoginHandler}>ورود</button>
                }



                <div className='Login__Form__Signup-Container'>
                    <Link to={"/Signup"}>هنوز اکانت نساختی ؟ ثبت نام کن همین حالا</Link>
                    <span onClick={() => { navigate("/ForgotPass") }}>فراموشی رمز عبور</span>
                </div>

            </div>

        </div>
    )
}