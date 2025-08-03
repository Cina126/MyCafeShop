/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import './PanelEditCampainProductsComp.css';
import { context } from './../../../Context/Context'

export default function PanelEditCampainProductsComp({ id, image, title, campainOfferPrecent, isLoaded = false }) {

    const contextUser = useContext(context)

    useEffect(() => {
        if (campainOfferPrecent) {
            contextUser.setProductsInEditCampain(prev => [...prev, +id])
        }
    }, [])

    function changeEditProductsInCampainLogic(event) {
        if (contextUser.productsInEditCampain.includes(+event.target.parentElement.id)) {
            contextUser.setProductsInEditCampain(prev => prev.filter(productID => +productID !== +event.target.parentElement.id))
        } else {
            contextUser.setProductsInEditCampain(prev => [...prev, +event.target.parentElement.id])
        }

    }

    if (isLoaded) {
        return (
            <div id={id} className='PanelEditCampainProductsComp'>
                <img src={image} alt="" />
                <span>{title}</span>
                {
                    campainOfferPrecent ?
                        <input onChange={changeEditProductsInCampainLogic} type="checkbox" defaultChecked={true} />
                        :
                        <input onChange={changeEditProductsInCampainLogic} type="checkbox" defaultChecked={false} />
                }
            </div>
        )
    } else {
        return (
            <div id={id} className='PanelEditCampainProductsComp skeleton'>
                <img className='skeleton' src={image} alt="" />
                <span className='skeleton'>{title}</span>
                <input className='skeleton' type="checkbox" />
            </div>
        )
    }

}
