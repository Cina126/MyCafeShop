/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useContext, useEffect } from 'react'
import './App.css';

import Routes from './Routes/Routes';
import { useParams, useRoutes, useHref } from 'react-router-dom';
import context from './Context/Context';
import useGetUserInforms from './Functions/useGetUserInforms';
import useGetFetch from './Functions/useGetFetch';

export default function App() {

    const routes = useRoutes(Routes);
    const href = useHref();

    const [userInforms, setUserInformsFlag] = useGetUserInforms("/getUserInforms");
    const [menues, setMenues, menuesFlag, setMenueFlag] = useGetFetch("/menues");
    const [newestProducts, setNewestProducts, newestProductsFlag, setNewestProductsFlag] = useGetFetch("/products/allProducts/newestProducts");
    const [twoSideCategories, setTwoSideCategories, twoSideCategoriesFlag, setTwoSideCategoriesFlag] = useGetFetch("/categories/getTwoSideCategories");
    const [cupCategories, setCupCategories, cupCategoriesFlag, setCupCategoriesFlag] = useGetFetch("/categories/getCupCategories");
    const [mostSell, setMostSell, mostSellFlag, setMostSellFlag] = useGetFetch("/products/allProducts/mostSellProducts");
    const [product, setproduc, productFlag, setProductFlag] = useGetFetch(`/products/allProducts/${href?.match(/\d+/g)?.[0]}`);
    const [productComments, setProductComments, productCommentsFlag, setProductCommentsFlag] = useGetFetch(`/products/getProductComments/${href?.match(/\d+/g)?.[0]}`);
    const [allProducts, setAllProducts, allProductsFlag, setAllProductsFlag] = useGetFetch("/products/allProducts");
    const [grainTypes, setGrainTypes, grainTypesFlag, setGrainTypesFlag] = useGetFetch("/filterProducts/grainTypes");
    const [brandTypes, setBrandTypes, BrandTypesFlag, setBrandTypesFlag] = useGetFetch("/filterProducts/brandTypes");
    const [offersTypes, setOffersTypes, OffersTypesFlag, setOffersTypesFlag] = useGetFetch("/filterProducts/offersType");
    const [isShowCommentsModal, setIsShowCommentsModal] = useState(false);
    const [isShowSubCommentsModal, setIsShowSubCommentsModal] = useState({ situation: false, commentID: "" });
    const [productsSubComments, setProductsSubComments] = useState();
    const [userProductsCount, setUserProductsCount] = useState(JSON.parse(localStorage.getItem("UserCart"))?.length);
    const [getFromLocalStorage, setGetFromLocalStorage] = useState(JSON.parse(localStorage.getItem("UserCart")));
    const [finalPrice, setFinalPrice] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [grainSelected, setGrainSelected] = useState("");
    const [brandSelected, setBrandSelected] = useState("");
    const [offerSelected, setOfferSelected] = useState("");



    return (
        <context.Provider value={{
            userInforms, setUserInformsFlag,
            menues, setMenues, menuesFlag, setMenueFlag,
            newestProducts, setNewestProducts, newestProductsFlag, setNewestProductsFlag,
            twoSideCategories, setTwoSideCategories, twoSideCategoriesFlag, setTwoSideCategoriesFlag,
            cupCategories, setCupCategories, cupCategoriesFlag, setCupCategoriesFlag,
            mostSell, setMostSell, mostSellFlag, setMostSellFlag,
            product, setproduc, productFlag, setProductFlag,
            productComments, setProductComments, productCommentsFlag, setProductCommentsFlag,
            allProducts, setAllProducts, allProductsFlag, setAllProductsFlag,
            isShowSubCommentsModal, setIsShowSubCommentsModal, isShowCommentsModal, setIsShowCommentsModal,
            productsSubComments, setProductsSubComments, userProductsCount, setUserProductsCount,
            getFromLocalStorage, setGetFromLocalStorage, finalPrice, setFinalPrice,
            grainTypes, setGrainTypes, grainTypesFlag, setGrainTypesFlag,
            brandTypes, setBrandTypes, BrandTypesFlag, setBrandTypesFlag,
            offersTypes, setOffersTypes, OffersTypesFlag, setOffersTypesFlag,
            searchInput, setSearchInput, grainSelected, setGrainSelected,
            brandSelected, setBrandSelected, offerSelected, setOfferSelected,
        }}>
            {routes}
        </context.Provider>
    )
}

