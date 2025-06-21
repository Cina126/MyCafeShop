/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react'
import Context from '../../../Context/Context'
import './GrainFilter.css';
import swal from 'sweetalert'

let S = new Set()

export default function FilterSection({ id, text, grainFilter }) {

    const contextUser = useContext(Context);

    function changeSelectLogic(event) {

        if (event.currentTarget.checked) {
            S.add(event.currentTarget.dataset.filter)
            contextUser.setGrainSelected(Array.from(S))
        }
        else {
            S.delete(event.currentTarget.dataset.filter)
            if (Array.from(S).length) {
                contextUser.setGrainSelected(Array.from(S))
            } else {
                contextUser.setGrainSelected(['Mixed Arabica And Robusta', 'Pure Arabica', 'Pure Robusta'])
            }
        }
    }

    return (
        <section id={id} className="GrainFilter">
            <input data-filter={grainFilter} onClick={changeSelectLogic} id={id + 1} type="checkbox" />
            <label htmlFor={id + 1}>{text}</label>
        </section>

    )

}
