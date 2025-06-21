/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./HeaderPc.css";

// start add componenets 
import MenuesLinks from '../MenuesLinks/MenuesLinks'
import HeaderLinksLoading from '../../ShopLoading/HeaderLinksLoading/HeaderLinksLoading'
// end add componenets 

// start add depends 
import CoffeeIcon from './../../../../StaticImages/Other/coffee-beans.png';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { context } from '../../../Context/Context';
import swal from 'sweetalert'
import toast from 'react-hot-toast';
// end add depends 

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
        toast.success("از حساب خود خارج شدید")
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
        {
          contextUser.menues
            ?
            contextUser.menues.map(informs => <MenuesLinks key={informs.id} {...informs}></MenuesLinks>)
            :
            [1, 2, 3, 4, 5].map(informs => <HeaderLinksLoading key={informs}></HeaderLinksLoading>)
        }
      </div>

      <div className='HeaderPc__Left-Side-Section'>

        {
          contextUser?.userInforms?.[0]?.role === "ادمین"
            ?
            <button onClick={() => { navigate("/PanelProducts") }} className='HeaderPc__Left-Side-Section__Cart__Admin'>پنل کاربری</button>
            :
            ""
        }

        {contextUser.userInforms?.length ? <button onClick={logoutLogic} className='HeaderPc__Left-Side-Section__Cart__Logout'>خروج از حساب کاربری</button> : ""}

        <span className='HeaderPc__Left-Side-Section__Cart' onClick={() => { navigate("/MyCart") }}>
          {contextUser.userProductsCount ? <span className='HeaderPc__Left-Side-Section__Cart__Product-Count'>{contextUser.userProductsCount}</span> : ""}
          <ShoppingCartIcon></ShoppingCartIcon>
        </span>

        <span onClick={changeThemeLogic}><Brightness3Icon></Brightness3Icon></span>

        {(contextUser.userInforms?.[0]?.id) ? <span onClick={() => { navigate("/Login") }}>{contextUser.userInforms[0].firstName} {contextUser.userInforms[0].lastName}</span> : <span onClick={() => { navigate("/Login") }}>ثبتنام | ورود <LoginIcon></LoginIcon></span>}

      </div>

    </section>

  )
}