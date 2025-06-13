import React, { useContext } from 'react'
import './Comments.css';

import useGetFetch from './../../Functions/useGetFetch';
import Subcomments from './../Subcomments/Subcomments';
import swal from 'sweetalert'

import { productsDetailsContext } from './../../Pages/ProductsDetails/ProductsDetails'

export default function Comments({ id, firstName, lastName, role, date, commentText, userInforms }) {

    const contextUser = useContext(productsDetailsContext)

    const [subComments, setSubCommentsFlag] = useGetFetch(`/products/getProductComments/subComments/${id}`);

    function openNewSubCommentModal() {
        if (userInforms?.[0]?.id) {
            contextUser.setIsShowSubCommentsModal({ situation: true, commentID: id });
        } else {
            swal({
                title: `لطفا ابتدا وارد شوید `,
                buttons: "رفتن به صفحه لاگین",
                icon: "warning"
            })
        }
    }

    return (
        <div className='Comments' id={id}>

            <div className='Comments__Header'>
                <div className='Comments__Header__Right-Side'>
                    <span>{firstName + " " + lastName} | {role}</span>
                    <span>{date}</span>
                </div>
                <span className='Comments__Header__Left-Side' onClick={openNewSubCommentModal}>پاسخ دادن</span>
            </div>

            <div className='Comments__Body'>
                <span>{commentText}</span>
                {subComments?.length ? subComments.map(informs => <Subcomments key={informs.id} {...informs}></Subcomments>) : ""}
            </div>

        </div>
    )
}
