import React from 'react'
import './AllArticlesLoading.css';

export default function AllArticlesLoading() {
    return (
        <div className='AllArticlesLoading'>
            <div className='AllArticlesLoading__Img skeleton'></div>
            <div className='AllArticlesLoading__Title skeleton'></div>
            <div className='AllArticlesLoading__Summery skeleton'></div>
            <div className='AllArticlesLoading__Date-And-Creator'>
                <div className='AllArticlesLoading__Date-And-Creator__Creator skeleton'></div>
                <div className='AllArticlesLoading__Date-And-Creator__Date skeleton'></div>
            </div>
        </div>
    )
}
