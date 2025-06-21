import React from 'react'
import './Services.css'
export default function Services({ title, disc, children ,isLoaded }) {
    return (
        <section className='Services'>
            <div className='Services__Right_Side'>
                {children}
            </div>
            <div className='Services__Left_Side'>
                <span className='Services__Left_Side__Title'>{title}</span>
                <span className='Services__Left_Side__Disc'>{disc}</span>
            </div>
        </section>
    )
}
