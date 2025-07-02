import React from 'react'
import './Services.css'
export default function Services({ title, disc, children ,isLoaded }) {
    return (
        <section className='Services'>
            <div className='Services__Right-Side'>
                {children}
            </div>
            <div className='Services__Left-Side'>
                <span className='Services__Left-Side__Title'>{title}</span>
                <span className='Services__Left-Side__Disc'>{disc}</span>
            </div>
        </section>
    )
}
