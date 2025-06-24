/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react'
import './App.css';

import Routes from './Routes/Routes';
import { useParams, useRoutes, useHref } from 'react-router-dom';
import context from './Context/Context';
import useGetUserInforms from './Functions/useGetUserInforms';
import useGetFetch from './Functions/useGetFetch';

export default function App() {

    const routes = useRoutes(Routes);

    const [userInforms, setUserInformsFlag] = useGetUserInforms("/getUserInforms");
    const [menues, setMenues, menuesFlag, setMenueFlag] = useGetFetch("/menues");
    const [twoSideCategories, setTwoSideCategories, twoSideCategoriesFlag, setTwoSideCategoriesFlag] = useGetFetch("/categories/getTwoSideCategories");
    const [cupCategories, setCupCategories, cupCategoriesFlag, setCupCategoriesFlag] = useGetFetch("/categories/getCupCategories");
    const [allProducts, setAllProducts, allProductsFlag, setAllProductsFlag] = useGetFetch("/products/allProducts");
    const [allComments, setAllComments, allCommentsFlag, setAllCommentsFlag] = useGetFetch(`/products/getProductComments`);
    const [allSubComments, setAllSubComments, allSubCommentsFlag, setAllSubCommentsFlag] = useGetFetch("/products/getProductComments/subComments");
    const [grainTypes, setGrainTypes, grainTypesFlag, setGrainTypesFlag] = useGetFetch("/filterProducts/grainTypes");
    const [brandTypes, setBrandTypes, BrandTypesFlag, setBrandTypesFlag] = useGetFetch("/filterProducts/brandTypes");
    const [offersTypes, setOffersTypes, OffersTypesFlag, setOffersTypesFlag] = useGetFetch("/filterProducts/offersType");
    const [newestProducts, setNewestProducts] = useState([]);
    const [mostSell, setMostSell] = useState([]);
    const [isShowCommentsModal, setIsShowCommentsModal] = useState(false);
    const [isShowSubCommentsModal, setIsShowSubCommentsModal] = useState({ situation: false, commentID: "" });
    const [userProductsCount, setUserProductsCount] = useState(JSON.parse(localStorage.getItem("UserCart"))?.length);
    const [getAllProductsFromLocalStorage, setGetAllProductsFromLocalStorage] = useState(JSON.parse(localStorage.getItem("UserCart")));
    const [finalPrice, setFinalPrice] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [grainSelected, setGrainSelected] = useState(['Mixed Arabica And Robusta', 'Pure Arabica', 'Pure Robusta']);
    const [brandSelected, setBrandSelected] = useState(["Bonmono", "Tomkins", "Robusta"]);
    const [offerSelected, setOfferSelected] = useState(["1", "0"]);
    const [filterInputMaxNumber, setFilterInputMaxNumber] = useState(1_000_000);
    const [isThemeLight, setIsThemeLight] = useState(localStorage.getItem('theme'));
    const [offCode, setOffCode] = useState("")
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [allUsers, setAllUsers, allUsersFlag, setAllUsersFlag] = useGetFetch("/users/getAllUsers")
    const [panelMenues, panelSetMenues, panelMenuesFlag, panelSetMenueFlag] = useGetFetch("/panel/panelMenus");
    const [brandTypeSelect, setBrandTypeSelect] = useState("Bonmono")
    const [grainTypeSelect, setGrainTypeSelect] = useState("Pure Arabica");
    const [editProductModal, setEditProductModal] = useState({ situation: false, productID: "" });
    const [priceOfProduct, setPriceOfProduct] = useState("")
    const [brandTypeSelectEdited, setBrandTypeSelectEdited] = useState("Bonmono")
    const [grainTypeSelectEdited, setGrainTypeSelectEdited] = useState("Pure Arabica");
    const [editNameOfProduct, setEditNameOfProduct] = useState("")
    const [editPriceOfProduct, setEditPriceOfProduct] = useState("")
    const [editImageOfProduct, setEditImageOfProduct] = useState("")
    const [editoffPrecentOfProduct, setEditoffPrecentOfProduct] = useState("")
    const [editproductCountOfProduct, setEditproductCountOfProduct] = useState("")
    const [editnumberOfSellOfProduct, setEditnumberOfSellOfProduct] = useState("")
    const [editDiscOfProduct, setEditDiscOfProduct] = useState("");
    const [isShowEditCommentValue, setisShowEditCommentValue] = useState({ situation: false, commentID: "", commentText: "" })
    const [editCommentValue, setEditCommentValue] = useState("");
    const [isShowEditUserModal, setIsShowEditUserModal] = useState({
        situation: false, userID: "", dateJoined: "", email: "", firstName: "", lastName: "", password: "", role: "", isBlocked: "", phone: "", token: ""
    });
    const [verifyedComment, setVerifyedComment] = useState();
    const [editUserName, setEditUserName] = useState("")
    const [editUserFamily, setEditUserFamily] = useState("")
    const [editUserRole, setEditUserRole] = useState("")
    const [editUserEmail, setEditUserEmail] = useState("")
    const [editUserDate, setEditUserDate] = useState("")
    const [editUserPhone, setEditUserPhone] = useState("")
    const [editUserPassword, setEditUserPassword] = useState("")
    const [editUserToken, setEditUserToken] = useState("")
    const [editUserIsBlocked, setEditUserIsBlocked] = useState("");

    useEffect(() => {
        if (isThemeLight === "false") {
            document.documentElement.style.setProperty("--background-color", "#443627");
            document.documentElement.style.setProperty("--text-color", "white");
            document.documentElement.style.setProperty("--products-background", "oklch(0.374 0.01 67.558)");
            document.documentElement.style.setProperty("--header-background-color", "rgba(59, 59, 59)");
            document.documentElement.style.setProperty("--sub-comments-background", "rgba(80,80,80)");
        } else {
            document.documentElement.style.setProperty("--background-color", "oklch(0.967 0.003 264.542)");
            document.documentElement.style.setProperty("--text-color", "black");
            document.documentElement.style.setProperty("--products-background", "white");
            document.documentElement.style.setProperty("--header-background-color", "white");
            document.documentElement.style.setProperty("--sub-comments-background", "whitesmoke");
        }
    }, [isThemeLight])

    return (
        <context.Provider value={{
            userInforms, setUserInformsFlag,
            menues, setMenues, menuesFlag, setMenueFlag,
            newestProducts, setNewestProducts, mostSell, setMostSell,
            twoSideCategories, setTwoSideCategories, twoSideCategoriesFlag, setTwoSideCategoriesFlag,
            cupCategories, setCupCategories, cupCategoriesFlag, setCupCategoriesFlag,
            allComments, setAllComments, allCommentsFlag, setAllCommentsFlag,
            allProducts, setAllProducts, allProductsFlag, setAllProductsFlag,
            isShowSubCommentsModal, setIsShowSubCommentsModal, isShowCommentsModal, setIsShowCommentsModal,
            userProductsCount, setUserProductsCount, finalPrice, setFinalPrice,
            getAllProductsFromLocalStorage, setGetAllProductsFromLocalStorage,
            grainTypes, setGrainTypes, grainTypesFlag, setGrainTypesFlag,
            brandTypes, setBrandTypes, BrandTypesFlag, setBrandTypesFlag,
            offersTypes, setOffersTypes, OffersTypesFlag, setOffersTypesFlag,
            searchInput, setSearchInput, grainSelected, setGrainSelected,
            brandSelected, setBrandSelected, offerSelected, setOfferSelected,
            filterInputMaxNumber, setFilterInputMaxNumber,
            allSubComments, setAllSubComments, allSubCommentsFlag, setAllSubCommentsFlag,
            isThemeLight, setIsThemeLight,

            allUsers, setAllUsers, allUsersFlag, setAllUsersFlag,
            panelMenues, panelSetMenues, panelMenuesFlag, panelSetMenueFlag,
            brandTypeSelect, setBrandTypeSelect, grainTypeSelect, setGrainTypeSelect, priceOfProduct, setPriceOfProduct,
            editProductModal, setEditProductModal, brandTypeSelectEdited, setBrandTypeSelectEdited,
            grainTypeSelectEdited, setGrainTypeSelectEdited, editNameOfProduct, setEditNameOfProduct,
            editPriceOfProduct, setEditPriceOfProduct, editImageOfProduct, setEditImageOfProduct,
            editoffPrecentOfProduct, setEditoffPrecentOfProduct, editproductCountOfProduct, setEditproductCountOfProduct,
            editnumberOfSellOfProduct, setEditnumberOfSellOfProduct, editDiscOfProduct, setEditDiscOfProduct,
            editCommentValue, setEditCommentValue, isShowEditCommentValue, setisShowEditCommentValue,
            verifyedComment, setVerifyedComment, isShowEditUserModal, setIsShowEditUserModal,
            editUserName, setEditUserName, editUserFamily, setEditUserFamily, editUserRole, setEditUserRole,
            editUserPassword, setEditUserPassword, editUserDate, setEditUserDate, editUserToken, setEditUserToken,
            editUserPhone, setEditUserPhone, editUserIsBlocked, setEditUserIsBlocked, editUserEmail, setEditUserEmail,
        }}>
            {routes}
        </context.Provider>
    )
}

