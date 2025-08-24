/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useContext, useRef } from 'react'
import './PanelOffers.css';

import { context } from '../../../Context/Context';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelOffersComp from './../../../Components/Panel/PanelOffersComp/PanelOffersComp'
import swal from 'sweetalert';
import Empty from './../../../Components/Panel/Empty/Empty';
import toast from 'react-hot-toast'

export default function PanelOffers() {

    const contextUser = useContext(context);
    const codeName = useRef()
    const codePrecent = useRef()
    const codeAmount = useRef()

    useEffect(() => {
        contextUser.setOffersCodeFlag(prev => !prev);
    }, []);

    //start give users that are admin
    useEffect(() => {
        const allUsers = contextUser.allUsers?.length ? contextUser.allUsers : []
        contextUser.setAdminUsers(() => {
            return [...allUsers].filter((user) => {
                return user.role === "ادمین"
            });
        })
    }, [contextUser.allUsers, contextUser.isShowEditCodeModal]);
    //end give users that are admin

    // start insert edit modal values 
    useEffect(() => {
        contextUser.setEditCode(contextUser.isShowEditCodeModal.code)
        contextUser.setEditCodePrecent(contextUser.isShowEditCodeModal.precent)
        contextUser.setEditCodeAmount(contextUser.isShowEditCodeModal.amount)
        contextUser.setEditCodTimeUsed(contextUser.isShowEditCodeModal.timeUsed)
        contextUser.setEditCodeDate(contextUser.isShowEditCodeModal.dateCreated)
        contextUser.setEditCodeCreator(contextUser.isShowEditCodeModal.creator)
    }, [contextUser.isShowEditCodeModal])
    // end insert edit modal values 

    async function sumbitNewOffCode() {
        if (
            codeName.current.value &&
            codePrecent.current.value &&
            codeAmount.current.value
        ) {
            try {
                const datas = {
                    code: codeName.current.value,
                    precent: codePrecent.current.value,
                    amount: codeAmount.current.value,
                    dateCreated: new Date().toLocaleDateString("fa-Ir"),
                    creator: contextUser.userInforms[0].firstName + " " + contextUser.userInforms[0].lastName
                }
                const Fetch = await fetch("https://mycafeshop.onrender.com/cafeAPI/offCodes/addNewOffCode", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datas)
                });
                if (Fetch.ok) {
                    toast.success("ثبت کد تخفیف با موفقیت انجام شد");
                    contextUser.setOffersCodeFlag(prev => !prev);
                    codeName.current.value = ""
                    codePrecent.current.value = ""
                    codeAmount.current.value = ""
                }
            } catch (error) {

            }
        } else {
            toast.error("لطفا فیلد ها رو به درستی پر کنید");
        }

    }

    function closeEditCodeModalLogic() {
        contextUser.setIsShowEditCodeModal({
            situation: false, id: "", code: "", precent: "", amount: "", timeUsed: "", dateCreated: "", creator: ""
        })
    }

    async function submitCodeEdition() {
        if (
            contextUser.editCode.toString() &&
            contextUser.editCodePrecent.toString() &&
            contextUser.editCodeAmount.toString() &&
            contextUser.editCodeTimeUsed.toString() &&
            contextUser.editCodeDate.toString() &&
            contextUser.editCodeCreator.toString()
        ) {
            const datas = {
                id: null,
                code: contextUser.editCode,
                precent: +contextUser.editCodePrecent,
                amount: +contextUser.editCodeAmount,
                timeUsed: +contextUser.editCodeTimeUsed,
                dateCreated: contextUser.editCodeDate,
                creator: contextUser.editCodeCreator,
            }
            try {
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/offCodes/updateOffCode/${contextUser.isShowEditCodeModal.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datas)
                })
                if (Fetch.ok) {
                    toast.success("ویرایش کد تخفیف با موفقیت انجام شد");
                    contextUser.setOffersCodeFlag(prev => !prev)
                    contextUser.setIsShowEditCodeModal({
                        situation: false, id: "", code: "", precent: "", amount: "", timeUsed: "", dateCreated: "", creator: ""
                    })
                }
            } catch (error) {
                toast.success("خطا در ویرایش اطلاعات کد تخفیف");
            }
        } else {
            toast.error("لطفا فیلد ها رو به درستی پر کنید");
        }
    }

    return (
        <div className='PanelOffers'>

            {contextUser.isShowEditCodeModal.situation ?
                <div className='PanelOffers__Edit-Code-Modal-Page'>
                    <span onClick={closeEditCodeModalLogic} className='PanelOffers__Edit-Code-Modal-Page__Delete-Modal'>بستن مودال</span>

                    <div className='PanelOffers__Edit-Code-Modal-Page__Container'>
                        <input type="text" min={0} placeholder='تغییر کد تخفیف :' value={contextUser.editCode} onChange={(e) => { contextUser.setEditCode(e.target.value) }} />
                        <input type="number" min={0} max={100} placeholder='تغییر درصد تخفیف :' value={contextUser.editCodePrecent} onChange={(e) => { contextUser.setEditCodePrecent(e.target.value) }} />
                        <input type="number" min={0} placeholder='تغییر مقدار تخفیف :' value={contextUser.editCodeAmount} onChange={(e) => { contextUser.setEditCodeAmount(e.target.value) }} />
                        <input type="number" min={0} placeholder='تغییر تعداد استفاده تخفیف :' value={contextUser.editCodeTimeUsed} onChange={(e) => { contextUser.setEditCodTimeUsed(e.target.value) }} />
                        <input type="text" min={0} placeholder='تغییر تاریخ تخفیف :' value={contextUser.editCodeDate} onChange={(e) => { contextUser.setEditCodeDate(e.target.value) }} />
                        <div className='PanelOffers__Edit-Code-Modal-Page__Code-Creator'>
                            <span>سازنده کد را وارد کنید :</span>
                            <select onChange={(e) => { contextUser.setEditCodeCreator(e.target.value) }} value={contextUser.editCodeCreator}>
                                {contextUser.adminUsers.map((adminUser) => { return <option key={adminUser.id} value={adminUser.firstName + " " + adminUser.lastName}>{adminUser.firstName + " " + adminUser.lastName}</option> })}
                            </select>
                        </div>
                        <button onClick={submitCodeEdition}>ثبت تغییرات</button>
                    </div>

                </div>
                : ""
            }

            <PanelRightSide></PanelRightSide>

            <div className='PanelOffers__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='Space'></div>
                <span className='PanelOffers__Left-Side__Title'>افزودن کد تخفیف جدید</span>

                <div className='PanelOffers__Add-New-Code'>
                    <input ref={codeName} type="text" placeholder='کد تخفیف را وارد کنید :' />
                    <input ref={codePrecent} type="text" placeholder='درصد تخفیف را وارد کنید ' />
                    <input ref={codeAmount} type="text" placeholder='تعداد استفاده کد را وارد کنید' />
                    <button onClick={sumbitNewOffCode}>ثبت کد</button>
                </div>

                {contextUser.offersCode
                    ?
                    contextUser.offersCode?.length
                        ?
                        <div className='PanelOffers__Show-All-Codes'>
                            <div className='PanelOffers__Show-All-Codes__Title'>
                                <span>کد تخفیف</span>
                                <span>درصد</span>
                                <span>مقدار</span>
                                <span>استفاده </span>
                                <span>سازنده </span>
                                <span>تاریخ</span>
                                <div></div>
                                <div></div>
                            </div>
                            {contextUser.offersCode.map((code) => {
                                console.log(code);
                                return <PanelOffersComp key={code.id} {...code} isLoaded={true}></PanelOffersComp>
                            })}
                        </div>
                        :
                        <Empty></Empty>
                    :
                    <div className='PanelOffers__Show-All-Codes'>
                        <div className='PanelOffers__Show-All-Codes__Title'>
                            <span>کد تخفیف</span>
                            <span>درصد</span>
                            <span>مقدار</span>
                            <span>تعداد </span>
                            <span>سازنده </span>
                            <span>تاریخ</span>
                            <div></div>
                            <div></div>
                        </div>
                        {[1, 2, 3, 4].map((code) => {
                            return <PanelOffersComp key={code} isLoaded={false}></PanelOffersComp>
                        })}
                    </div>
                }

            </div>
        </div>
    )
}
