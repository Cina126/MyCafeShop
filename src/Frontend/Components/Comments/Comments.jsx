/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext  , useimpe} from 'react'
import './Comments.css';

import Subcomments from './../Subcomments/Subcomments';
import swal from 'sweetalert'
import useGetFetch from '../../Functions/useGetFetch';
import context from './../../Context/Context'

export default function Comments({ id, firstName, lastName, role, date, commentText ,isLoaded }) {

    const contextUser = useContext(context);

    function openNewSubCommentModal() {
        if (contextUser.userInforms?.[0]?.id) {
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
                {contextUser.productsSubComments?.length ? contextUser.productsSubComments?.map(informs => <Subcomments key={informs.id} {...informs}></Subcomments>) : ""}
            </div>

        </div>
    )
}