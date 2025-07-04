/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

import { useContext } from 'react';
import './MainPageProducts.css';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import { context } from '../../../Context/Context'

export default function MainPageProducts({ id, image, name, price, offPrice, offPrecent, stars, productCount, isLoaded, children }) {

    const navigate = useNavigate();
    const contextUser = useContext(context)

    function addToCartHandle() {
        const prevLocal = JSON.parse(localStorage.getItem('UserCart'));

        if (prevLocal?.length) {

            let isAlreadyExistProductInLocal = prevLocal.find(inf => inf.id == id);

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
            <section className='MainPageProducts' id={id}>

                {offPrecent ? <span className='MainPageProducts__offPrecent'>{offPrecent + "%"}</span> : ""}
                <img className='MainPageProducts__img' src={image} alt="" />
                <span className='MainPageProducts__name-and-disc'>{name}</span>

                <div className='MainPageProducts__price-section'>
                    {offPrecent ? <span className='MainPageProducts__price hasOff'>{Number(price).toLocaleString() + " تومان"}</span> : <span className='newestProducts__price'>{Number(price).toLocaleString() + " تومان"}</span>}
                    {offPrecent ? <span className='MainPageProducts__offPrice'>{Number(offPrice).toLocaleString() + " تومان"}</span> : ""}
                </div>

                {productCount > 0 ?
                    <div className='MainPageProducts__Details'>

                        <button>
                            <AddShoppingCartTwoToneIcon></AddShoppingCartTwoToneIcon>
                            <span className='Add-To-Cart-Text' onClick={addToCartHandle}>سبد خرید</span>
                        </button>

                        <button onClick={() => { navigate(`/ProductsDetails/${id}`) }}>جزییات </button>

                        <div className='MainPageProducts__Details__Stras'>
                            <StarIcon></StarIcon>
                            <span>{stars}</span>
                        </div>

                    </div> : <span className='MainPageProducts__Details__Not-Value'>در انبار موجود نیست</span>
                }

                {children}

            </section>
        )
    } else {
        return (
            <section className='MainPageProducts loading' id={id}>
                <span className="loader"></span>
            </section>
        )
    }


}
