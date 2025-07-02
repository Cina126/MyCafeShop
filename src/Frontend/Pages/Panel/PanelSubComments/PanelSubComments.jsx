/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react'
import './PanelSubComments.css';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelSubCommentsComp from './../../../Components/Panel/PanelSubComments/PanelSubComments'
import { context } from '../../../Context/Context';
import swal from 'sweetalert';

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
        const datas = {
            commentText: contextUser.texareaSubCommentValue,
        }
        const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/getProductComments/editSubComments/${contextUser.isShowEditSubCommentsValueModal.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datas)
        })
        if (Fetch.ok) {
            swal({
                title: `با موفقیت متن پاسخ کامنت ویرایش شد`,
                buttons: "اوکی",
                icon: "success"
            }).then(res => {
                contextUser.setAllSubCommentsFlag(prev => !prev)
                contextUser.setIsShowEditSubCommentsValueModal({ situation: false, id: "", commentText: "" })
            })
        }
    }

    return (
        <div className='PanelSubComments'>

            {contextUser.isShowEditSubCommentsValueModal.situation ?
                <div className='PanelSubComments__Edit-Comment-Page'>
                    <span onClick={removeEditSubCommentModal}>حذف مودال</span>
                    <textarea value={contextUser.texareaSubCommentValue} onChange={(e) => { contextUser.setTexareaSubCommentValue(e.target.value) }}></textarea>
                    <span onClick={submitEditSubCommentValue}>ثبت تغییرات متن کامنت</span>
                </div>
                : ""}

            <PanelRightSide></PanelRightSide>

            <div className='PanelSubComments__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='Space'></div>
                <span className='PanelSubComments__Left-Side__Title'>پاسخ های ثبت شده برای کامنت ها </span>
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
                    {contextUser.allSubComments?.length ? contextUser.allSubComments.map((code) => {
                        return <PanelSubCommentsComp key={code.id} {...code}></PanelSubCommentsComp>
                    }) : ""}
                </div>

            </div>
        </div>
    )
}
