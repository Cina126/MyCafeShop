/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import "./HeaderPc.css";
import Context from '../../Context/Context'
import Menues from './../Menues/Menues'
import useGetFetch from '../../Functions/useGetFetch';
import useGetUserInforms from '../../Functions/useGetUserInforms';

import CoffeeIcon from './../../../Images/Ghahve/Other/coffee-beans.png';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightIcon from '@mui/icons-material/WbSunny';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const headerContext = createContext()

export default function HeaderPc({ userInforms }) {

  const [menues] = useGetFetch("/menues");

  const navigate = useNavigate();


    return (
      <section className='HeaderPc'>

        <div className='HeaderPc__Right_Side_Section'>
          <img src={CoffeeIcon} alt="" />
          {menues?.length ? menues.map((informs) => { return <Menues key={informs.id} {...informs}></Menues> }) : ""}
        </div>

        <div className='HeaderPc__Left_Side_Section'>
          <span onClick={() => { navigate("/MyCart") }}><ShoppingCartIcon></ShoppingCartIcon></span>
          <span onClick={() => { }}><Brightness3Icon></Brightness3Icon></span>
          <span onClick={() => { }}><FavoriteIcon></FavoriteIcon></span>
          {(userInforms?.[0]?.id) ? <span onClick={() => { navigate("/Login") }}>{userInforms[0].firstName} {userInforms[0].lastName}</span> : <span onClick={() => { navigate("/Login") }}>ثبتنام | ورود <LoginIcon></LoginIcon></span>}
        </div>

      </section>

    )
}
