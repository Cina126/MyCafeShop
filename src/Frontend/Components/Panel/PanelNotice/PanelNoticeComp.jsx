/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from 'react'
import './PanelNoticeComp.css';
import { context } from '../../../Context/Context';
import swal from 'sweetalert'

export default function PanelNoticeComp({ id, title, isActive, isLoaded }) {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setPanelNoticesFlag(prev => !prev)
    }, [])

    async function activationNoticeLogic() {
        try {
            const Fetch = await fetch(`http://localhost:7000/cafeAPI/panel/notices/editActivition/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: Number(!isActive) })
            });
            if (Fetch.ok) {
                swal({
                    title: `با موفقیت اطلاعیه فعال / غیر فعال شد`,
                    buttons: "اوکی",
                    icon: "success"
                }).then(() => contextUser.setPanelNoticesFlag(prev => !prev))
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteNoticeLogic() {
        try {
            swal({
                title: "از حذف اطلاعیه اطمینان دارید ؟",
                buttons: ["انصراف", "حذف"],
                icon: "warning"
            }).then(async (res) => {
                if (res) {
                    const Fetch = await fetch(`http://localhost:7000/cafeAPI/panel/notices/deleteNotice/${id}`, {
                        method: "DELETE",
                    });
                    if (Fetch.ok) {
                        swal({
                            title: `با موفقیت اطلاعیه ویرایش شد`,
                            buttons: "اوکی",
                            icon: "success"
                        }).then(() => contextUser.setPanelNoticesFlag(prev => !prev))
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    function editNoticeLogic() {
        contextUser.setIsOpenEditNoticeModal({ situation: true, noticeID: id })
    }

    if (isLoaded) {
        return (
            <div className='PanelNoticeComp' id={id}>
                <span className='PanelNoticeComp__Title'>{title}</span>
                <div className='PanelNoticeComp__Title__Btns'>
                    {isActive ? <button className='PanelNoticeComp__Title__Btns__Active' onClick={activationNoticeLogic}>غیر فعال کردن</button> : <button className='PanelNoticeComp__Title__Btns__Active' onClick={activationNoticeLogic}> فعال کردن</button>}
                    <button className='PanelNoticeComp__Title__Btns__Rm' onClick={deleteNoticeLogic}>حذف</button>
                    <button className='PanelNoticeComp__Title__Btns__Edit' onClick={editNoticeLogic}>ویرایش</button>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ backgroundColor: "var(--products-background)" }} className='PanelNoticeComp' id={id}>
                <div className='PanelNoticeComp__Title skeleton'></div>
                <div className='PanelNoticeComp__Title__Btns'>
                    <div className='PanelNoticeComp__Title__Btns__Active skeleton'></div>
                    <div className='PanelNoticeComp__Title__Btns__Rm skeleton'></div>
                    <div className='PanelNoticeComp__Title__Btns__Edit skeleton'></div>
                </div>
            </div>
        )
    }

}
