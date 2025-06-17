/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderPhone.css';
import Context from './../../Context/Context'

// start imports images
import CoffeImg from "./../../../Images/Ghahve/Other/coffee-beans.png";
// end imports images

// strat imports icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
// end imports icons

export default function HeaderPhone() {
    const contextUser = useContext(Context);

    useEffect(() => {
        let allProducts = contextUser?.allProducts;
        let filterProducts = allProducts?.filter((products) => {
            return products.isInCart === true
        });

        // contextUser?.setInCartProductsCount(filterProducts.length)

    }, [contextUser?.allProducts]);

    const navigate = useNavigate();

    function openMenueHandler() {
        // contextUser?.setIsOpenHiddenMenue((prev) => { return !prev })
    };

 

    return (
        <section className='HeaderPhone'>
            <span className='HeaderPhone__Hidden_Menue_Container' onClick={openMenueHandler}><MenuIcon></MenuIcon></span>
            <img src={CoffeImg} alt="" />
            <span className='HeaderPhone__Cart_Page' onClick={() => { navigate("./MyCart") }}>
                <ShoppingCartIcon></ShoppingCartIcon>
                {/* {contextUser?.inCartProductsCount > 0 ? <span className='HeaderPhone__Cart_Page__Products_Count'>{contextUser?.inCartProductsCount}</span> : ""} */}
            </span>
        </section>
    )
}
