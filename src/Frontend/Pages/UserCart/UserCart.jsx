import { useEffect, useState, createContext } from 'react'
import './UserCart.css'

// start import components
import HeaderPc from './../../Components/HeaderPc/HeaderPc'
import HeaderPhone from './../../Components/HeaderPhone/HeaderPhone'
import Footer from './../../Components/Footer/Footer'
import CartSection from './../../Components/CartSection/CartSection'
// end import components ;

export const context = createContext();

export default function UserCart() {

    const [getFromLocalStorage, setGetLocalStorage] = useState();
    const [finalPrice, setFinalPrice] = useState();

    useEffect(() => {
        setGetLocalStorage(JSON.parse(localStorage.getItem("UserCart")));
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
        setFinalPrice(sum)
    }, [getFromLocalStorage])

    if (localStorage?.length) {
        return (
            <context.Provider value={{ getFromLocalStorage, setGetLocalStorage }}>
                <section className='UserCart'>

                    <HeaderPc></HeaderPc>
                    <HeaderPhone></HeaderPhone>

                    <div className='UserCart__Cart_Container'>
                        {getFromLocalStorage?.map((products) => {
                            return <CartSection key={products.id} {...products}></CartSection>
                        })}
                    </div>

                    <div className='UserCart__Final_Price'>
                        <h1>قیمت نهایی : <span>{Number(finalPrice)?.toLocaleString()}</span> تومان</h1>
                        <button>پرداخت</button>
                    </div>

                    <div className='UserCart__Space'></div>

                    <Footer></Footer>

                </section>
            </context.Provider>
        );
    } else {
        return (
            <context.Provider value={{ getFromLocalStorage, setGetLocalStorage }}>
                <section className='UserCart'>

                    <HeaderPc></HeaderPc>
                    <HeaderPhone></HeaderPhone>
                    <div className='UserCart__Text-Container'>
                        <span>سبد شما خالیست !</span>
                    </div>
                    <Footer></Footer>

                </section>
            </context.Provider>

        );
    }

}


