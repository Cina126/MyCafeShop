/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./HeaderPc.css";
import Menues from './../Menues/Menues'

import CoffeeIcon from './../../../../StaticImages/Other/coffee-beans.png';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { context } from '../../../Context/Context';
import swal from 'sweetalert'

export default function HeaderPc() {

  const contextUser = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", contextUser.isThemeLight)
  }, [contextUser.isThemeLight])

  function logoutLogic() {
    swal({
      title: "آیا میخواهید خارج شوید ؟",
      icon: "warning",
      buttons: [
        "انصراف", "بله"
      ]
    }).then(res => {
      if (res) {
        localStorage.removeItem("Caffe-User-Token");
        contextUser.setUserInformsFlag(prev => !prev);
      }
    })
  }

  function changeThemeLogic() {
    if (contextUser.isThemeLight === "false") {
      contextUser.setIsThemeLight("true")
    } else {
      contextUser.setIsThemeLight("false")
    }

  }

  return (
    <section className='HeaderPc'>

      <div className='HeaderPc__Right-Side-Section'>
        <img src={CoffeeIcon} alt="" />
        {contextUser.menues ? contextUser.menues?.map((informs) => { return <Menues isLoaded={true} key={informs.id} {...informs}></Menues> }) :
          [1, 2, 3, 4, 5, 6].map((informs) => { return <Menues isLoaded={false} key={informs} {...informs}></Menues> })}
      </div>

      <div className='HeaderPc__Left-Side-Section'>

        {contextUser?.userInforms?.[0]?.role === "ادمین" ? <button onClick={() => { navigate("/PanelProducts") }} className='HeaderPc__Left-Side-Section__Cart__Admin'>پنل کاربری</button> : ""}

        {contextUser?.userInforms ? <button onClick={logoutLogic} className='HeaderPc__Left-Side-Section__Cart__Logout'>خروج از حساب کاربری</button> : ""}

        <span className='HeaderPc__Left-Side-Section__Cart' onClick={() => { navigate("/MyCart") }}>
          {contextUser.userProductsCount ? <span className=''>{contextUser.userProductsCount}</span> : ""}
          <ShoppingCartIcon></ShoppingCartIcon>
        </span>

        <span onClick={changeThemeLogic}><Brightness3Icon></Brightness3Icon></span>

        {(contextUser.userInforms?.[0]?.id) ? <span onClick={() => { navigate("/Login") }}>{contextUser.userInforms[0].firstName} {contextUser.userInforms[0].lastName}</span> : <span onClick={() => { navigate("/Login") }}>ثبتنام | ورود <LoginIcon></LoginIcon></span>}

      </div>

    </section>

  )
}