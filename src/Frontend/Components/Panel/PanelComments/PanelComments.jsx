/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState, useContext } from 'react'
import './PanelComments.css';
import swal from 'sweetalert'
import context from '../../../Context/Context';

export default function PanelComments({ id, firstName, lastName, date, productID, commentText }) {

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

    return (
        <div className='PanelComments' id={id}>
            <span className="PanelComments__FirstName">{firstName}</span>
            <span className="PanelComments__LastName">{lastName}</span>
            <span className="PanelComments__Date">{date}</span>
            <span className="PanelComments__Date__Product-Name">{productDetails?.[0]?.name}</span>
            <button onClick={verifyComment} className="PanelComments__Short-Btn">تایید</button>
            <button onClick={deleteComment} className="PanelComments__Short-Btn">حذف</button>
            <button className="PanelComments__Long-Btn" onClick={editComment}>ویرایش و دیدن متن</button>
        </div>
    )
}
