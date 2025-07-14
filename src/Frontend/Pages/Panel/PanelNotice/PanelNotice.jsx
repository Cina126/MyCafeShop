/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useRef } from 'react'
import './PanelNotice.css';
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders';
import { context } from '../../../Context/Context';
import PanelNoticeComp from '../../../Components/Panel/PanelNotice/PanelNoticeComp';
import Empty from '../../../Components/Panel/Empty/Empty';
import swal from 'sweetalert'

export default function PanelNotice() {

    const contextUser = useContext(context)
    const noticeRefInput = useRef()

    useEffect(() => {
        async function getTitleOfNotice() {
            try {
                const Fetch = await fetch(`http://localhost:7000/cafeAPI/panel/notices/getSingelTitle/${contextUser.isOpenEditNoticeModal.noticeID}`);
                if (Fetch.ok) {
                    const Json = await Fetch.json();
                    contextUser.setEditNoticeInputValue(Json[0].title)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTitleOfNotice()
    }, [contextUser.isOpenEditNoticeModal])

    async function addNewNoticeLogic() {
        try {
            if (noticeRefInput.current.value) {
                const Fetch = await fetch(`http://localhost:7000/cafeAPI/panel/notices/addNewNotice`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: noticeRefInput.current.value })
                });
                if (Fetch.ok) {
                    swal({
                        title: `با موفقیت اطلاعیه ثبت شد`,
                        buttons: "اوکی",
                        icon: "success"
                    }).then(() => {
                        contextUser.setPanelNoticesFlag(prev => !prev)
                        noticeRefInput.current.value = ""
                    })
                }
            } else {
                swal({
                    title: "لطفا مقدار عنوان اطلاعی را وارد کنید",
                    buttons: "اوکی",
                    icon: "warning"
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function editNoticeLogic() {
        try {
            if (contextUser.editNoticeInputValue) {
                const Fetch = await fetch(`http://localhost:7000/cafeAPI/panel/notices/editTitle/${contextUser.isOpenEditNoticeModal.noticeID}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: contextUser.editNoticeInputValue })
                });
                if (Fetch.ok) {
                    swal({
                        title: `با موفقیت اطلاعیه ثبت شد`,
                        buttons: "اوکی",
                        icon: "success"
                    }).then(() => {
                        contextUser.setPanelNoticesFlag(prev => !prev)
                        contextUser.setEditNoticeInputValue("")
                        contextUser.setIsOpenEditNoticeModal({ situation: false, noticeID: "" })
                    })
                }
            } else {
                swal({
                    title: "لطفا مقدار عنوان اطلاعی را وارد کنید",
                    buttons: "اوکی",
                    icon: "warning"
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    function rmEditNoticeModalLogic() {
        contextUser.setIsOpenEditNoticeModal({ situation: false, noticeID: "" })
    }

    function changeEditNoticeInputLogic(e) {
        contextUser.setEditNoticeInputValue(e.target.value)
    }

    return (
        <div className='PanelNotice'>

            {
                contextUser.isOpenEditNoticeModal.situation
                    ?
                    <div className='PanelNotice__Edit-Notice-Modal-Page'>
                        <button onClick={rmEditNoticeModalLogic} className='PanelNotice__Edit-Notice-Modal-Page__Rm-Modal'>بستن مودال</button>
                        <div className='PanelNotice__Edit-Notice-Modal-Page__Container'>
                            <input onChange={changeEditNoticeInputLogic} type="text" value={contextUser.editNoticeInputValue} />
                            <button onClick={editNoticeLogic}>ذخیره اطلاعیه</button>
                        </div>
                    </div>
                    :
                    ""
            }

            <PanelRightSide></PanelRightSide>

            <div className='PanelNotice__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='Space'></div>
                <span className='PanelNotice__Left-Side__Title'>افزودن اطلاعیه جدید</span>

                <div className='PanelNotice__Left-Side__Add-New-Notice'>
                    <input ref={noticeRefInput} type="text" placeholder='متن اطلاعیه را وارد کنید ...' />
                    <button onClick={addNewNoticeLogic}>ثبت اطلاعیه</button>
                </div>

                <div className='PanelNotice__Left-Side__Show-All-Notices'>
                    {contextUser.panelNotices
                        ?
                        contextUser.panelNotices?.length
                            ?
                            contextUser.panelNotices.map(notice => <PanelNoticeComp isLoaded={true} key={notice.id} {...notice}></PanelNoticeComp>)
                            :
                            <Empty></Empty>
                        :
                        [1, 2, 3, 4, 5, 6, 7, 8].map(notice => <PanelNoticeComp isLoaded={false} key={notice} {...notice}></PanelNoticeComp>)}
                </div>
            </div>
        </div >
    )
}
