/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from 'react'
import './Comments.css';

import Subcomments from './../Subcomments/Subcomments';
import { context } from '../../../Context/Context'
import toast from 'react-hot-toast';

export default function Comments({ id, firstName, lastName, role, date, commentText }) {

    const contextUser = useContext(context);
    const [productSubComments, setProductSubComments] = useState([]);

    useEffect(() => {
        setProductSubComments(() => {
            return contextUser.allSubComments?.filter((subComment) => {
                return +subComment.commentID === +id
            })
        })
    }, [contextUser.allSubComments])

    function openNewSubCommentModal() {
        if (contextUser.userInforms?.[0]?.id) {
            contextUser.setIsShowSubCommentsModal({ situation: true, commentID: id });
        } else {
            toast.error("لطفا ابتدا وارد شوید ")
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
                {
                    productSubComments?.length
                        ?
                        productSubComments?.map((informs) => {

                            return informs.isVerifyed ? <Subcomments key={informs.id} {...informs}></Subcomments> : ""
                        })
                        :
                        ""
                }
            </div>

        </div>
    )
}