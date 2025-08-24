import React from 'react'
import './CommentLoading.css';

export default function CommentLoading() {
    return (
        <div className='CommentLoading'>

            <div className='CommentLoading__Header'>
                <div className='CommentLoading__Header__Right-Side'>
                    <div className='CommentLoading__Header__Right-Side__Role skeleton'></div>
                    <div className='CommentLoading__Header__Right-Side__Date skeleton'></div>
                </div>
                <span className='CommentLoading__Header__Left-Side__Answer skeleton' ></span>
            </div>

            <div className='CommentLoading__Body'>

                <div className='CommentLoading__Body__Text skeleton'></div>

                <div className='CommentLoading__Body__Subcomments'>

                    <div className='CommentLoading__Body__Subcomments__Header'>
                        <div className='CommentLoading__Body__Subcomments__Header__Right-Side'>
                            <div className='CommentLoading__Body__Subcomments__Header__Right-Side__Role skeleton'></div>
                            <div className='CommentLoading__Body__Subcomments__Header__Right-Side__Date skeleton'></div>
                        </div>
                    </div>

                    <div className='CommentLoading__Body__SubComments__Body skeleton'></div>
                </div>
            </div>
        </div>
    )
}
