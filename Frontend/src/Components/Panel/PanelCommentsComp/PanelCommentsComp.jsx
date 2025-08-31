/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState, useContext } from 'react'
import './PanelCommentsComp.css';
import swal from 'sweetalert'
import { context } from '../../../Context/Context';
import toast from 'react-hot-toast';

export default function PanelCommentsComp({ id, firstName, lastName, isVerifyed, date, productID, commentText, isLoaded }) {

    const contextUser = useContext(context);

    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        async function FETCH() {
            try {
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/allProducts/${productID}`);
                if (Fetch.ok) {
                    const Json = await Fetch.json();
                    setProductDetails(Json)
                } else {
                    toast.error("خطا در برقراری ارتباط ")
                }
            } catch (error) {
                console.log(error);
                toast.error("خطا در برقراری ارتباط ")
            }
        }
        FETCH()
    }, []);

    async function verifyComment() {
        try {
            contextUser.setIsLoadingRequest(true)
            const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/editProductCommentsVerifyed/${id}`, { method: "PUT" });
            if (Fetch.ok) {
                toast.success("با موفقیت کامنت تایید شد");
                contextUser.setAllCommentsFlag(prev => !prev)
            } else {
                toast.error("خطا در برقراری ارتباط ")
            }
        } catch (error) {
            toast.error("خطا در برقراری ارتباط ")
        }
        finally {
            contextUser.setIsLoadingRequest(false)
        }
    }

    async function blockComment() {
        try {
            contextUser.setIsLoadingRequest(true)
            const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/editProductCommentsBlocked/${id}`, { method: "PUT" });
            if (Fetch.ok) {
                toast.success("با موفقیت کامنت رد شد");
                contextUser.setAllCommentsFlag(prev => !prev)
            } else {
                toast.error("خطا در برقراری ارتباط ")
            }
        } catch (error) {
            toast.error("خطا در برقراری ارتباط ")
        } finally {
            contextUser.setIsLoadingRequest(false)
        }
    }

    async function deleteComment() {
        swal({
            title: "از حذف کامنت اطمینان دارید ؟",
            buttons: {
                cancel: "انصراف",
                confirm: {
                    text: "حذف",
                    value: true,
                    visible: true,
                    className: "swal-red-btn"
                },
            },
            icon: "warning"
        }).then(async (res) => {
            if (res) {
                try {
                    contextUser.setIsLoadingRequest(true)
                    const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/deleteProductComments/${id}`, { method: "DELETE" });
                    if (Fetch.ok) {
                        toast.success("با موفقیت کامنت حذف شد")
                        contextUser.setAllCommentsFlag(prev => !prev)
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("خطا در برقراری ارتباط ")
                } finally {
                    contextUser.setIsLoadingRequest(false)
                }
            }
        })
    }

    function editComment() {
        contextUser.setisShowEditCommentValue({ situation: true, commentID: id, commentText: commentText });
    }
    if (isLoaded) {
        return (
            <div className='PanelCommentsComp' id={id}>
                <span className="PanelCommentsComp__FirstName">{firstName}</span>
                <span className="PanelCommentsComp__LastName">{lastName}</span>
                <span className="PanelCommentsComp__Date">{date}</span>
                <span className="PanelCommentsComp__Date__Product-Name">{productDetails?.[0]?.name}</span>
                {
                    isVerifyed
                        ?
                        <button className="PanelCommentsComp__Short-Btn" onClick={blockComment}>رد</button>
                        :
                        <button className="PanelCommentsComp__Short-Btn" onClick={verifyComment}>تایید</button>

                }
                <button className="PanelCommentsComp__Short-Btn" onClick={deleteComment}>حذف</button>
                <button className="PanelCommentsComp__Long-Btn" onClick={editComment}>ویرایش متن</button>
            </div>
        )
    } else {
        return (
            <div className='PanelCommentsComp'>
                <div className="PanelCommentsComp__FirstName skeleton"></div>
                <div className="PanelCommentsComp__LastName skeleton"></div>
                <div className="PanelCommentsComp__Date skeleton"></div>
                <div className="PanelCommentsComp__Date__Product-Name skeleton"></div>
                <div className="PanelCommentsComp__Short-Btn skeleton"></div>
                <div className="PanelCommentsComp__Short-Btn skeleton"></div>
                <div className="PanelCommentsComp__Long-Btn skeleton"></div>
            </div>
        )
    }

}
