/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react'
import './PanelSubComments.css';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelSubCommentsComp from './../../../Components/Panel/PanelSubCommentsComp/PanelSubCommentsComp'
import { context } from '../../../Context/Context';
import Empty from './../../../Components/Panel/Empty/Empty';
import toast from 'react-hot-toast'
import IconsComp from '../../../Components/IconsComp/IconsComp';
import LoadingRequest from '../../../Components/LoadingRequest/LoadingRequest';

export default function PanelSubComments() {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setAllSubCommentsFlag(prev => !prev)
    }, []);

    useEffect(() => {
        contextUser.setTexareaSubCommentValue(contextUser.isShowEditSubCommentsValueModal.commentText)
    }, [contextUser.isShowEditSubCommentsValueModal]);


    function removeEditSubCommentModal() {
        contextUser.setIsShowEditSubCommentsValueModal({ situation: false, id: "", commentText: "" })
    }

    async function submitEditSubCommentValue() {
        try {
            if (contextUser.texareaSubCommentValue) {
                const datas = { commentText: contextUser.texareaSubCommentValue, }
                contextUser.setIsLoadingRequest(true)
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/getProductComments/editSubComments/${contextUser.isShowEditSubCommentsValueModal.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datas)
                })
                if (Fetch.ok) {
                    toast.success("با موفقیت پاسخ کامنت ویرایش شد")
                    contextUser.setAllSubCommentsFlag(prev => !prev)
                    contextUser.setIsShowEditSubCommentsValueModal({ situation: false, id: "", commentText: "" })
                } else {
                    toast.error("خطا در ثبت پاسخ  ")
                }
            } else {
                toast.error("لطفا فیلد کامل پر کنید")
            }

        } catch (error) {
            console.log(error);
            toast.error("خطا در ویرایش پاسخ  ")
        }
        finally{
            contextUser.setIsLoadingRequest(false)
        }

    }

    return (
        <div className='PanelSubComments'>

            {/* start add Loading Requerst Component */}
            {contextUser.isLoadingRequest ? <LoadingRequest></LoadingRequest> : ""}
            {/* end add Loading Requerst Component */}

            {contextUser.isShowEditSubCommentsValueModal.situation ?
                <div className='PanelSubComments__Edit-Comment-Page'>
                    <span onClick={removeEditSubCommentModal}>
                        <IconsComp iconName={"Clear"}></IconsComp>
                    </span>
                    <textarea value={contextUser.texareaSubCommentValue} onChange={(e) => { contextUser.setTexareaSubCommentValue(e.target.value) }}></textarea>
                    <button onClick={submitEditSubCommentValue}>ثبت تغییرات متن کامنت</button>
                </div>
                : ""}

            <PanelRightSide></PanelRightSide>

            <div className='PanelSubComments__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='PanelSubComments__Left-Side__Space'></div>
                <span className='PanelSubComments__Left-Side__Title'>پاسخ های ثبت شده برای کامنت ها </span>

                {
                    contextUser.allSubComments
                        ?
                        contextUser.allSubComments?.length
                            ?
                            <div className='PanelSubComments__Left-Side__Show-All-Subcomments'>
                                <div className='PanelSubComments__Left-Side__Show-All-Subcomments__Title'>
                                    <span>نام کاربر</span>
                                    <span>فامیلی کاربر</span>
                                    <span>تاریخ ثبت</span>
                                    <span>برای محصول</span>
                                    <span>برای کاربر</span>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                {contextUser.allSubComments.map((code) => {
                                    return <PanelSubCommentsComp key={code.id} {...code} isLoaded={true}></PanelSubCommentsComp>
                                })}
                            </div>
                            : <Empty></Empty>
                        :
                        <div className='PanelSubComments__Left-Side__Show-All-Subcomments'>
                            <div className='PanelSubComments__Left-Side__Show-All-Subcomments__Title'>
                                <span>نام کاربر</span>
                                <span>فامیلی کاربر</span>
                                <span>تاریخ ثبت</span>
                                <span>برای محصول</span>
                                <span>برای کاربر</span>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((code) => {
                                return <PanelSubCommentsComp key={code} isLoaded={false}></PanelSubCommentsComp>
                            })}
                        </div>
                }

            </div>
        </div>
    )
}
