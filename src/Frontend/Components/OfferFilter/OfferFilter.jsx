/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react'
import './OfferFilter.css';
import Context from '../../Context/Context';
import swal from 'sweetalert'

export default function OfferFilter({ id, text, isChecked, offersFilter }) {

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
                    offerType: contextUser.offerSelected,
                })
            })
            if (GetFilteredProducts.ok) {
                const Json = await GetFilteredProducts.json()
                contextUser.setAllProducts(Json)
            }
        }
        FETCH()
    }, [contextUser.offerSelected])

    async function changeSelectLogic(event) {
        try {
            const UpdateOffersType = await fetch("http://localhost:7000/cafeAPI/filterProducts/offersType", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: event.currentTarget.id })
            });
            if (UpdateOffersType.ok) {
                contextUser.setOfferSelected(event.target.dataset.filter)
                const GetOfferTypesFetchRealtime = await fetch("http://localhost:7000/cafeAPI/filterProducts/offersType");
                if (GetOfferTypesFetchRealtime.ok) {
                    const Json = await GetOfferTypesFetchRealtime.json()
                    contextUser.setOffersTypes(Json)
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
        return <span data-filter={offersFilter} className='OfferFilter checked' id={id} onClick={changeSelectLogic}>{text}</span>
    } else {
        return <span data-filter={offersFilter} className='OfferFilter' id={id} onClick={changeSelectLogic}>{text}</span>
    }
}