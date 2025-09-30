import React from 'react'
import './MainPageArticlesLoading.css';

export default function MainPageArticlesLoading() {
    return (
        <div className='MainPageArticlesLoading'>
            <div className='image skeleton'></div>
            <div className='MainPageArticlesLoading__Title skeleton'></div>
            <div className='MainPageArticlesLoading__Summery skeleton'></div>
            <div className='MainPageArticlesLoading__Date-And-Creator'>
                <div className='MainPageArticlesLoading__Date-And-Creator__Creator skeleton'></div>
                <div className='MainPageArticlesLoading__Date-And-Creator__Date skeleton'></div>
            </div>
        </div>
    )
}
