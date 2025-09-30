/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useContext } from 'react'
import './PanelSubCommentsComp.css';
import swal from 'sweetalert';
import { context } from '../../../Context/Context';
import toast from 'react-hot-toast';

export default function PanelSubCommentsComp({ id, firstName, lastName, commentText, date, role, isVerifyed, commentID, userID, productID, isLoaded }) {

    const contextUser = useContext(context)

    const [product, setProducts] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        async function getProductName() {
            try {
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/getSingleProduct/${productID}`)
                if (Fetch.ok) {
                    const Json = await Fetch.json();
                    setProducts(Json)
                }
            } catch (error) {
                console.log(error);
            }
        }

        async function getUsertName() {
            try {
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/users/getSingleUsers/${userID}`)
                if (Fetch.ok) {
                    const Json = await Fetch.json();
                    setUser(Json)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProductName()
        getUsertName()
    }, [])

    async function acceptSubCommentLogic() {
        try {
            contextUser.setIsLoadingRequest(true)
            const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/getProductComments/acceptSubComments/${id}`, {
                method: "PUT"
            })
            if (Fetch.ok) {
                toast.success("پاسخ کامنت تایید شد ")
                contextUser.setAllSubCommentsFlag(prev => !prev)
            }
        } catch (error) {
            console.log(error);
            toast.error("خطا در ارتباط با سرور ")
        }
        finally{
            contextUser.setIsLoadingRequest(false)
        }
    }

    async function usAcceptSubCommentLogic() {
        try {
            contextUser.setIsLoadingRequest(true)
            const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/getProductComments/unAcceptSubComments/${id}`, {
                method: "PUT"
            })
            if (Fetch.ok) {
                toast.success("پاسخ کامنت رد شد ")
                contextUser.setAllSubCommentsFlag(prev => !prev)
            }
        } catch (error) {
            console.log(error);
            toast.error("خطا در ارتباط با سرور ")
        }
        finally{
            contextUser.setIsLoadingRequest(false)
        }
    }

    async function removeSubCommentLogic() {
        swal({
            title: `پاسخ کامنت حذف شود ؟`,
            buttons: ["انصراف", "حذف"],
            icon: "warning"
        }).then(async (res) => {
            if (res) {
                try {
                    contextUser.setIsLoadingRequest(true)
                    const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/getProductComments/deleteSubComments/${id}`, {
                        method: "DELETE"
                    })
                    if (Fetch.ok) {
                        toast.success("پاسخ کامنت با موفقیت حذف شد")
                        contextUser.setAllSubCommentsFlag(prev => !prev)
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("خطا در ارتباط با سرور ")
                }
                finally{
                    contextUser.setIsLoadingRequest(false)
                }
            }
        });

    }

    function editSubCommentLogic() {
        contextUser.setIsShowEditSubCommentsValueModal({ situation: true, id, commentText })
    }

    if (isLoaded) {
        return (
            <div className='PanelSubCommentsComp'>
                <span>{firstName}</span>
                <span>{lastName}</span>
                <span>{date}</span>
                <span>{product?.[0]?.name}</span>
                <span>{user?.[0]?.firstName + " " + user?.[0]?.lastName}</span>
                <button onClick={editSubCommentLogic}> ویرایش متن</button>
                {+isVerifyed === 0 ? <button onClick={acceptSubCommentLogic}>تایید</button> : <button onClick={usAcceptSubCommentLogic}>رد </button>}
                <button onClick={removeSubCommentLogic}>حذف</button>
            </div>
        )
    } else {
        return (
            <div className='PanelSubCommentsComp'>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <button className='skeleton'></button>
                <button className='skeleton'></button>
                <button className='skeleton'></button>
            </div>
        )
    }

}
