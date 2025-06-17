/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import "./HeaderPc.css";
import Context from '../../Context/Context'
import Menues from './../Menues/Menues'
import useGetFetch from '../../Functions/useGetFetch';

import CoffeeIcon from './../../../Images/Ghahve/Other/coffee-beans.png';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import context from '../../Context/Context';
import { Spa } from '@mui/icons-material';

export default function HeaderPc() {

  const contextUser = useContext(context);

  const navigate = useNavigate();


  return (
    <section className='HeaderPc'>

      <div className='HeaderPc__Right_Side_Section'>
        <img src={CoffeeIcon} alt="" />
        {contextUser.menues?.length ? contextUser.menues?.map((informs) => { return <Menues key={informs.id} {...informs}></Menues> }) : ""}
      </div>

      <div className='HeaderPc__Left_Side_Section'>

        <span className='HeaderPc__Left_Side_Section__Cart' onClick={() => { navigate("/MyCart") }}>
          {contextUser.userProductsCount ? <span className=''>{contextUser.userProductsCount}</span> : ""}
          <ShoppingCartIcon></ShoppingCartIcon>
        </span>

        <span onClick={() => { }}><Brightness3Icon></Brightness3Icon></span>
        
        {(contextUser.userInforms?.[0]?.id) ? <span onClick={() => { navigate("/Login") }}>{contextUser.userInforms[0].firstName} {contextUser.userInforms[0].lastName}</span> : <span onClick={() => { navigate("/Login") }}>ثبتنام | ورود <LoginIcon></LoginIcon></span>}
      </div>

    </section>

  )
}
