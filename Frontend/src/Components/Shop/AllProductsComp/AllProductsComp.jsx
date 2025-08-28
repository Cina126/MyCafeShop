/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect } from 'react'
import './AllProductsComp.css';

import { useNavigate } from 'react-router-dom'
import { context } from '../../../Context/Context';
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';

export default function AllProductsComp({ id, image, name, price, offPrecent, stars, productCount, campainOfferPrecent }) {

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
                prevLocal.push({ id, name, image, price, stars, productsCount: 1 });
                localStorage.setItem("UserCart", JSON.stringify(prevLocal));
                contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
            }
        } else {
            localStorage.setItem("UserCart", JSON.stringify([{ id, name, image, price, stars, productsCount: 1 }]));
            contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
        }
        toast.success("با موقیت به سبد خرید اضافه شد")
    }
    return (
        <section className='AllProductsComp' id={id}>

            {
                campainOfferPrecent
                    ?
                    <span className='AllProductsComp__offPrecent'>{campainOfferPrecent + "%"}</span>
                    :
                    offPrecent
                        ?
                        <span className='AllProductsComp__offPrecent'>{offPrecent + "%"}</span>
                        :
                        ""
            }

            <img className='AllProductsComp__img' src={image} alt="" />
            <span className='AllProductsComp__name-and-disc'>{name}</span>

            <div className='AllProductsComp__price-section'>
                {
                    campainOfferPrecent
                        ?
                        <>
                            <span className='AllProductsComp__price hasOff'>{Number(price).toLocaleString() + " تومان"}</span>
                            <span className='AllProductsComp__offPrice'>{Number(price - price * campainOfferPrecent / 100).toLocaleString() + " تومان"}</span>
                        </>
                        :
                        offPrecent
                            ?
                            <>
                                <span className='AllProductsComp__price hasOff'>{Number(price).toLocaleString() + " تومان"}</span>
                                <span className='AllProductsComp__offPrice'>{Number(price - price * offPrecent / 100).toLocaleString() + " تومان"}</span>
                            </>
                            :
                            <>
                                <span className='AllProductsComp__price'>{Number(price).toLocaleString() + " تومان"}</span>
                            </>
                }
            </div>

            {productCount > 0 ?
                <div className='AllProductsComp__Details'>
                    <button className='AllProductsComp__Details__Details' onClick={() => {
                        navigate(`/ProductsDetails/${id}`)
                    }}>جزییات </button>
                    <button className='AllProductsComp__Details__Cart' onClick={addToCartHandle}>
                        <AddShoppingCartTwoToneIcon></AddShoppingCartTwoToneIcon>
                        سبد خرید
                    </button>
                    <div className='AllProductsComp__Details__Stras'>
                        <StarIcon></StarIcon>
                        <span>{stars}</span>
                    </div>
                </div> : <span className='Not-Found'>در انبار موجود نیست</span>
            }

        </section>
    )

}
