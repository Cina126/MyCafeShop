/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../Context/Context';
import './PanelCampains.css';

// start import componenets 
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelCampainsComp from './../../../Components/Panel/PanelCampainComp/PanelCampainComp';
import PanelCampainProductsComp from './../../../Components/Panel/PanelCampainProductsComp/PanelCampainProductsComp';
import PanelEditCampainProductsComp from './../../../Components/Panel/PanelEditCampainProductsComp/PanelEditCampainProductsComp';
import LoadingRequest from '../../../Components/LoadingRequest/LoadingRequest';
// end import componenets 

// start import other depends 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import toast from 'react-hot-toast';
import IconsComp from '../../../Components/IconsComp/IconsComp';
import PanelHiddenMenus from '../../../Components/Panel/PanelHiddenMenus/PanelHiddenMenus';
// end import other depends 


export default function PanelCampains() {

    const contextUser = useContext(context)
    const campainPrecent = useRef()
    const campainTitle = useRef()
    const campainDays = useRef()

    const editCampainPrecent = useRef()
    const editCampainTitle = useRef()
    const editCampainDays = useRef()

    useEffect(() => {
        contextUser.setAllProductsFlag(prev => !prev)
        contextUser.setPanelCampainsFlag(prev => !prev)
        contextUser.setAllProductsFlag(prev => !prev)
        contextUser.setIsOpenPanelHiddenMenu(false)
    }, [])

    // start insert modal value
    useEffect(() => {
        const diffMs = new Date(contextUser.panelCampains?.[0]?.days) - new Date()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        contextUser.setEditCampain({
            title: contextUser.panelCampains?.[0]?.title,
            days: +diffDays + 1,
            campainOfferPrecent: contextUser.panelCampains?.[0]?.campainOfferPrecent
        })
    }, [contextUser.isOpenEditCampainModal])
    // end insert modal value


    function chooserChangeHeigthLogic(event) {
        event.currentTarget.parentElement.classList.toggle("longHeight")
    }

    async function submitNewCampainLogic() {
        if (
            campainPrecent.current.value &&
            contextUser.productsInCampains.length &&
            campainTitle.current.value &&
            campainDays.current.value
        ) {
            try {
                contextUser.setIsLoadingRequest(true)
                const FetchCampainPrecentToProd = await fetch("http://localhost:7000/cafeAPI/panel/campains/editProductsCampainPrecent", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        campainOfferPrecent: +campainPrecent.current.value,
                        productsID: contextUser.productsInCampains
                    })
                })

                const FetchCampainCreate = await fetch("http://localhost:7000/cafeAPI/panel/campains/addNewCampain", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: campainTitle.current.value,
                        campainOfferPrecent: +campainPrecent.current.value,
                        days: +campainDays.current.value - 1,
                        isActive: 1
                    })
                })

                if (FetchCampainPrecentToProd.ok && FetchCampainCreate.ok) {
                    toast.success("کمپین با موفقیت ثبت شد")
                    contextUser.setPanelCampainsFlag(prev => !prev)
                    contextUser.setAllProductsFlag(prev => !prev)
                    contextUser.setProductsInCampains([])
                    campainTitle.current.value = ""
                    campainPrecent.current.value = ""
                }
            } catch (error) {
                console.log(error);
                toast.error("خطای ارتباط با سرور")
            }
            finally {
                contextUser.setIsLoadingRequest(false)
            }
        } else {
            toast.error("لطفا فیلد ها و محصولات را به درستی پر کنید")
        }
    }

    function rmEditCampainModalLogic() {
        contextUser.setIsOpenEditCampainModal(false)
    }

    function editTilteLogic(event) {
        contextUser.setEditCampain(prev => ({ ...prev, title: event.target.value }))
    }

    function editCampPrecentLogic(event) {
        contextUser.setEditCampain(prev => ({ ...prev, campainOfferPrecent: event.target.value }))
    }

    function editDaysActiveLogic(event) {
        contextUser.setEditCampain(prev => ({ ...prev, days: event.target.value }))
    }

    function editChooserlongHeightLogic(e) {
        e.currentTarget.parentElement.classList.toggle("longHeightEditCampainsProducst")
        e.currentTarget.parentElement.parentElement.parentElement.classList.toggle("changeFlexEditModalPage")
    }

    async function submitEditCampainLogic() {
        if (
            editCampainTitle.current.value &&
            editCampainPrecent.current.value &&
            editCampainDays.current.value &&
            contextUser.productsInEditCampain.length
        ) {
            try {
                contextUser.setIsLoadingRequest(true)
                const FetchCampainPrecentToProd = await fetch("http://localhost:7000/cafeAPI/panel/campains/editProductsCampainPrecent", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        campainOfferPrecent: +editCampainPrecent.current.value,
                        productsID: contextUser.productsInEditCampain
                    })
                })

                const FetchCampainEdit = await fetch(`http://localhost:7000/cafeAPI/panel/campains/editCampain/${contextUser.panelCampains[0]?.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: editCampainTitle.current.value,
                        campainOfferPrecent: +editCampainPrecent.current.value,
                        days: +editCampainDays.current.value - 1,
                        isActive: 1
                    })
                })

                if (FetchCampainPrecentToProd.ok && FetchCampainEdit.ok) {
                    toast.success("کمپین با موفقیت ویرایش شد")
                    contextUser.setPanelCampainsFlag(prev => !prev)
                    contextUser.setAllProductsFlag(prev => !prev)
                    contextUser.setCampainTimerFlag(prev => !prev)
                    contextUser.setIsOpenEditCampainModal(false)
                    contextUser.setProductsInEditCampain([])
                    editCampainTitle.current.value = ""
                    editCampainPrecent.current.value = ""
                    editCampainDays.current.value = ""
                }
            } catch (error) {
                console.log(error);
                toast.error("خطای ارتباط با سرور")
            }
            finally {
                contextUser.setIsLoadingRequest(false)
            }
        } else {
            toast.error("لطفا فیلد ها و محصولات را به درستی پر کنید")
        }
    }

    return (
        <div className='PanelCampains'>

            {
                contextUser.isOpenPanelHiddenMenu
                    ?
                    <PanelHiddenMenus styles={{ right: "0" }}></PanelHiddenMenus>
                    :
                    <PanelHiddenMenus styles={{ right: "-100%" }}></PanelHiddenMenus>
            }

            {/* start add Loading Requerst Component */}
            {contextUser.isLoadingRequest ? <LoadingRequest></LoadingRequest> : ""}
            {/* end add Loading Requerst Component */}

            {/* start edit campian modal */}
            {
                contextUser.isOpenEditCampainModal
                    ?
                    <div className='PanelCampains__Edit-Campian-Modal-Page'>
                        <span onClick={rmEditCampainModalLogic} className='PanelCampains__Edit-Campian-Modal-Page__Rm-Btn'>
                            <IconsComp iconName={"Clear"}></IconsComp>
                        </span>
                        <div className='PanelCampains__Edit-Campian-Modal-Page-Container'>
                            <span>ویرایش کردن کمپین</span>
                            <input ref={editCampainTitle} onChange={editTilteLogic} type="text" placeholder='عنوان کمپین را ویرایش کنید' value={contextUser.editCampain.title} />
                            <input ref={editCampainPrecent} onChange={editCampPrecentLogic} type="number" placeholder='درصد کمپین را ویرایش کنید' value={contextUser.editCampain.campainOfferPrecent} />
                            <input ref={editCampainDays} onChange={editDaysActiveLogic} type="number" placeholder='روز های فعال کمپین را ویرایش کنید' value={contextUser.editCampain.days} />
                            <div className='PanelCampains__Edit-Campian-Modal-Page-Container__Choose-Products'>
                                <div onClick={editChooserlongHeightLogic} className='PanelCampains__Edit-Campian-Modal-Page-Container__Choose-Products__Title'>
                                    <span>ویرایش محصولات</span>
                                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                </div>
                                {contextUser.allProducts.map(product => <PanelEditCampainProductsComp key={product.id} {...product} isLoaded={true} />)}
                            </div>
                            <button onClick={submitEditCampainLogic} className='PanelCampains__Edit-Campian-Modal-Page-Container__SubmitEditCampain'>ثبت کمپین</button>
                        </div>
                    </div>
                    :
                    ""
            }
            {/* end edit campian modal */}

            <PanelRightSide></PanelRightSide>

            <div className='PanelCampains__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='PanelCampains__Left-Side__Space'></div>

                {
                    contextUser.panelCampains
                        ?
                        contextUser.panelCampains?.length === 0
                            ?
                            <>
                                <span className='PanelCampains__Left-Side__Title'>افزودن کمپین جدید</span>
                                <div className='PanelCampains__Left-Side__Add-New-Campain'>

                                    <input ref={campainTitle} type="text" placeholder='عنوان کمپین را وارد کنید ...' required />
                                    <input ref={campainDays} type="number" placeholder='مدت زمان کمپین را وارد کنید ...' required />
                                    <input ref={campainPrecent} type="number" placeholder=' درصد تخفیف کمپین را وارد کنید ...' required />

                                    <div className='PanelCampains__Left-Side__Add-New-Campain__Choose-Products'>
                                        <div onClick={chooserChangeHeigthLogic} className='PanelCampains__Left-Side__Add-New-Campain__Choose-Products__Title'>
                                            انتخاب محصولات
                                            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                        </div>
                                        {
                                            contextUser.allProducts
                                                ?
                                                contextUser.allProducts.map(product => <PanelCampainProductsComp isLoaded={true} key={product.id} {...product} />)
                                                :
                                                [1, 2, 3, 4, 5].map(product => <PanelCampainProductsComp isLoaded={false} key={product.id} {...product} />)
                                        }
                                    </div>

                                    <button onClick={submitNewCampainLogic}>ثبت کمپین</button>

                                </div>
                            </>
                            :
                            <>
                                <span className='PanelCampains__Left-Side__Title'>کمپین های ایجاد شده </span>
                                <div className='PanelCampains__Left-Side__All-Campains'>
                                    {contextUser.panelCampains.map(campain => <PanelCampainsComp key={campain.id} isLoaded={true} {...campain}></PanelCampainsComp>)}
                                </div>
                            </>
                        :
                        <>
                            <span className='PanelCampains__Left-Side__Title'>کمپین های ایجاد شده </span>
                            <div className='PanelCampains__Left-Side__All-Campains'>
                                {[1, 2, 3].map(campain => <PanelCampainsComp key={campain} days={new Date().setDate(new Date().getDay() + 1)} isLoaded={false}></PanelCampainsComp>)}
                            </div>
                        </>
                }

            </div>
        </div>
    )
}
