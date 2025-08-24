/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useRef, useState } from 'react'
import './OfferFilter.css';

export default function OfferFilter({ id, text, offersFilter }) {

    const [isChecked, setIsChecked] = useState(false)
    const offerRef = useRef()

    let brandFilterIndexs = new URLSearchParams(window.location.search).getAll("brandFilter").map(String)
    let offerFilterIndexs = new URLSearchParams(window.location.search).getAll("offerFilter").map(String)
    let grainFilterIndexs = new URLSearchParams(window.location.search).getAll("grainFilter").map(String)
    let priceRangeFilterValue = new URLSearchParams(window.location.search).getAll("priceRange").map(String)

    useEffect(() => {
        offerFilterIndexs.includes(offersFilter) ? setIsChecked(true) : setIsChecked(false)
    }, []);

    function changeSelectLogic() {
        if (!offerFilterIndexs.includes(offersFilter)) {
            offerFilterIndexs.push(offersFilter)
        } else {
            offerFilterIndexs = offerFilterIndexs.filter(indx => indx !== offersFilter)
        }
        let queryStringOffers = offerFilterIndexs.map(num => `offerFilter=${num}`).join("&");
        let queryStringBrands = brandFilterIndexs.map(num => `brandFilter=${num}`).join("&");
        let queryStringGrains = grainFilterIndexs.map(num => `grainFilter=${num}`).join("&");
        let queryStringPrice = priceRangeFilterValue.map(num => `priceRange=${num}`).join("&")

        let mixing = [queryStringBrands, queryStringOffers, queryStringGrains, queryStringPrice];

        mixing = mixing.filter(data => data !== "")
        window.location.search = mixing.join("&")
    }
    return (
        <section ref={offerRef} id={id} className="OfferFilter">
            <input data-filter={offersFilter} onChange={changeSelectLogic} id={id + 1} type="checkbox" checked={isChecked} />
            <label htmlFor={id + 1}>{text}</label>
        </section>

    )
}