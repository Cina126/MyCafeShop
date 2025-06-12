import React from 'react'
import './Comments.css';

import useGetFetch from './../../Functions/useGetFetch';
import Subcomments from './../Subcomments/Subcomments';

export default function Comments({ id, username, role, date, commentText }) {

    const [subComments, isLoadingSubComments] = useGetFetch(`/products/getProductComments/subComments/${id}`);

    return (
        <div className='Comments' id={id}>

            <div className='Comments__Header'>
                <div className='Comments__Header__Right-Side'>
                    <span>{username} | {role}</span>
                    <span>{date}</span>
                </div>
                <span className='Comments__Header__Left-Side'>پاسخ دادن</span>
            </div>

            <div className='Comments__Body'>
                <span>{commentText}</span>
                {!isLoadingSubComments ? subComments.map(informs => <Subcomments key={informs.id} {...informs}></Subcomments>) : ""}
            </div>

        </div>
    )
}
