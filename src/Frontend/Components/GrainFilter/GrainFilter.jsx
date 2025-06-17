/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react'
import Context from '../../Context/Context'
import './GrainFilter.css';
import swal from 'sweetalert'

export default function FilterSection({ id, text, isChecked, grainFilter }) {

    const contextUser = useContext(Context);

    useEffect(() => {
        async function FETCH() {
            const GetFilteredProducts = await fetch("http://localhost:7000/cafeAPI/products/allProducts/searchProducts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    inputValue: contextUser.searchInput,
                    grainType: contextUser.grainSelected,
                    brandType: contextUser.brandSelected,
                    offerType: contextUser.offerSelected
                })
            })
            if (GetFilteredProducts.ok) {
                const Json = await GetFilteredProducts.json()
                contextUser.setAllProducts(Json)
            }
        }
        FETCH()
    }, [contextUser.grainSelected]);

    async function changeSelectLogic(event) {

        try {
            const UpdateGraintTypesFetch = await fetch("http://localhost:7000/cafeAPI/filterProducts/grainTypes", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: event.currentTarget.id })
            });

            if (UpdateGraintTypesFetch.ok) {

                contextUser.setGrainSelected(event.target.dataset.filter);

                const GetGraintTypesFetchRealtime = await fetch("http://localhost:7000/cafeAPI/filterProducts/grainTypes");
                if (GetGraintTypesFetchRealtime.ok) {
                    const Json = await GetGraintTypesFetchRealtime.json()
                    contextUser.setGrainTypes(Json)
                }
            }
        } catch (error) {
            swal({
                title: `خطا در برقراری ارتباط `,
                buttons: "تلاش دوباره",
                icon: "error"
            });
        }
    }
    if (isChecked) {
        return <span data-filter={grainFilter} className='GrainFilter checked' id={id} onClick={changeSelectLogic}>{text}</span>
    } else {
        return <span data-filter={grainFilter} className='GrainFilter' id={id} onClick={changeSelectLogic}>{text}</span>
    }

}
