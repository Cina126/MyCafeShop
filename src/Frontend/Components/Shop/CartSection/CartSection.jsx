/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

import { useState, useContext, useRef } from 'react'
import './CartSection.css';
import { context } from '../../../Context/Context'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import swal from 'sweetalert'

export default function CartSection({ id, image, name, price, offPrice, hasOff, productsCount }) {

    const contextUser = useContext(context);
    const deleteProductUserCartBtn = useRef()

    function changeValueInputLogic(event) {
        const userCartProducts = JSON.parse(localStorage.getItem("UserCart"));
        let findFromLocalStorage = userCartProducts.find(informs => informs.id == event.currentTarget.parentElement.parentElement.parentElement.parentElement.id)
        findFromLocalStorage.productsCount = event.target.value;
        localStorage.setItem("UserCart", JSON.stringify(userCartProducts));
        contextUser.setGetAllProductsFromLocalStorage(userCartProducts);
    }

    function deleteProductshandle(event) {
        swal({
            title: "از حذف محصول از سبد خرید اطمینان دارید ؟",
            buttons: ["انصراف", "حذف"],
            icon: "warning"
        }).then(res => {
            if (res) {
                const userCartProducts = JSON.parse(localStorage.getItem("UserCart"));
                let deleteFromLocalStorage = userCartProducts.filter(informs => informs.id != deleteProductUserCartBtn.current.parentElement.parentElement.parentElement.parentElement.id)
                localStorage.setItem("UserCart", JSON.stringify(deleteFromLocalStorage));
                contextUser.setGetAllProductsFromLocalStorage(deleteFromLocalStorage);
                contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length);
            }
        })
    }

    return (
        <section className='CartSection' id={id}>
            <div className='CartSection__Right-Side'>
                <img src={image} alt="" />
                {console.log(image)}
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
                {hasOff ? <span className='CartSection__Left-Side__Off-Price'>{Number(offPrice).toLocaleString()} تومان</span> : ""}
                {hasOff ? <span className='CartSection__Left-Side__Red-Price'>{Number(price).toLocaleString()} تومان</span> : <span className='CartSection__Left-Side__Simp-Price'>{Number(price).toLocaleString()} تومان</span>}

            </div>
        </section>
    )
}