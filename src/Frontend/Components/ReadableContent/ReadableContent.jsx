import React from 'react'
import './ReadableContent.css'
export default function ReadableContent({ image, text ,isLoaded }) {
    return (
        <section className='ReadableContent'>
            <img src={image} alt={image} />
            <div className='ReadableContent__Discriptions'>
                <span className='ReadableContent__Title'>{text}</span>
                <span className='ReadableContent__Date'>{new Date().toLocaleDateString("fa-Ir")}</span>
            </div>
        </section>
    )
}
