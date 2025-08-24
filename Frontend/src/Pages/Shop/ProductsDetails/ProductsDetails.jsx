/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext, useRef } from 'react'
import './ProductsDetails.css';

// start import  components
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc'
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import Comments from '../../../Components/Shop/Comments/Comments'
import Footer from '../../../Components/Shop/Footer/Footer';
import CampainComp from '../../../Components/Shop/CampainComp/CampainComp';
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';
import Notice from '../../../Components/Shop/Notice/Notice';
import CommentLoading from './../../../Components/ShopLoading/CommentLoading/CommentLoading'
// end import  components

// strat add depends 
import { context } from '../../../Context/Context'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
// end add depends 



export default function ProductsDetails() {

    const params = useParams()
    const commentText = useRef()
    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
        contextUser.setAllProductsFlag(prev => !prev)
        contextUser.setAllCommentsFlag(prev => !prev)
    }, [])

    useEffect(() => {
        contextUser.setProduct(() => {
            return contextUser.allProducts?.filter((product) => {
                return +product.id === +params.productID
            })
        })
    }, [contextUser.allProducts])

    useEffect(() => {
        contextUser.setProductComments(() => {
            return contextUser.allComments?.filter((comment) => {
                return +comment.productID === +params.productID && comment.isVerifyed === 1
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
            isVerifyed: contextUser.userInforms[0].role === "ادمین" ? 1 : 0,
            userID: contextUser.userInforms[0].id,
            productID: params.productID,
        }
        try {
            const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/addNewComments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
            if (Fetch.ok) {
                contextUser.userInforms[0].role === "ادمین" ? toast.success("کامنت با موفقیت ایجاد شد") : toast.success("کامنت شما با موفقیت ثبت و در حال بررسی است")
                contextUser.setIsShowCommentsModal(false);
                contextUser.setAllCommentsFlag(prev => !prev)
            } else {
                console.log(Fetch);
                toast.error("خطا در دیافت اطلاعات کاربر ")
            }
        } catch (error) {
            toast.error("خطا در دیافت اطلاعات کاربر ")
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
            isVerifyed: contextUser.userInforms[0].role === "ادمین" ? 1 : 0,
            userID: contextUser.userInforms[0].id,
            productID: params.productID,
            commentID: contextUser.isShowSubCommentsModal.commentID
        }
        try {
            const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/addNewSubComments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datas) });
            if (Fetch.ok) {
                contextUser.userInforms[0].role === "ادمین" ? toast.success("کامنت با موفقیت ایجاد شد") : toast.success("کامنت شما با موفقیت ثبت و در حال بررسی است")
                contextUser.setAllSubCommentsFlag(prev => !prev);
                contextUser.setIsShowSubCommentsModal({ situation: false, commentID: "" });

            } else {
                console.log(Fetch);
                toast.error("خطا در دیافت اطلاعات کاربر ")
            }
        } catch (error) {
            toast.error("خطا در دیافت اطلاعات کاربر ")
        }

    }

    function openNewCommentModal() {
        if (contextUser.userInforms?.[0]?.id) {
            contextUser.setIsShowCommentsModal(true)
        } else {
            toast.error("لطفا ابتدا وارد شوید ")
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
            }
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
        }
        toast.success("با موقیت به سبد خرید اضافه شد")
    }


    return (
        <section className='ProductsDetails'>

            {/* start comment modal  */}
            {
                contextUser.isShowCommentsModal ?
                    <div className='ProductsDetails__Comments-Modal'>
                        <span onClick={deleteCommentsModal}>بستن مودال</span>
                        <form action="">
                            <textarea ref={commentText} placeholder='لطفا متن کامنت خود را وارد کنید ...'></textarea>
                            <button onClick={createNewComment}>ثبت کامنت</button>
                        </form>
                    </div>
                    : ""
            }
            {/* end comment modal */}

            {/* start subcomment Modal  */}
            {
                contextUser.isShowSubCommentsModal.situation ?
                    <div className='ProductsDetails__Comments-Modal'>
                        <span onClick={deleteSubCommentsModal}>Delete Modal</span>
                        <form action="">
                            <textarea ref={commentText} placeholder='لطفا متن کامنت خود را وارد کنید ...'></textarea>
                            <button onClick={createNewSubComment}>ثبت کامنت</button>
                        </form>
                    </div>
                    : ""
            }
            {/* end subcomment Modal */}

            {/* start add notice comop  */}
            {
                contextUser.panelNotices
                    ?
                    contextUser.panelNotices.map(notice => <Notice isLoaded={true} key={notice.id} {...notice}></Notice>)
                    :
                    ""
            }
            {/* end notice comp  */}

            {/* start campains comp  */}
            {
                contextUser.panelCampains
                    ?
                    contextUser.panelCampains.map(campain => <CampainComp key={campain.id} {...campain}></CampainComp>)
                    :
                    ""
            }
            {/* end campains comp  */}

            {/*strat  use form header component  */}
            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>
            {/*end use form header component and start ProductsDetails Details   */}

            {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

            <div className='ProductsDetails__Details'>

                {/* strat right side  */}
                <div className='ProductsDetails__Details__Right-Side'>
                    {
                        contextUser.product
                            ?
                            <h1 className='ProductsDetails__Details__Right-Side__Name'>{contextUser.product?.[0]?.name}</h1>
                            :
                            <div className='ProductsDetails__Details__Right-Side__Name-Div skeleton'></div>
                    }
                    {
                        contextUser.product
                            ?
                            <span className='ProductsDetails__Details__Right-Side__Price'>قیمت اصلی {Number(contextUser.product?.[0]?.price).toLocaleString()} تومان</span>
                            :
                            <div className='ProductsDetails__Details__Right-Side__Price-Div skeleton'></div>
                    }
                    {
                        contextUser.product
                            ?
                            <span className='ProductsDetails__Details__Right-Side__Off-Pesent'>درصد تخفیف {Number(contextUser.product?.[0]?.offPrecent).toLocaleString()} درصد</span>
                            :
                            <div className='ProductsDetails__Details__Right-Side__Off-Pesent-Div skeleton'></div>
                    }
                    {
                        contextUser.product
                            ?
                            <span className='ProductsDetails__Details__Right-Side__Off-Price'>قیمت نهایی {Number(contextUser.product?.[0]?.offPrice).toLocaleString()} تومان</span>
                            :
                            <div className='ProductsDetails__Details__Right-Side__Off-Price-Div skeleton'></div>
                    }

                    {
                        contextUser.product
                            ?
                            <span className='ProductsDetails__Details__Right-Side__Disc'>{contextUser.product?.[0]?.disc}</span>
                            :
                            <div className='ProductsDetails__Details__Right-Side__Disc-Div skeleton'></div>
                    }

                    <button onClick={addToCartHandle}>اضافه کردن محصول به سبد خرید </button>
                </div>

                {/* end right side and start left side  */}

                <div className='ProductsDetails__Details__Left-Side'>
                    {
                        contextUser.product
                            ?
                            <img className='ProductsDetails__Details__Left-Side__Img' src={`./../../../../../${contextUser.product?.[0]?.image}`} alt="" />
                            :
                            <div className='ProductsDetails__Details__Left-Side__Img skeleton' src={`./../../../../../${contextUser.product?.[0]?.image}`} alt="" />
                    }
                </div>
                {/* end left side  */}

            </div>

            <div className='ProductsDetails__Comments'>

                <div className='ProductsDetails__Comments__Header'>
                    <span className='ProductsDetails__Comments__Header__Title'>نظرات کاربران</span>
                    {
                        contextUser.productComments ?
                            contextUser.productComments?.length ?
                                <button className='ProductsDetails__Comments__Header__New-Comment' onClick={openNewCommentModal}>ایجاد نظر جدید</button>
                                :
                                <button className='ProductsDetails__Comments__Header__New-Comment' onClick={openNewCommentModal}>اولین نظر رو شما ایجاد کنید</button>

                            :
                            ""
                    }
                </div>

                <div className='ProductsDetails__Comments__Self-Comments'>
                    {
                        contextUser.productComments
                            ?
                            contextUser.productComments?.length
                                ?
                                contextUser.productComments.map((informs) => {
                                    return informs.isVerifyed ? <Comments key={informs.id} {...informs}></Comments> : ""
                                })
                                :
                                <span className='ProductsDetails__Comments__Self-Comments__Not-Comment-Value'>نظری وجود ندارد</span>
                            :
                            [1, 2].map((informs) => {
                                return <CommentLoading key={informs}></CommentLoading>
                            })
                    }
                </div>
            </div>

            <Footer></Footer>
        </section>

    )
}
