import React from 'react'
import './Subcomments.css';

export default function Subcomments({ username, role, date, commentText }) {
    return (
        <div className='Subcomments'>
            <div className='Subcomments'>

                <div className='Subcomments__Header'>
                    <div className='Subcomments__Header__Right-Side'>
                        <span>{username} | {role}</span>
                        <span>{date}</span>
                    </div>
                </div>

                <div className='Comments__Body'>
                    <span>{commentText}</span>
                </div>
            </div>
        </div>
    )
}
