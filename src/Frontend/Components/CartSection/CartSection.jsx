/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

import { useState, useContext } from 'react'
import './CartSection.css';
import context  from './../../Context/Context'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function CartSection({ id, image, name, price, offPrice, hasOff, productsCount }) {

    const [inputValue, setInputValue] = useState(productsCount);
    const contextUser = useContext(context)

    function changeValueInputLogic(event) {
        const userCartProducts = JSON.parse(localStorage.getItem("UserCart"));
        let findFromLocalStorage = userCartProducts.find(informs => informs.id == event.currentTarget.parentElement.parentElement.parentElement.parentElement.id)
        findFromLocalStorage.productsCount = event.target.value;
        localStorage.setItem("UserCart", JSON.stringify(userCartProducts));
        setInputValue(event.target.value);
        contextUser.setGetFromLocalStorage(userCartProducts);
    }

    function deleteProductshandle(event) {
        const userCartProducts = JSON.parse(localStorage.getItem("UserCart"));
        let deleteFromLocalStorage = userCartProducts.filter(informs => informs.id != event.currentTarget.parentElement.parentElement.parentElement.parentElement.id)
        localStorage.setItem("UserCart", JSON.stringify(deleteFromLocalStorage));
        contextUser.setGetFromLocalStorage(deleteFromLocalStorage);
        contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
    }

    return (
        <section className='CartSection' id={id}>
            <div className='CartSection__Right_Side'>
                <img src={image} alt="" />
                <div className='CartSection__Right_Side__Inner_Part'>
                    <span className='CartSection__Right_Side__Inner_Part__Name'>{name}</span>
                    <div className='CartSection__Right_Side__Inner_Part__Inner_Part'>
                        <input onChange={changeValueInputLogic} type="number" value={inputValue} min={1} />
                        <button onClick={deleteProductshandle}>
                            حذف
                            <DeleteForeverIcon></DeleteForeverIcon>
                        </button>
                    </div>
                </div>
            </div>
            <div className='CartSection__Left_Side'>
                {hasOff ? <span className='CartSection__Left_Side__Off_Price'>{Number(offPrice).toLocaleString()} تومان</span> : ""}
                {hasOff ? <span className='CartSection__Left_Side__Red_Price'>{Number(price).toLocaleString()} تومان</span> : <span className='CartSection__Left_Side__Simp_Price'>{Number(price).toLocaleString()} تومان</span>}

            </div>
        </section>
    )
}