/* eslint-disable no-unused-vars */

import { useContext } from 'react'
import './AllProductsComp.css';

import { useNavigate } from 'react-router-dom'
import { context } from '../../../Context/Context';
import StarIcon from '@mui/icons-material/Star';
import swal from 'sweetalert'
import AddShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCart';

export default function AllProductsComp({ id, image, name, price, offPrice, offPrecent, hasOffer, stars, productCount, isLoaded }) {

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
            <section className='AllProductsComp' id={id}>
                {hasOffer === "1" ? <span className='AllProductsComp__offPrecent'>{offPrecent + "%"}</span> : ""}
                <img className='AllProductsComp__img' src={image} alt="" />
                <span className='AllProductsComp__name-and-disc'>{name}</span>

                <div className='AllProductsComp__price-section'>
                    {hasOffer === "1" ? <span className='AllProductsComp__price hasOff'>{Number(price).toLocaleString() + " تومان"}</span> : <span className='newestProducts__price'>{Number(price).toLocaleString() + " تومان"}</span>}
                    {hasOffer === "1" ? <span className='AllProductsComp__offPrice'>{Number(offPrice).toLocaleString() + " تومان"}</span> : ""}
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
    } else {
        return (
            <section className='AllProductsComp' id={id}>

                <div className='AllProductsComp__img skeleton'></div>
                <div style={{ height: 20 }} className='AllProductsComp__name-and-disc skeleton'></div>

                <div className='AllProductsComp__price-section'>
                    <div style={{ width: 75, height: 20 }} className='AllProductsComp__price skeleton'></div>
                    <div style={{ width: 75, height: 20 }} className='AllProductsComp__offPrice skeleton'></div>
                </div>


                <div className='AllProductsComp__Details'>
                    <div style={{ border: "none" }} className='AllProductsComp__Details__Details skeleton'></div>
                    <div style={{ border: "none" }} className='AllProductsComp__Details__Cart skeleton'></div>
                    <div style={{ border: "none" }} className='AllProductsComp__Details__Stras skeleton'></div>
                </div>

            </section>
        )
    }

}
