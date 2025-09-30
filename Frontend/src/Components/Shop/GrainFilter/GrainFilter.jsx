/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';
import './GrainFilter.css';
import { useSearchParams } from 'react-router-dom';

export default function FilterSection({ id, text, grainFilter }) {

    const [isChecked, setIsChecked] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const filterCheckBoxesRef = useRef()

    const filters = Object.fromEntries(searchParams.entries())

    useEffect(() => {
        if (filters.grainFilter === filterCheckBoxesRef.current.dataset.filter) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [searchParams]);

    function changeSelectLogic(event) {
        const updates = { ...filters, grainFilter: event.target.dataset.filter }
        setSearchParams(updates)
    }

    return (
        <section id={id} className="GrainFilter">
            <input ref={filterCheckBoxesRef} data-filter={grainFilter} onChange={changeSelectLogic} id={id + 1} type="checkbox" checked={isChecked} />
            <label htmlFor={id + 1}>{text}</label>
        </section>

    )
}
