/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from 'react'
import './OfferFilter.css';
import { useSearchParams } from 'react-router-dom';

export default function OfferFilter({ id, text, offersFilter }) {

    const [isChecked, setIsChecked] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const filterCheckBoxesRef = useRef()

    const filters = Object.fromEntries(searchParams.entries())

    useEffect(() => {
        if (filters.offersFilter === filterCheckBoxesRef.current.dataset.filter) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [searchParams]);

    function changeSelectLogic(event) {
        const updates = { ...filters, offersFilter: event.target.dataset.filter }
        setSearchParams(updates)
    }
    return (
        <section id={id} className="OfferFilter">
            <input ref={filterCheckBoxesRef} data-filter={offersFilter} onChange={changeSelectLogic} id={id + 1} type="checkbox" checked={isChecked} />
            <label htmlFor={id + 1}>{text}</label>
        </section>

    )
}