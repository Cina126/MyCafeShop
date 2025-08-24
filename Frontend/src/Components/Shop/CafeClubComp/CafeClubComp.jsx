import React from 'react'
import './CafeClubComp.css';
import IconsComp from '../../IconsComp/IconsComp';

export default function CafeClubComp({ title, iconName, isLoaded }) {
    return (
        <section className='CafeClubComp'>
            <IconsComp iconName={iconName}></IconsComp>
            <span>{title}</span>
        </section>
    )
}
