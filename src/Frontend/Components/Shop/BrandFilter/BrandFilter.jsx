/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect } from 'react'
import './BrandFilter.css';
import {context} from '../../../Context/Context';

let S = new Set();

export default function BrandFilter({ id, text, brandFilter, isChecked }) {

    const contextUser = useContext(context);

    async function changeSelectLogic(event) {

        if (event.currentTarget.checked) {
            S.add(event.currentTarget.dataset.filter)
            contextUser.setBrandSelected(Array.from(S))
        }
        else {
            S.delete(event.currentTarget.dataset.filter)
            if (Array.from(S).length) {
                contextUser.setBrandSelected(Array.from(S))
            } else {
                contextUser.setBrandSelected(["Bonmono", "Tomkins", "Robusta"])
            }
        }
    }

    return (
        <section id={id} className="BrandFilter">
            <input data-filter={brandFilter} onChange={changeSelectLogic} id={id + 1} type="checkbox" />
            <label htmlFor={id + 1}>{text}</label>
        </section>)
}
