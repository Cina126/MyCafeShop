/* eslint-disable no-unused-vars */

import { createContext, useEffect, useState } from "react";
import useGetFetch from "../Functions/useGetFetch";
import useGetUserInforms from "../Functions/useGetUserInforms";
import { useRef } from "react";

export const context = createContext();

export default function Context({ children }) {

    const [userInforms, setUserInformsFlag] = useGetUserInforms("/getUserInforms");
    const [menues, setMenues, menuesFlag, setMenueFlag] = useGetFetch("/menues");
    const [twoSideCategories, setTwoSideCategories, twoSideCategoriesFlag, setTwoSideCategoriesFlag] = useGetFetch("/categories/getTwoSideCategories");
    const [cupCategories, setCupCategories, cupCategoriesFlag, setCupCategoriesFlag] = useGetFetch("/categories/getCupCategories");
    const [allProducts, setAllProducts, allProductsFlag, setAllProductsFlag] = useGetFetch("/products/allProducts");
    const [allComments, setAllComments, allCommentsFlag, setAllCommentsFlag] = useGetFetch(`/products/getProductComments`);
    const [cafeClub, setCafeClub, cafeClubFlag, setCafeClubFlag] = useGetFetch("/cafeClub")
    const [product, setProduct] = useState([])
    const [filteredProducts, setFilteredProducts] = useState()
    const [productComments, setProductComments] = useState([]);
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
    const [filterInputMaxNumber, setFilterInputMaxNumber] = useState(1_000_000);
    const [isThemeLight, setIsThemeLight] = useState(localStorage.getItem('theme'));
    const [offCode, setOffCode] = useState("");
    const [isOpenHiddenMeues, setIsOpenHiddenMeues] = useState(false);
    const [isOpenRightSideFilterMenue, setIsOpenRightSideFilterMenue] = useState(false);
    const [passLoginInputType, setPassLoginInputType] = useState("password");
    const [isLoginNameValid, setIsLoginNameValid] = useState(null)
    const [isLoginFamilyValid, setIsLoginFamilyValid] = useState(null)
    const [isLoginPassValid, setIsLoginPassValid] = useState(null);
    const [isSignupNameValid, setIsSignupNameValid] = useState(null)
    const [isSignupFamilyValid, setIsSignupFamilyValid] = useState(null)
    const [isSignupPassValid, setIsSignupPassValid] = useState(null);
    const [isSignupMailValid, setIsSignupMailValid] = useState(null);
    const [isSignupPhoneValid, setIsSignupPhoneValid] = useState(null);
    const [passSignupInputType, setPassSignupInputType] = useState("password")

    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [allUsers, setAllUsers, allUsersFlag, setAllUsersFlag] = useGetFetch("/users/getAllUsers")
    const [panelMenus, setPanelMenus, panelMenusFlag, setPanelMenusFlag] = useGetFetch("/panel/menus");
    const [panelNotices, setPanelNotices, panelNoticesFlag, setPanelNoticesFlag] = useGetFetch("/panel/notices");
    const [offersCode, setOffersCode, offersCodeFlag, setOffersCodeFlag] = useGetFetch("/offCodes/getAllOffsCode")
    const [panelCampains, setPanelCampains, panelCampainsFlag, setPanelCampainsFlag] = useGetFetch("/panel/campains")
    const [brandTypeSelect, setBrandTypeSelect] = useState("Bonmono")
    const [grainTypeSelect, setGrainTypeSelect] = useState("Pure-Arabica");
    const [editProductModal, setEditProductModal] = useState({ situation: false, productID: "" });
    const [priceOfProduct, setPriceOfProduct] = useState("")
    const [brandTypeSelectEdited, setBrandTypeSelectEdited] = useState("Bonmono")
    const [grainTypeSelectEdited, setGrainTypeSelectEdited] = useState("Pure-Arabica");
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
    const [isShowEditCodeModal, setIsShowEditCodeModal] = useState({
        situation: false, id: "", code: "", precent: "", amount: "", timeUsed: "", dateCreated: "", creator: ""
    });
    const [adminUsers, setAdminUsers] = useState([]);
    const [editCode, setEditCode] = useState("")
    const [editCodePrecent, setEditCodePrecent] = useState("")
    const [editCodeAmount, setEditCodeAmount] = useState("")
    const [editCodeTimeUsed, setEditCodTimeUsed] = useState("")
    const [editCodeDate, setEditCodeDate] = useState("")
    const [editCodeCreator, setEditCodeCreator] = useState("");
    const [isShowEditSubCommentsValueModal, setIsShowEditSubCommentsValueModal] = useState({ situation: false, id: "", commentText: "" });
    const [texareaSubCommentValue, setTexareaSubCommentValue] = useState("")
    const [windowSize, setWindowSize] = useState(window.outerWidth);
    const [isOpenEditNoticeModal, setIsOpenEditNoticeModal] = useState({ situation: false, noticeID: "" });
    const [editNoticeInputValue, setEditNoticeInputValue] = useState("")
    const [productsInCampains, setProductsInCampains] = useState([]);
    const [isOpenEditCampainModal, setIsOpenEditCampainModal] = useState(false)
    const [editCampain, setEditCampain] = useState({ title: "", days: "", campainOfferPrecent: "" })
    const [productsInEditCampain, setProductsInEditCampain] = useState([]);
    const [campainTimerFlag, setCampainTimerFlag] = useState(false)
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [passwordValidation] = useState(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
    const [emailValidation] = useState(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const [iranPhoneValidation] = useState(/^09[0-9]{9}$/);
    const [nameValidation] = useState(/^[\p{L} ]{2,}$/u);
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const hiddenMenuRef = useRef()
    const hamburgerRef = useRef()
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    useEffect(() => {
        window.addEventListener("click", (event) => {
            if (!hiddenMenuRef.current?.contains(event.target) && !hamburgerRef.current?.contains(event.target)) {
                setIsOpenHiddenMeues(false)
            }
        })
        window.addEventListener("resize", () => {
            setWindowSize(window.outerWidth)
        })
    }, [])


    useEffect(() => {
        if (isThemeLight === "false") {
            document.documentElement.style.setProperty("--background-color", "#443627");
            document.documentElement.style.setProperty("--text-color", "white");
            document.documentElement.style.setProperty("--products-background", "oklch(0.374 0.01 67.558)");
            document.documentElement.style.setProperty("--header-background-color", "rgba(59, 59, 59)");
            document.documentElement.style.setProperty("--sub-comments-background", "rgba(80,80,80)");
            document.documentElement.style.setProperty("--skeleton-animation", "oklch(0.400 0.01 67.558)");
            document.documentElement.style.setProperty("--skeleton-container", "oklch(0.390 0.01 67.558)");
        } else {
            document.documentElement.style.setProperty("--background-color", "oklch(0.967 0.003 264.542)");
            document.documentElement.style.setProperty("--text-color", "black");
            document.documentElement.style.setProperty("--products-background", "white");
            document.documentElement.style.setProperty("--header-background-color", "white");
            document.documentElement.style.setProperty("--sub-comments-background", "whitesmoke");
            document.documentElement.style.setProperty("--skeleton-animation", "rgba(220, 220, 220, 0.9)");
            document.documentElement.style.setProperty("--skeleton-container", "rgba(215, 220, 220, 0.9)");
        }
    }, [isThemeLight]);

    return (
        <context.Provider value={{
            userInforms, setUserInformsFlag,
            menues, setMenues, menuesFlag, setMenueFlag,
            newestProducts, setNewestProducts, mostSell, setMostSell,
            twoSideCategories, setTwoSideCategories, twoSideCategoriesFlag, setTwoSideCategoriesFlag,
            cupCategories, setCupCategories, cupCategoriesFlag, setCupCategoriesFlag,
            allComments, setAllComments, allCommentsFlag, setAllCommentsFlag,
            allProducts, setAllProducts, allProductsFlag, setAllProductsFlag, filteredProducts, setFilteredProducts,
            isShowSubCommentsModal, setIsShowSubCommentsModal, isShowCommentsModal, setIsShowCommentsModal,
            userProductsCount, setUserProductsCount, finalPrice, setFinalPrice,
            getAllProductsFromLocalStorage, setGetAllProductsFromLocalStorage,
            grainTypes, setGrainTypes, grainTypesFlag, setGrainTypesFlag,
            brandTypes, setBrandTypes, BrandTypesFlag, setBrandTypesFlag,
            offersTypes, setOffersTypes, OffersTypesFlag, setOffersTypesFlag,
            searchInput, setSearchInput, filterInputMaxNumber, setFilterInputMaxNumber,
            allSubComments, setAllSubComments, allSubCommentsFlag, setAllSubCommentsFlag,
            isThemeLight, setIsThemeLight, offCode, setOffCode, product, setProduct,
            productComments, setProductComments, isOpenHiddenMeues, setIsOpenHiddenMeues,
            isOpenRightSideFilterMenue, setIsOpenRightSideFilterMenue, cafeClub, setCafeClub, cafeClubFlag, setCafeClubFlag,
            passLoginInputType, setPassLoginInputType, isLoginNameValid, setIsLoginNameValid, isLoginFamilyValid, setIsLoginFamilyValid,
            isLoginPassValid, setIsLoginPassValid, isSignupNameValid, setIsSignupNameValid, isSignupFamilyValid, setIsSignupFamilyValid,
            isSignupPassValid, setIsSignupPassValid, isSignupMailValid, setIsSignupMailValid, isSignupPhoneValid, setIsSignupPhoneValid,
            passSignupInputType, setPassSignupInputType,

            allUsers, setAllUsers, allUsersFlag, setAllUsersFlag,
            panelMenus, setPanelMenus, panelMenusFlag, setPanelMenusFlag,
            offersCode, setOffersCode, offersCodeFlag, setOffersCodeFlag,
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
            isShowEditCodeModal, setIsShowEditCodeModal, adminUsers, setAdminUsers,
            editCode, setEditCode, editCodePrecent, setEditCodePrecent, editCodeCreator, setEditCodeCreator,
            editCodeDate, setEditCodeDate, editCodeAmount, setEditCodeAmount, editCodeTimeUsed, setEditCodTimeUsed,
            isShowEditSubCommentsValueModal, setIsShowEditSubCommentsValueModal, texareaSubCommentValue, setTexareaSubCommentValue,
            windowSize, setWindowSize, panelNotices, setPanelNotices, panelNoticesFlag, setPanelNoticesFlag,
            isOpenEditNoticeModal, setIsOpenEditNoticeModal, editNoticeInputValue, setEditNoticeInputValue,
            panelCampains, setPanelCampains, panelCampainsFlag, setPanelCampainsFlag, productsInCampains, setProductsInCampains,
            isOpenEditCampainModal, setIsOpenEditCampainModal, editCampain, setEditCampain, productsInEditCampain, setProductsInEditCampain,
            campainTimerFlag, setCampainTimerFlag, passwordValidation, emailValidation, iranPhoneValidation, nameValidation,

            hiddenMenuRef, hamburgerRef,
        }}>
            {children}

        </context.Provider>
    )
}


