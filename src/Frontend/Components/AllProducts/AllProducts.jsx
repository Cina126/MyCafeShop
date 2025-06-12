/* eslint-disable no-unused-vars */

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './AllProducts.css'
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import context from './../../Context/Context'
import swal from 'sweetalert'

export default function AllProducts({ id, image, name, price, offPrice, offPrecent, hasOff, stars, IsAvailable, isLoaded }) {

    const navigate = useNavigate()
    const contextUser = useContext(context)

    // function finder(event) {
    //     let allProducts = contextUser.allProducts
    //     let findedProduct = allProducts.find((product) => {
    //         return +product.id === +event.target.parentElement.parentElement.id
    //     })
    //     findedProduct.isInCart = true
    //     contextUser.setAllProducts([...allProducts]);
    //     swal({
    //         title: "محصول با موفقیت به سبد خرید اضافه شد",
    //         icon: "success",
    //         buttons: "متوجه شدم"
    //     })
    // }


    return (
        <section className='AllProducts' id={id}>
            {hasOff ? <span className='AllProducts__offPrecent'>{offPrecent + "%"}</span> : ""}
            <img className='AllProducts__img' src={image} alt="" />
            <span className='AllProducts__name_and_disc'>{name}</span>

            {IsAvailable ?
                <div className='AllProducts__price_section'>
                    {hasOff ? <span className='AllProducts__price hasOff'>{Number(price).toLocaleString() + " تومان"}</span> : <span className='newestProducts__price'>{Number(price).toLocaleString() + " تومان"}</span>}
                    {hasOff ? <span className='AllProducts__offPrice'>{Number(offPrice).toLocaleString() + " تومان"}</span> : ""}
                </div> : ""
            }

            {IsAvailable ?
                <div className='AllProducts__Details'>
                    <button onClick={() => {
                        navigate(`/ProductsDetails/${id}`)
                    }}>جزییات </button>
                    <button>
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
}
