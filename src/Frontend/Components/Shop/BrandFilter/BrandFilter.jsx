import { useEffect, useState } from 'react'
import './BrandFilter.css';

export default function BrandFilter({ id, text, brandFilter, isLoaded }) {

    const [isChecked, setIsChecked] = useState(false)

    const urlSearch = new URLSearchParams(window.location.search)

    let priceRangeFilterValue = urlSearch.getAll("priceRange").map(String)
    let grainFilterIndexs = urlSearch.getAll("grainFilter").map(String)
    let brandFilterIndexs = urlSearch.getAll("brandFilter").map(String)
    let offerFilterIndexs = urlSearch.getAll("offerFilter").map(String)

    useEffect(() => {
        brandFilterIndexs.includes(brandFilter) ? setIsChecked(true) : setIsChecked(false)
        console.log(brandFilter);
    }, []);

    function changeSelectLogic() {
        if (!brandFilterIndexs.includes(brandFilter)) {
            brandFilterIndexs.push(brandFilter)
        } else {
            brandFilterIndexs = brandFilterIndexs.filter(indx => indx !== brandFilter)
        }
        let queryStringOffers = offerFilterIndexs.map(num => `offerFilter=${num}`).join("&");
        let queryStringBrands = brandFilterIndexs.map(num => `brandFilter=${num}`).join("&");
        let queryStringGrains = grainFilterIndexs.map(num => `grainFilter=${num}`).join("&");
        let queryStringPrice = priceRangeFilterValue.map(num => `priceRange=${num}`).join("&")

        let mixing = [queryStringBrands, queryStringOffers, queryStringGrains, queryStringPrice];

        mixing = mixing.filter(data => data !== "")
        window.location.search = mixing.join("&")
    }

    if (isLoaded) {
        return (
            <section id={id} className="BrandFilter">
                <input id={id + 1} data-filter={brandFilter} onChange={changeSelectLogic} type="checkbox" checked={isChecked} />
                <label htmlFor={id + 1}>{text}</label>
            </section>
        )
    } else {
        return (
            <section id={id} className="BrandFilter skeleton"></section>
        )
    }
}
