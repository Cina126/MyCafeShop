/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

import { useContext } from 'react';
import './MainPageProducts.css';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import context from '../../../Context/Context'

export default function NewProducts({ id, image, name, price, offPrice, offPrecent, stars, productCount, isLoaded, children }) {

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
            <section className='NewProducts' id={id}>
                {offPrecent ? <span className='NewProducts__offPrecent'>{offPrecent + "%"}</span> : ""}
                <img className='NewProducts__img' src={image} alt="" />
                <span className='NewProducts__name_and_disc'>{name}</span>

                {productCount > 0 ?
                    <div className='NewProducts__price_section'>
                        {offPrecent ? <span className='NewProducts__price hasOff'>{Number(price).toLocaleString() + " تومان"}</span> : <span className='newestProducts__price'>{Number(price).toLocaleString() + " تومان"}</span>}
                        {offPrecent ? <span className='NewProducts__offPrice'>{Number(offPrice).toLocaleString() + " تومان"}</span> : ""}
                    </div> : ""
                }

                {productCount > 0 ?
                    <div className='NewProducts__Details'>

                        <button>
                            <AddShoppingCartTwoToneIcon></AddShoppingCartTwoToneIcon>
                            <span className='Add_To_Cart_Text' onClick={addToCartHandle}>سبد خرید</span>
                        </button>

                        <button onClick={() => { navigate(`/ProductsDetails/${id}`) }}>جزییات </button>

                        <div className='NewProducts__Details__Stras'>
                            <StarIcon></StarIcon>
                            <span>{stars}</span>
                        </div>

                    </div> : "در انبار موجود نیست"
                }

                {children}

            </section>
        )
    } else {
        return (
            <section className='NewProducts loading' id={id}>
                <span className="loader"></span>
            </section>
        )
    }


}
