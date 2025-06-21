/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from 'react';
import './HeaderPhone.css';
import { useNavigate } from 'react-router-dom';
import { context } from '../../../Context/Context'

import CoffeImg from "./../../../../StaticImages/Other/coffee-beans.png";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';


export default function HeaderPhone() {

    const contextUser = useContext(context)
    const navigate = useNavigate();

    useEffect(() => {
        contextUser.setGetAllProductsFromLocalStorage(JSON.parse(localStorage.getItem("UserCart")))
    }, [])

    function openMenueHandler() {
        contextUser.setIsOpenHiddenMeues(true)
        contextUser.setIsOpenRightSideFilterMenue(false)
    };

    return (
        <section className='HeaderPhone'>
            <span className='HeaderPhone__Hidden-Menue-Container' onClick={openMenueHandler}><MenuIcon></MenuIcon></span>
            <img src={CoffeImg} alt="" />
            <span className='HeaderPhone__Cart-Page' onClick={() => { navigate("./MyCart") }}>
                <ShoppingCartIcon></ShoppingCartIcon>
                {contextUser?.getAllProductsFromLocalStorage?.length > 0 ? <span className='HeaderPhone__Cart-Page__Products-Count'>{contextUser?.getAllProductsFromLocalStorage?.length}</span> : ""}
            </span>
        </section>
    )
}
