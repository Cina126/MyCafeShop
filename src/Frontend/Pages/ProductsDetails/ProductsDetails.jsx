/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-self-assign */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ProductsDetails.css';
import Skeleton from 'react-loading-skeleton';
import swal from 'sweetalert'

// start import  components
import HeaderPc from './../../Components/HeaderPc/HeaderPc'
import HeaderPhone from './../../Components/HeaderPhone/HeaderPhone'
import Comments from './../../Components/Comments/Comments'
import Footer from './../../Components/Footer/Footer'
// end import  components

import alt from "./../../../Images/Ghahve/NewestProducts/8-600x600.png";
import { useContext, useRef, useState } from 'react';
import context from './../../Context/Context'

export default function ProductsDetails() {

    const params = useParams()
    const commentText = useRef()
    const contextUser = useContext(context);


    useEffect(() => {
        contextUser.setProductFlag(prev => !prev);
        contextUser.setProductCommentsFlag(prev => !prev);
    }, []);

    async function createNewComment(event) {
        event.preventDefault()
        const datas = {
            firstName: contextUser.userInforms[0].firstName,
            lastName: contextUser.userInforms[0].lastName,
            role: contextUser.userInforms[0].role,
            commentText: commentText.current.value,
            date: new Date().toLocaleDateString("fa-Ir"),
            isVerifyed: 1,
            userID: contextUser.userInforms[0].id,
            productID: params.productID,
        }
        try {
            const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/addNewComments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
            if (Fetch.ok) {
                swal({
                    title: `با موقیت کامنت شما ثبت شد`,
                    buttons: "باشه",
                    icon: "success"
                }).then(res => {
                    contextUser.setIsShowCommentsModal(false);
                    contextUser.setProductCommentsFlag((prev) => { return !prev });
                })
            } else {
                console.log(Fetch);
            }
        } catch (error) {
            swal({
                title: `خطا در دیافت اطلاعات کاربر `,
                buttons: "تلاش دوباره",
                icon: "error"
            });
        }

    }

    async function createNewSubComment(event) {
        event.preventDefault()
        const datas = {
            firstName: contextUser.userInforms[0].firstName,
            lastName: contextUser.userInforms[0].lastName,
            role: contextUser.userInforms[0].role,
            commentText: commentText.current.value,
            date: new Date().toLocaleDateString("fa-Ir"),
            isVerifyed: 1,
            userID: contextUser.userInforms[0].id,
            productID: params.productID,
            commentID: contextUser.isShowSubCommentsModal.commentID
        }
        try {
            const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/addNewSubComments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
            if (Fetch.ok) {
                swal({
                    title: `با موقیت کامنت شما ثبت شد`,
                    buttons: "باشه",
                    icon: "success"
                }).then(async () => {
                    const realTimeFetch = await fetch(`http://localhost:7000/cafeAPI/products/getProductComments/subComments/${contextUser.isShowSubCommentsModal.commentID}`);
                    if (realTimeFetch.ok) {
                        const Json = await realTimeFetch.json();
                        contextUser.setProductsSubComments(Json);
                        contextUser.setIsShowSubCommentsModal({ situation: false, commentID: "" });
                    }
                })
            } else {
                console.log(Fetch);
            }
        } catch (error) {
            swal({
                title: `خطا در دیافت اطلاعات کاربر `,
                buttons: "تلاش دوباره",
                icon: "error"
            });
        }

    }

    function openNewCommentModal() {
        if (contextUser.userInforms?.[0]?.id) {
            contextUser.setIsShowCommentsModal(true)
        } else {
            swal({
                title: `لطفا ابتدا وارد شوید `,
                buttons: "رفتن به صفحه لاگین",
                icon: "warning"
            })
        }
    }

    function deleteCommentsModal() {
        contextUser.setIsShowCommentsModal(false);
    }

    function deleteSubCommentsModal() {
        contextUser.setIsShowSubCommentsModal(false);
    }

    return (
        <section className='ProductsDetails'>
            {contextUser.isShowCommentsModal ?
                <div className='ProductsDetails__Comments-Modal'>
                    <span onClick={deleteCommentsModal}>Delete Modal</span>
                    <form action="">
                        <textarea ref={commentText} placeholder='لطفا متن کامنت خود را وارد کنید ...'></textarea>
                        <button onClick={createNewComment}>ثبت کامنت</button>
                    </form>
                </div>
                : ""}

            {contextUser.isShowSubCommentsModal.situation ?
                <div className='ProductsDetails__Comments-Modal'>
                    <span onClick={deleteSubCommentsModal}>Delete Modal</span>
                    <form action="">
                        <textarea ref={commentText} placeholder='لطفا متن کامنت خود را وارد کنید ...'></textarea>
                        <button onClick={createNewSubComment}>ثبت کامنت</button>
                    </form>
                </div>
                : ""}

            {/*strat  use form header component============================================================================================================================================================================  */}
            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>
            {/*end use form header component and start ProductsDetails Details ======================================================================================  */}

            <div className='ProductsDetails__Details'>

                {/* strat right side =========================================================================================================================================================================== */}
                <div className='ProductsDetails__Details__Right_Side'>
                    {contextUser.product?.[0]?.id ? <h1 className='ProductsDetails__Details__Right_Side__Name'>{contextUser.product?.[0].name}</h1> : <Skeleton style={{ width: "100%" }}></Skeleton>}
                    {contextUser.product?.[0]?.id ? <span className='ProductsDetails__Details__Right_Side__Price'>قیمت اصلی : {Number(contextUser.product?.[0].price).toLocaleString()} تومان</span> : ""}
                    {contextUser.product?.[0]?.id ? <span className='ProductsDetails__Details__Right_Side__Off_Pesent'>درصد تخفیف : {Number(contextUser.product?.[0].offPrecent).toLocaleString()} درصد</span> : ""}
                    {contextUser.product?.[0]?.id ? <span className='ProductsDetails__Details__Right_Side__Off_Price'>قیمت نهایی : {Number(contextUser.product?.[0].offPrice).toLocaleString()} تومان</span> : ""}
                    {contextUser.product?.[0]?.id ? <span className='ProductsDetails__Details__Right_Side__Disc'>{contextUser.product?.[0].disc}</span> : ""}
                    <button >اضافه کردن محصول به سبد خرید </button>
                </div>

                {/* end right side and start left side ============================ =============================================================================================================================================== */}

                {contextUser.product?.[0]?.id ? <img className='ProductsDetails__Details__Left_Side' src={alt} alt={alt} /> : ""}

                {/* end left side =========================================================================================================================================================================== */}

            </div>

            <div className='ProductsDetails__Comments'>

                <div className='ProductsDetails__Comments__Header'>
                    <span className='ProductsDetails__Comments__Header__Title'>نظرات کاربران</span>
                    <button className='ProductsDetails__Comments__Header__New-Comment' onClick={openNewCommentModal}>ایجاد نظر جدید</button>
                </div>

                <div className='ProductsDetails__Comments__Self-Comments'>
                    {(contextUser.productComments?.[0]?.id) ? contextUser.productComments.map(informs => <Comments key={informs.id} {...informs}></Comments>) : "نظری وجود ندارد"}
                </div>
            </div>

            <div className='ProductsDetails__Space'></div>

            <Footer></Footer>
        </section>

    )
}
