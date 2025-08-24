/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

import { useState, useContext, useRef } from 'react'
import './CartSection.css';
import { context } from '../../../Context/Context'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import swal from 'sweetalert'
import toast from 'react-hot-toast';

export default function CartSection({ id, image, name, price, offPrecent, campainOfferPrecent, productsCount }) {

    const contextUser = useContext(context);
    const deleteProductUserCartBtn = useRef()

    function changeValueInputLogic(event) {
        const userCartProducts = JSON.parse(localStorage.getItem("UserCart"));
        let findFromLocalStorage = userCartProducts.find(informs => informs.id == event.currentTarget.parentElement.parentElement.parentElement.parentElement.id)
        findFromLocalStorage.productsCount = event.target.value;
        localStorage.setItem("UserCart", JSON.stringify(userCartProducts));
        contextUser.setGetAllProductsFromLocalStorage(userCartProducts);
    }

    function deleteProductshandle() {
        swal({
            title: "از حذف محصول از سبد خرید اطمینان دارید ؟",
            buttons: {
                cancel: "انصراف",
                confirm: {
                    text: "حذف",
                    value: true,
                    visible: true,
                    className: "swal-red-btn"
                },
            },
            icon: "warning"
        }).then(res => {
            if (res) {
                const userCartProducts = JSON.parse(localStorage.getItem("UserCart"));
                let deleteFromLocalStorage = userCartProducts.filter(informs => informs.id != deleteProductUserCartBtn.current.parentElement.parentElement.parentElement.parentElement.id)
                localStorage.setItem("UserCart", JSON.stringify(deleteFromLocalStorage));
                contextUser.setGetAllProductsFromLocalStorage(deleteFromLocalStorage);
                contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length);
                toast.success("محصول از سبد شما حذف شد")
            }
        })
    }

    return (
        <section className='CartSection' id={id}>
            <div className='CartSection__Right-Side'>
                <img src={image} alt="" />
                <div className='CartSection__Right-Side__Inner-Part'>
                    <span className='CartSection__Right-Side__Inner-Part__Name'>{name}</span>
                    <div className='CartSection__Right-Side__Inner-Part__Inner-Part'>
                        <input onChange={changeValueInputLogic} type="number" value={productsCount} min={1} />
                        <button ref={deleteProductUserCartBtn} onClick={deleteProductshandle}>
                            حذف
                            <DeleteForeverIcon></DeleteForeverIcon>
                        </button>
                    </div>
                </div>
            </div>
            <div className='CartSection__Left-Side'>
                {offPrecent ? <span className='CartSection__Left-Side__Off-Price'>{Number(price - price * offPrecent / 100).toLocaleString()} تومان</span> : ""}
                {offPrecent ? <span className='CartSection__Left-Side__Red-Price'>{Number(price).toLocaleString()} تومان</span> : <span className='CartSection__Left-Side__Simp-Price'>{Number(price).toLocaleString()} تومان</span>}

            </div>
        </section>
    )
}