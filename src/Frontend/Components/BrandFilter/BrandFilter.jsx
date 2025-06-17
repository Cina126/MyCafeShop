/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react'
import './BrandFilter.css';
import Context from '../../Context/Context';
import swal from 'sweetalert';

export default function BrandFilter({ id, name, text, isChecked, brandFilter }) {

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
    }, [contextUser.brandSelected])

    async function changeSelectLogic(event) {
        try {
            const UpdateBrandTypesFetch = await fetch("http://localhost:7000/cafeAPI/filterProducts/brandTypes", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: event.currentTarget.id })
            });
            if (UpdateBrandTypesFetch.ok) {
                contextUser.setBrandSelected(event.target.dataset.filter)
                const GetBrandTypesFetchRealtime = await fetch("http://localhost:7000/cafeAPI/filterProducts/brandTypes");
                if (GetBrandTypesFetchRealtime.ok) {
                    const GetFetchJson = await GetBrandTypesFetchRealtime.json()
                    contextUser.setBrandTypes(GetFetchJson)
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
        return <span data-filter={brandFilter} className='BrandFilter checked' id={id} onClick={changeSelectLogic}>{text}</span>
    } else {
        return <span data-filter={brandFilter} className='BrandFilter' id={id} onClick={changeSelectLogic}>{text}</span>
    }
}