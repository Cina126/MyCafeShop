import React from 'react'
import './Notice.css';

export default function Notice({ id, title, isActive, isLoaded }) {
    if (isLoaded && isActive) {
        return (
            <div id={id} className='Notice'>
                <span>{title}</span>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div id={id} className='Notice'>
                <span className='skeleton'>{title}</span>
            </div>
        )
    } else if (isLoaded && !isActive) {
        return ""
    }

}
