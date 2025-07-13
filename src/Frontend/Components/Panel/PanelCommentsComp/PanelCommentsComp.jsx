/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState, useContext } from 'react'
import './PanelCommentsComp.css';
import swal from 'sweetalert'
import { context } from '../../../Context/Context';

export default function PanelCommentsComp({ id, firstName, lastName, date, productID, commentText, isLoaded }) {

    const contextUser = useContext(context);

    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        async function FETCH() {
            try {
                const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/allProducts/${productID}`);
                if (Fetch.ok) {
                    const Json = await Fetch.json();
                    setProductDetails(Json)
                } else {
                    swal({
                        title: `خطا در برقراری ارتباط `,
                        buttons: "تلاش دوباره",
                        icon: "error"
                    })
                }
            } catch (error) {
                swal({
                    title: `خطا در برقراری ارتباط `,
                    buttons: "تلاش دوباره",
                    icon: "error"
                })
            }
        }
        FETCH()
    }, []);

    async function verifyComment() {
        try {
            const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/editProductCommentsVerifyed/${id}`, { method: "PUT" });
            if (Fetch.ok) {
                swal({
                    title: `با موفقیت کامنت تایید شد`,
                    buttons: "اوکی",
                    icon: "success"
                }).then(res => contextUser.setAllCommentsFlag(prev => !prev))
            } else {
                console.log(Fetch);
            }
        } catch (error) {

        }
    }

    async function deleteComment() {
        swal({
            title: "از حذف کامنت اطمینان دارید ؟",
            buttons: ["انصراف", "حذف"],
            icon: "warning"
        }).then(async (res) => {
            if (res) {
                try {
                    const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/deleteProductComments/${id}`, { method: "DELETE" });
                    if (Fetch.ok) {
                        swal({
                            title: `با موفقیت کامنت حذف شد`,
                            buttons: "اوکی",
                            icon: "success"
                        }).then(() => contextUser.setAllCommentsFlag(prev => !prev))
                    }
                } catch (error) {
                    console.log(error);
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
                <button className="PanelCommentsComp__Short-Btn" onClick={verifyComment}>تایید</button>
                <button className="PanelCommentsComp__Short-Btn" onClick={deleteComment}>حذف</button>
                <button className="PanelCommentsComp__Long-Btn" onClick={editComment}>ویرایش و دیدن متن</button>
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
