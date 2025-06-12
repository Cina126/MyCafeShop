/* eslint-disable no-unused-vars */

import useGetFetch from '../../Functions/useGetFetch';

export default function AllProducts() {

    const [allProducts, setAllProducts] = useGetFetch("/products/allProducts", "error");

    return (
        <div>

        </div>
    )
}
