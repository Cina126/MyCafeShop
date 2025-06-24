/* eslint-disable no-unused-vars */

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './AllProducts.css'
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import context from '../../../Context/Context';
import swal from 'sweetalert'

export default function AllProducts({ id, image, name, price, offPrice, offPrecent, hasOffer, stars, productCount, isLoaded }) {

    const navigate = useNavigate()
    const contextUser = useContext(context)

    function addToCartHandle() {
        const prevLocal = JSON.parse(localStorage.getItem('UserCart'));

        if (prevLocal?.length) {

            let isAlreadyExistProductInLocal = prevLocal.find(inf => +inf.id === +id);

            if (isAlreadyExistProductInLocal?.id) {
                isAlreadyExistProductInLocal.productsCount = +isAlreadyExistProductInLocal.productsCount + 1
                localStorage.setItem("UserCart", JSON.stringify(prevLocal));
                contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
            }
            else {
                prevLocal.push({ id, name, image, price, offPrice, stars, productsCount: 1 });
                localStorage.setItem("UserCart", JSON.stringify(prevLocal));
                contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
            }
            swal({
                title: `با موقیت به سبد خرید اضافه شد`,
                buttons: "باشه",
                icon: "success"
            });
        } else {
            localStorage.setItem("UserCart", JSON.stringify([{ id, name, image, price, offPrice, stars, productsCount: 1 }]));
            contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
            swal({
                title: `با موقیت به سبد خرید اضافه شد`,
                buttons: "باشه",
                icon: "success"
            })
        }
    }
    if (isLoaded) {
        return (
            <section className='AllProducts' id={id}>
                {hasOffer === "1" ? <span className='AllProducts__offPrecent'>{offPrecent + "%"}</span> : ""}
                <img className='AllProducts__img' src={image} alt="" />
                <span className='AllProducts__name_and_disc'>{name}</span>

                <div className='AllProducts__price_section'>
                    {hasOffer === "1" ? <span className='AllProducts__price hasOff'>{Number(price).toLocaleString() + " تومان"}</span> : <span className='newestProducts__price'>{Number(price).toLocaleString() + " تومان"}</span>}
                    {hasOffer === "1" ? <span className='AllProducts__offPrice'>{Number(offPrice).toLocaleString() + " تومان"}</span> : ""}
                </div>

                {productCount > 0 ?
                    <div className='AllProducts__Details'>
                        <button onClick={() => {
                            navigate(`/ProductsDetails/${id}`)
                        }}>جزییات </button>
                        <button onClick={addToCartHandle}>
                            <AddShoppingCartTwoToneIcon></AddShoppingCartTwoToneIcon>
                            اضافه کردن به سبد خرید
                        </button>
                        <div className='AllProducts__Details__Stras'>
                            <StarIcon></StarIcon>
                            <span>{stars}</span>
                        </div>
                    </div> : <span className='Not_Found'>در انبار موجود نیست</span>
                }

            </section>
        )
    } else {
        return (
            <section className='AllProducts loading' id={id}>
                <span className='loader'></span>
            </section>
        )
    }

}
