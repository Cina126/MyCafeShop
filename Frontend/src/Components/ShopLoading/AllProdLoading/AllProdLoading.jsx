import React from 'react'
import './AllProdLoading.css';

export default function AllProdLoading() {
    return (
        <div className='AllProdLoading'>
            <div className='AllProdLoading__img skeleton'></div>
            <div className='AllProdLoading__name-and-disc skeleton'></div>

            <div className='AllProdLoading__price-section'>
                <div className='AllProdLoading__price skeleton'></div>
                <div className='AllProdLoading__offPrice skeleton'></div>
            </div>


            <div className='AllProdLoading__Details'>
                <div className='AllProdLoading__Details__Details skeleton'></div>
                <div className='AllProdLoading__Details__Cart skeleton'></div>
                <div className='AllProdLoading__Details__Stras skeleton'></div>
            </div>
        </div>
    )
}
