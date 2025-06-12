import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './Login.css';
import HeaderPc from '../../Components/HeaderPc/HeaderPc';
import HeaderPhone from '../../Components/HeaderPhone/HeaderPhone';
import Footer from '../../Components/Footer/Footer';
import swal from 'sweetalert'

export default function Login() {

    const navigate = useNavigate()

    const firtNameRef = useRef()
    const LastNameRef = useRef()
    const passwordRef = useRef()

    async function userLoginHandler(event) {
        event.preventDefault()
        try {
            const datas = { firstName: firtNameRef.current.value, lastName: LastNameRef.current.value, password: passwordRef.current.value }
            const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/getUserInformsLogin`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
            if (Fetch.ok) {
                const Json = await Fetch.json()
                localStorage.setItem("Caffe-User-Token", Json[0].token);
                swal({
                    title: "با موفقیت وارد شدید",
                    buttons: "رفتن به صفحه اصلی",
                    icon: "success"
                })
                    .then(res => navigate("/"))
            } else {
                console.log(Fetch);
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
        <div className='Login'>

            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>

            <div className='Login__Form'>
                <form>
                    <input ref={firtNameRef} type="text" placeholder='لطفا نام خود را وارد کنید' required />
                    <input ref={LastNameRef} type="text" placeholder='لطفا نام خانوادگی خود را وارد کنید' required />
                    <input ref={passwordRef} type="password" placeholder='لطفا رمز عبور خود را وارد کنید' required />
                    <button onClick={userLoginHandler}>ورود</button>
                    <div className='Login__Form__container'>
                        <Link to={"/Signup"}>هنوز اکانت نساختی ؟ ثبت نام کن همین حالا</Link>
                        <span onClick={() => { navigate("/ForgotPass") }}>فراموشی رمز عبور</span>
                    </div>
                </form>
            </div>

            <Footer></Footer>
        </div>
    )
}