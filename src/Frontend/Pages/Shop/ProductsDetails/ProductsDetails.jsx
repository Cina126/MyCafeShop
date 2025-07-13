
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ProductsDetails.css';
import swal from 'sweetalert'

// start import  components
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc'
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import Comments from '../../../Components/Shop/Comments/Comments'
import Footer from '../../../Components/Shop/Footer/Footer'
// end import  components

import { useContext, useRef } from 'react';
import { context } from '../../../Context/Context'
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';

export default function ProductsDetails() {

    const params = useParams()
    const commentText = useRef()
    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setProduct(() => {
            return contextUser?.allProducts?.filter((product) => {
                return +product.id === +params.productID
            })
        })
    }, [contextUser.allProducts])

    useEffect(() => {
        contextUser.setProductComments(() => {
            return contextUser?.allComments?.filter((comment) => {
                return comment.productID == params.productID
            })
        });
    }, [contextUser.allComments]);

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
                    contextUser.setAllCommentsFlag((prev) => { return !prev });
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
                }).then(res => {
                    contextUser.setAllSubCommentsFlag(prev => !prev);
                    contextUser.setIsShowSubCommentsModal({ situation: false, commentID: "" });
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

    function addToCartHandle() {
        const prevLocal = JSON.parse(localStorage.getItem('UserCart'));

        if (prevLocal?.length) {

            let isAlreadyExistProductInLocal = prevLocal.find(inf => +inf.id === +contextUser.product?.[0]?.id);

            if (isAlreadyExistProductInLocal?.id) {
                isAlreadyExistProductInLocal.productsCount = +isAlreadyExistProductInLocal.productsCount + 1
                localStorage.setItem("UserCart", JSON.stringify(prevLocal));
                contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
            }
            else {
                prevLocal.push({
                    id: contextUser.product?.[0]?.id,
                    name: contextUser.product?.[0]?.name,
                    image: contextUser.product?.[0]?.image,
                    price: contextUser.product?.[0]?.price,
                    offPrice: contextUser.product?.[0]?.offPrice,
                    stars: contextUser.product?.[0]?.stars,
                    productsCount: 1
                });
                localStorage.setItem("UserCart", JSON.stringify(prevLocal));
                contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
                console.log(contextUser.product);
            }
            swal({
                title: `با موقیت به سبد خرید اضافه شد`,
                buttons: "باشه",
                icon: "success"
            });
        } else {
            localStorage.setItem("UserCart", JSON.stringify([{
                id: contextUser.product?.[0]?.id,
                name: contextUser.product?.[0]?.name,
                image: contextUser.product?.[0]?.image,
                price: contextUser.product?.[0]?.price,
                offPrice: contextUser.product?.[0]?.offPrice,
                stars: contextUser.product?.[0]?.stars,
                productsCount: 1
            }]));
            contextUser.setUserProductsCount(JSON.parse(localStorage.getItem("UserCart")).length)
            swal({
                title: `با موقیت به سبد خرید اضافه شد`,
                buttons: "باشه",
                icon: "success"
            })
        }
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

            {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

            <div className='ProductsDetails__Details'>

                {/* strat right side =========================================================================================================================================================================== */}
                <div className='ProductsDetails__Details__Right-Side'>
                    {contextUser.product ? <h1 className='ProductsDetails__Details__Right-Side__Name'>{contextUser.product?.[0]?.name}</h1> : ""}
                    {contextUser.product ? <span className='ProductsDetails__Details__Right-Side__Price'>قیمت اصلی : {Number(contextUser.product?.[0]?.price).toLocaleString()} تومان</span> : ""}
                    {contextUser.product ? <span className='ProductsDetails__Details__Right-Side__Off-Pesent'>درصد تخفیف : {Number(contextUser.product?.[0]?.offPrecent).toLocaleString()} درصد</span> : ""}
                    {contextUser.product ? <span className='ProductsDetails__Details__Right-Side__Off-Price'>قیمت نهایی : {Number(contextUser.product?.[0]?.offPrice).toLocaleString()} تومان</span> : ""}
                    {contextUser.product ? <span className='ProductsDetails__Details__Right-Side__Disc'>{contextUser.product?.[0]?.disc}</span> : ""}
                    <button onClick={addToCartHandle}>اضافه کردن محصول به سبد خرید </button>
                </div>

                {/* end right side and start left side ============================================================================================================================================================================ */}

                <div className='ProductsDetails__Details__Left-Side'>
                    <img className='' src={`./../../../../../${contextUser.product?.[0]?.image}`} alt="" />
                </div>
                {/* end left side =========================================================================================================================================================================== */}

            </div>

            <div className='ProductsDetails__Comments'>

                <div className='ProductsDetails__Comments__Header'>
                    <span className='ProductsDetails__Comments__Header__Title'>نظرات کاربران</span>
                    {contextUser.productComments ?
                        contextUser.productComments?.length ?
                            <button className='ProductsDetails__Comments__Header__New-Comment' onClick={openNewCommentModal}>ایجاد نظر جدید</button>
                            :
                            <button className='ProductsDetails__Comments__Header__New-Comment' onClick={openNewCommentModal}>اولین نظر رو شما ایجاد کنید</button>

                        :
                        ""
                    }
                </div>

                <div className='ProductsDetails__Comments__Self-Comments'>
                    {(contextUser.productComments) ?
                        contextUser.productComments?.length ?
                            contextUser.productComments.map((informs) => { return <Comments key={informs.id} {...informs}></Comments> })
                            : <span className='ProductsDetails__Comments__Self-Comments__Not-Comment-Value'>نظری وجود ندارد</span>
                        : "Loading ...."}
                </div>
            </div>

            <Footer></Footer>
        </section>

    )
}
