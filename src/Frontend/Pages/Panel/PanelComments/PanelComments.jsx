/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useContext } from 'react'
import './PanelComments.css';
import PanelHeaders from './../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from './../../../Components/Panel/PanelRightSide/PanelRightSide'
import context from '../../../Context/Context';
import PanelCommentsComp from './../../../Components/Panel/PanelComments/PanelComments';
import swal from 'sweetalert';
import Empty from './../../../Components/Panel/Empty/Empty'

export default function PanelComments() {

    const contextUser = useContext(context);

    useEffect(() => { contextUser.setAllCommentsFlag(prev => !prev) }, []);
    useEffect(() => { contextUser.setEditCommentValue(contextUser.isShowEditCommentValue.commentText) }, [contextUser.isShowEditCommentValue]);
    useEffect(() => {
        contextUser.setVerifyedComment(() => {
            return contextUser.allComments?.filter((comment) => {
                return +comment?.isVerifyed === 0
            })
        })
    }, [contextUser.allComments]);

    function editCommentValue(event) {
        contextUser.setEditCommentValue(event.target.value);
    }

    function removeEditCommentModal() {
        contextUser.setisShowEditCommentValue({ situation: false, commentID: "", commentText: "" })
    }

    async function submitEditCommentValue() {
        const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/editProductCommentsValue/${contextUser.isShowEditCommentValue.commentID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: contextUser.editCommentValue })
        });
        if (Fetch.ok) {
            swal({
                title: `با موفقیت متن کامنت ویرایش شد`,
                buttons: "اوکی",
                icon: "success"
            }).then(res => {
                contextUser.setAllCommentsFlag(prev => !prev)
                contextUser.setisShowEditCommentValue({ situation: false, commentID: "", commentText: "" })
            })
        }
    }

    return (
        <div className='PanelComments'>

            {contextUser.isShowEditCommentValue.situation ?
                <div className='PanelComments__Edit-Comment-Page'>
                    <span onClick={removeEditCommentModal}>حذف مودال</span>
                    <textarea value={contextUser.editCommentValue} onChange={editCommentValue}></textarea>
                    <span onClick={submitEditCommentValue}>ثبت تغییرات متن کامنت</span>
                </div>
                : ""}

            <PanelRightSide></PanelRightSide>
            <div className='PanelComments__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='Space'></div>
                <span className='PanelComments__Left-Side__Title'>کامنت های محصولات</span>

                {
                    contextUser.verifyedComment?.length ?
                        <div className='PanelComments__Left-Side__Comments-Container'>

                            <div className='PanelComments__Left-Side__Comments-Container__Title'>
                                <span className="PanelComments__Left-Side__Comments-Container__Title__FirstName">نام کاربر</span>
                                <span className="PanelComments__Left-Side__Comments-Container__Title__LastName">فامیلی کاربر</span>
                                <span className="PanelComments__Left-Side__Comments-Container__Title__Date">تاریخ کامنت</span>
                                <span className="PanelComments__Left-Side__Comments-Container__Title__Date__Product-Name">برای محصول</span>
                                <div className='PanelComments__Left-Side__Comments-Container__Title__Short-Btn'></div>
                                <div className='PanelComments__Left-Side__Comments-Container__Title__Short-Btn'></div>
                                <div className='PanelComments__Left-Side__Comments-Container__Title__Long-Btn'></div>
                            </div>

                            {contextUser.verifyedComment.map((comment) => {
                                return <PanelCommentsComp key={comment.id} {...comment}></PanelCommentsComp>
                            })}

                        </div>
                        : <Empty></Empty>
                }

            </div>
        </div>
    )
}
