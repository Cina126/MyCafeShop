/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useRef } from 'react'
import './OfferFilter.css';
import Context from '../../../Context/Context';
import swal from 'sweetalert'

let S = new Set()

export default function OfferFilter({ id, text, offersFilter }) {

    const contextUser = useContext(Context);
    const offerRef = useRef()

    function changeSelectLogic(event) {

        if (event.currentTarget.checked) {
            S.add(event.currentTarget.dataset.filter)
            contextUser.setOfferSelected(Array.from(S))
        }
        else {
            S.delete(event.currentTarget.dataset.filter)
            if (Array.from(S).length) {
                contextUser.setOfferSelected(Array.from(S))
            } else {
                contextUser.setOfferSelected(["1", "0"])
            }
        }
    }

    return (
        <section ref={offerRef} id={id} className="OfferFilter">
            <input data-filter={offersFilter} onClick={changeSelectLogic} id={id + 1} type="checkbox" />
            <label htmlFor={id + 1}>{text}</label>
        </section>

    )
}