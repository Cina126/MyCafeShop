import React from 'react'
import { Link } from "react-router-dom";
import './MainPageArticlesComp.css';

export default function MainPageArticlesComp({ id, cover, title, summery, date, creator, link }) {
    return (
        <Link to={`/Blogs/${link}`} id={id} className='MainPageArticlesComp'>
            {
                cover !== "null"
                    ?
                    <img className='AllProductsComp__img' src={`http://localhost:7000${cover}`} alt="" />
                    :
                    <img className='AllProductsComp__img' src={`Images/noImage.png`} alt="" />
            }
            <span className='MainPageArticlesComp__Title'>{title}</span>
            <span className='MainPageArticlesComp__Summery'>{summery}</span>
            <div className='MainPageArticlesComp__Date-And-Creator'>
                <span className='MainPageArticlesComp__Date-And-Creator__Creator'>{creator}</span>
                <span className='MainPageArticlesComp__Date-And-Creator__Date'>{date}</span>
            </div>
        </Link>
    )
}
