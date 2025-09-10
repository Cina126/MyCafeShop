/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext, useRef } from 'react'
import './UserCart.css'

// start import components
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc'
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import Footer from '../../../Components/Shop/Footer/Footer'
import CartSection from '../../../Components/Shop/CartSection/CartSection'
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue'
import Notice from '../../../Components/Shop/Notice/Notice';
import CampainComp from '../../../Components/Shop/CampainComp/CampainComp';
// end import components ;

// strat add depends 
import { useNavigate } from 'react-router-dom';
import { context } from '../../../Context/Context';
import swal from 'sweetalert';

// end add depends 

export default function UserCart() {

    const contextUSer = useContext(context)
    const offCodeRef = useRef()
    const navigate = useNavigate()
    const contextUser = useContext(context)

    useEffect(() => {
        contextUser.setIsOpenHiddenMeues(false);
        contextUSer.setGetAllProductsFromLocalStorage(JSON.parse(localStorage.getItem("UserCart")));
        contextUSer.setUserInformsFlag(prev => !prev);
        contextUSer.setOffCode("")
    }, []);

    useEffect(() => {
        const userCartProducts = JSON.parse(localStorage.getItem("UserCart"));
        let sum = 0;
        userCartProducts?.forEach((informs) => {
            if (informs.MainPageProducts__hasOff) {
                sum += (informs.offPrice * informs.productsCount)
            } else {
                sum += (informs.price * informs.productsCount)
            }
        });
        contextUSer.setFinalPrice(sum)
    }, [contextUSer.getAllProductsFromLocalStorage]);

    async function studyOffCode() {
        if (contextUSer.userInforms?.length) {
            if (offCodeRef.current.value) {
                try {
                    const studyOffCode = await fetch("http://localhost:7000/cafeAPI/offCodes/studyOffCode", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code: offCodeRef.current.value })
                    });
                    if (studyOffCode.ok) {
                        const studyOffCodeResult = await studyOffCode.json();
                        if (studyOffCodeResult?.length) {
                            const studyOffCodeUsage = await fetch("http://localhost:7000/cafeAPI/offCodes/studyOffCodeUserUsage", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ codeID: studyOffCodeResult[0].id, userID: contextUSer.userInforms[0].id })
                            });
                            if (studyOffCodeUsage.ok) {
                                const studyOffCodeUsageResult = await studyOffCodeUsage.json();
                                if (studyOffCodeUsageResult?.length) {
                                    swal({
                                        title: `کد قبلا استفاده شده است`,
                                        buttons: "تلاش دوباره",
                                        icon: "error"
                                    })
                                } else {
                                    const postOffCodeUsage = await fetch("http://localhost:7000/cafeAPI/offCodes/offCodeUserUsage", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ offCodeID: studyOffCodeResult[0].id, userID: contextUSer.userInforms[0].id })
                                    });
                                    const postMaxUse = await fetch("http://localhost:7000/cafeAPI/offCodes/offCodeAmount", {
                                        method: "PUT",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ timeUsedUpdate: +studyOffCodeResult[0].timeUsed + 1, codeID: studyOffCodeResult[0].id })
                                    });
                                    if (postOffCodeUsage.ok && postMaxUse.ok) {
                                        swal({
                                            title: `کد با موفقیت استفاده شد`,
                                            buttons: "اوکی",
                                            icon: "success"
                                        }).then(res => {
                                            contextUSer.setOffCode(studyOffCodeResult[0].precent);
                                        })
                                    }
                                }
                            }
                        }
                    }
                } catch (error) {
                    swal({
                        title: `خطا در برقراری ارتباط یا تاریخ کد تخفیف`,
                        buttons: "تلاش دوباره",
                        icon: "error"
                    })
                }
            } else {
                swal({
                    title: `لطفا مقدار کد تخفیف درست وارد کنید !`,
                    buttons: "تلاش دوباره",
                    icon: "warning"
                })
            }
        } else {
            swal({
                title: `لطفا ابتدا وارد شوید`,
                buttons: ["انصراف", "برو به صفحه لاگین"],
                icon: "warning"
            }).then(res => {
                if (res) {
                    navigate("/Login")
                }
            })
        }

    }

    if (JSON.parse(localStorage?.getItem("UserCart"))?.length) {

        return (
            <section className='UserCart'>

                {/* strat  add notice comp */}
                {
                    contextUser.panelNotices
                        ?
                        contextUser.panelNotices.map(notice => <Notice isLoaded={true} key={notice.id} {...notice}></Notice>)
                        :
                        ""
                }
                {/* end  add notice comp */}


                {/* start campains comp  */}
                {
                    contextUser.panelCampains
                        ?
                        contextUser.panelCampains.map(campain => <CampainComp key={campain.id} {...campain}></CampainComp>)
                        :
                        ""
                }
                {/* end campains comp  */}

                {/* strat add headers comp  */}
                <HeaderPc></HeaderPc>
                <HeaderPhone></HeaderPhone>
                {/* end add headers comp  */}


                {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

                <div className='UserCart__Cart-Container'>
                    {contextUSer.getAllProductsFromLocalStorage?.map((products) => {
                        return <CartSection key={products.id} {...products}></CartSection>
                    })}
                </div>

                <div className='UserCart__Off-Code'>
                    <input ref={offCodeRef} type="text" placeholder='کد تخفیف را وارد کنید' />
                    <button onClick={studyOffCode}>اعمال کردن</button>
                </div>

                {contextUSer.offCode ?
                    <div className='UserCart__Final-Price'>
                        <h1>قیمت بدون تخفیف : <span>{Number(contextUSer.finalPrice)?.toLocaleString()}</span> تومان</h1>
                        <h1> مقدار تخفیف : <span>{contextUSer.offCode}%</span></h1>
                        <h1>قیمت نهایی : <span>{Number(contextUSer.finalPrice - (contextUSer.offCode * contextUSer.finalPrice / 100)).toLocaleString()}</span> تومان</h1>
                        <button>پرداخت</button>
                    </div>
                    :
                    <div className='UserCart__Final-Price'>
                        <h1>قیمت نهایی : <span>{Number(contextUSer.finalPrice)?.toLocaleString()}</span> تومان</h1>
                        <button>پرداخت</button>
                    </div>}


                <div className='UserCart__Space'></div>

                {/* start footer usage */}
                <Footer></Footer>
                {/* end footer usage */}

            </section>
        )
    } else {
        return (
            <section className='UserCart'>

                {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

                <HeaderPc></HeaderPc>
                <HeaderPhone></HeaderPhone>
                <div className='UserCart__Empty-Cart'>
                    <span>سبد شما خالیست !</span>
                </div>
                <Footer></Footer>

            </section>
        )
    }

}


