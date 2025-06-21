/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from 'react'
import './UserCart.css'

// start import components
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc'
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import Footer from '../../../Components/Shop/Footer/Footer'
import CartSection from '../../../Components/Shop/CartSection/CartSection'
import context from '../../../Context/Context'
// end import components ;

export default function UserCart() {

    const contextUSer = useContext(context)

    useEffect(() => {
        contextUSer.setGetAllProductsFromLocalStorage(JSON.parse(localStorage.getItem("UserCart")));
        contextUSer.setUserInformsFlag(prev => !prev);
    }, []);

    useEffect(() => {
        const userCartProducts = JSON.parse(localStorage.getItem("UserCart"));
        let sum = 0;
        userCartProducts?.forEach((informs) => {
            if (informs.hasOff) {
                sum += (informs.offPrice * informs.productsCount)
            } else {
                sum += (informs.price * informs.productsCount)
            }
        });
        contextUSer.setFinalPrice(sum)
    }, [contextUSer.getAllProductsFromLocalStorage])

    if (JSON.parse(JSON.parse(localStorage?.getItem("UserCart")).length)) {

        return (
            <section className='UserCart'>

                <HeaderPc></HeaderPc>
                <HeaderPhone></HeaderPhone>

                <div className='UserCart__Cart_Container'>
                    {contextUSer.getAllProductsFromLocalStorage?.map((products) => {
                        return <CartSection key={products.id} {...products}></CartSection>
                    })}
                </div>

                <div className='UserCart__Final_Price'>
                    <h1>قیمت نهایی : <span>{Number(contextUSer.finalPrice)?.toLocaleString()}</span> تومان</h1>
                    <button>پرداخت</button>
                </div>

                <div className='UserCart__Space'></div>

                <Footer></Footer>

            </section>
        )
    } else {
        return (
            <section className='UserCart'>

                <HeaderPc></HeaderPc>
                <HeaderPhone></HeaderPhone>
                <div className='UserCart__Text-Container'>
                    <span>سبد شما خالیست !</span>
                </div>
                <Footer></Footer>

            </section>
        )
    }

}


