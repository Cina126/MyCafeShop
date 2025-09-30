/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

import { useContext } from 'react';
import './MainPageProducts.css';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCart';
import { context } from '../../../Context/Context'
import toast from 'react-hot-toast';

export default function MainPageProducts({ id, image, name, price, offPrecent, stars, productCount, campainOfferPrecent }) {

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
                prevLocal.push({ id, name, image, price, offPrecent, stars, productsCount: 1 });
                localStorage.setItem("UserCart", JSON.stringify(prevLocal));
                contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
            }
        } else {
            localStorage.setItem("UserCart", JSON.stringify([{ id, name, image, price, offPrecent, stars, productsCount: 1 }]));
            contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
        }

        toast.success("با موقیت به سبد خرید اضافه شد")

    }
    return (
        <section className='MainPageProducts' id={id}>

            {
                campainOfferPrecent
                    ?
                    <span className='MainPageProducts__offPrecent'>{campainOfferPrecent + "%"}</span>
                    :
                    offPrecent
                        ?
                        <span className='MainPageProducts__offPrecent'>{offPrecent + "%"}</span>
                        :
                        ""
            }

            {
                image !== "null"
                    ?
                    <img className='AllProductsComp__img' src={`http://localhost:7000${image}`} alt="" />
                    :
                    <img className='AllProductsComp__img' src={`Images/noImage.png`} alt="" />

            }
            <span className='MainPageProducts__name-and-disc'>{name}</span>


            <div className='MainPageProducts__price-section'>
                {
                    campainOfferPrecent
                        ?
                        <>
                            <span className='MainPageProducts__price MainPageProducts__hasOff'>{Number(price).toLocaleString() + " تومان"}</span>
                            <span className='MainPageProducts__offPrice'>{Number(price - price * campainOfferPrecent / 100).toLocaleString() + " تومان"}</span>
                        </>
                        :
                        offPrecent
                            ?
                            <>
                                <span className='MainPageProducts__price MainPageProducts__hasOff'>{Number(price).toLocaleString() + " تومان"}</span>
                                <span className='MainPageProducts__offPrice'>{Number(price - price * offPrecent / 100).toLocaleString() + " تومان"}</span>
                            </>
                            :
                            <>
                                <span className='MainPageProducts__price'>{Number(price).toLocaleString() + " تومان"}</span>
                            </>
                }
            </div>

            {
                productCount > 0 ?
                    <div className='MainPageProducts__Details'>

                        <button onClick={addToCartHandle}>
                            <AddShoppingCartTwoToneIcon></AddShoppingCartTwoToneIcon>
                            <span className='Add-To-Cart-Text'>سبد خرید</span>
                        </button>

                        <button onClick={() => { navigate(`/ProductsDetails/${id}`) }}>جزییات </button>

                        <div className='MainPageProducts__Details__Stras'>
                            <StarIcon></StarIcon>
                            <span>{stars}</span>
                        </div>

                    </div> : <span className='MainPageProducts__Details__Not-Value'>در انبار موجود نیست</span>
            }
        </section >
    )
}
