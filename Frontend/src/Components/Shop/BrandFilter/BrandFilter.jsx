/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react'
import './BrandFilter.css';
import { useSearchParams } from 'react-router-dom';

export default function BrandFilter({ id, text, brandFilter }) {

    const [isChecked, setIsChecked] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const filterCheckBoxesRef = useRef()

    const filters = Object.fromEntries(searchParams.entries())

    useEffect(() => {
        if (filters.brandFilter === filterCheckBoxesRef.current.dataset.filter) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [searchParams]);

    function changeSelectLogic(event) {
        const updates = { ...filters, brandFilter: event.target.dataset.filter }
        setSearchParams(updates)
    }

    return (
        <section id={id} className="BrandFilter">
            <input ref={filterCheckBoxesRef} id={id + 1} data-filter={brandFilter} onChange={changeSelectLogic} type="checkbox" checked={isChecked} />
            <label htmlFor={id + 1}>{text}</label>
        </section>
    )
}
