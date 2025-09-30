import React from 'react'
import './AllArticlesComp.css';
import { Link } from 'react-router-dom';

export default function AllArticlesComp({ id, cover, title, summery, date, creator, link }) {
    return (
        <Link to={link} id={id} className='AllArticlesComp'>
            {
                cover !== "null"
                    ?
                    <img className='AllProductsComp__img' src={`http://localhost:7000${cover}`} alt="" />
                    :
                    <img className='AllProductsComp__img' src={`Images/noImage.png`} alt="" />
            }
            <span className='AllArticlesComp__Title'>{title}</span>
            <span className='AllArticlesComp__Summery'>{summery}</span>
            <div className='AllArticlesComp__Date-And-Creator'>
                <span className='AllArticlesComp__Date-And-Creator__Creator'>{creator}</span>
                <span className='AllArticlesComp__Date-And-Creator__Date'>{date}</span>
            </div>
        </Link>
    )
}
