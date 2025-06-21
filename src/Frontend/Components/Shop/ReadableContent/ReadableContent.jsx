import React from 'react'
import './ReadableContent.css'
export default function ReadableContent({ id, image, title, disc, author, isLoaded, date }) {
    if (isLoaded) {
        return (
            <section className='ReadableContent' id={id}>
                <img src={image} alt={image} />
                <div className='ReadableContent__Discriptions'>
                    <span className='ReadableContent__Title'>{title}</span>
                    <span className='ReadableContent__Date'>{date}</span>
                    <span className='ReadableContent__Author'>{author}</span>
                </div>
            </section>
        )
    } else {
        return (
            <section className='ReadableContent loading' id={id}>
                <span className='loader'></span>
            </section>
        )
    }

}
