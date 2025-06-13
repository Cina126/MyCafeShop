/* eslint-disable no-self-assign */
/* eslint-disable no-unused-vars */

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

// strat imports funcs
import useGetFetch from '../../Functions/useGetFetch';
import Subcomments from '../../Components/Subcomments/Subcomments';
// end imports funcs

import alt from "./../../../Images/Ghahve/NewestProducts/8-600x600.png";
import { createContext, useRef, useState } from 'react';
import useGetUserInforms from '../../Functions/useGetUserInforms';

export const productsDetailsContext = createContext()

export default function ProductsDetails() {

    const params = useParams();

    const [userInforms] = useGetUserInforms("/getUserInforms");

    const [product, setProductFlag] = useGetFetch(`/products/allProducts/${params.productID}`);
    const [productComments, setProductCommentsFlag] = useGetFetch(`/products/getProductComments/${params.productID}`);

    const [isShowCommentsModal, setIsShowCommentsModal] = useState(false);
    const [isShowSubCommentsModal, setIsShowSubCommentsModal] = useState({ situation: false, commentID: "" });

    const commentText = useRef()

    async function createNewComment(event) {
        event.preventDefault()
        const datas = { firstName: userInforms[0].firstName, lastName: userInforms[0].lastName, role: userInforms[0].role, commentText: commentText.current.value, date: new Date().toLocaleDateString("fa-Ir"), isVerifyed: 1, userID: userInforms[0].id, productID: params.productID, }
        try {
            const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/addNewComments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
            if (Fetch.ok) {
                swal({
                    title: `با موقیت کامنت شما ثبت شد`,
                    buttons: "باشه",
                    icon: "success"
                }).then(res => {
                    setIsShowCommentsModal(false);
                    setProductCommentsFlag((prev) => { return !prev });
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
        const datas = { firstName: userInforms[0].firstName, lastName: userInforms[0].lastName, role: userInforms[0].role, commentText: commentText.current.value, date: new Date().toLocaleDateString("fa-Ir"), isVerifyed: 1, userID: userInforms[0].id, productID: params.productID, commentID: isShowSubCommentsModal.commentID }
        try {
            const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/addNewSubComments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
            if (Fetch.ok) {
                swal({
                    title: `با موقیت کامنت شما ثبت شد`,
                    buttons: "باشه",
                    icon: "success"
                }).then(res => {
                    setIsShowSubCommentsModal({ situation: false, commentID: "" });
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
        if (userInforms?.[0]?.id) {
            setIsShowCommentsModal(true)
        } else {
            swal({
                title: `لطفا ابتدا وارد شوید `,
                buttons: "رفتن به صفحه لاگین",
                icon: "warning"
            })
        }
    }

    function deleteCommentsModal() {
        setIsShowCommentsModal(false);
    }

    function deleteSubCommentsModal() {
        setIsShowSubCommentsModal(false);
    }

    return (
        <productsDetailsContext.Provider value={{ setIsShowSubCommentsModal }}>

            <section className='ProductsDetails'>

                {isShowCommentsModal ?
                    <div className='ProductsDetails__Comments-Modal'>
                        <span onClick={deleteCommentsModal}>Delete Modal</span>
                        <form action="">
                            <textarea ref={commentText} placeholder='لطفا متن کامنت خود را وارد کنید ...'></textarea>
                            <button onClick={createNewComment}>ثبت کامنت</button>
                        </form>
                    </div>
                    : ""}

                {isShowSubCommentsModal.situation ?
                    <div className='ProductsDetails__Comments-Modal'>
                        <span onClick={deleteSubCommentsModal}>Delete Modal</span>
                        <form action="">
                            <textarea ref={commentText} placeholder='لطفا متن کامنت خود را وارد کنید ...'></textarea>
                            <button onClick={createNewSubComment}>ثبت کامنت</button>
                        </form>
                    </div>
                    : ""}

                {/*strat  use form header component============================================================================================================================================================================  */}
                <HeaderPc userInforms={userInforms}></HeaderPc>
                <HeaderPhone></HeaderPhone>
                {/*end use form header component and start ProductsDetails Details ======================================================================================  */}

                <div className='ProductsDetails__Details'>

                    {/* strat right side =========================================================================================================================================================================== */}
                    <div className='ProductsDetails__Details__Right_Side'>
                        {product?.[0]?.id ? <h1 className='ProductsDetails__Details__Right_Side__Name'>{product?.[0].name}</h1> : <Skeleton style={{ width: "100%" }}></Skeleton>}
                        {product?.[0]?.id ? <span className='ProductsDetails__Details__Right_Side__Price'>قیمت اصلی : {Number(product?.datas?.[0].price).toLocaleString()} تومان</span> : ""}
                        {product?.[0]?.id ? <span className='ProductsDetails__Details__Right_Side__Off_Pesent'>درصد تخفیف : {Number(product?.datas?.[0].offPrecent).toLocaleString()} درصد</span> : ""}
                        {product?.[0]?.id ? <span className='ProductsDetails__Details__Right_Side__Off_Price'>قیمت نهایی : {Number(product?.datas?.[0].offPrice).toLocaleString()} تومان</span> : ""}
                        {product?.[0]?.id ? <span className='ProductsDetails__Details__Right_Side__Disc'>{product?.[0].disc}</span> : ""}
                        <button >اضافه کردن محصول به سبد خرید </button>
                    </div>

                    {/* end right side and start left side ============================ =============================================================================================================================================== */}

                    {product?.[0]?.id ? <img className='ProductsDetails__Details__Left_Side' src={alt} alt={alt} /> : ""}

                    {/* end left side =========================================================================================================================================================================== */}

                </div>

                <div className='ProductsDetails__Comments'>

                    <div className='ProductsDetails__Comments__Header'>
                        <span className='ProductsDetails__Comments__Header__Title'>نظرات کاربران</span>
                        <button className='ProductsDetails__Comments__Header__New-Comment' onClick={openNewCommentModal}>ایجاد نظر جدید</button>
                    </div>

                    <div className='ProductsDetails__Comments__Self-Comments'>
                        {(productComments?.[0]?.id) ? productComments.map(informs => <Comments key={informs.id} {...informs} userInforms={userInforms}></Comments>) : "نظری وجود ندارد"}
                    </div>
                </div>

                <div className='ProductsDetails__Space'></div>

                <Footer></Footer>
            </section>
        </productsDetailsContext.Provider>
    )
}
