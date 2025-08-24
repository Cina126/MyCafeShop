/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useRef } from 'react'
import './PanelNotice.css';
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders';
import { context } from '../../../Context/Context';
import PanelNoticeComp from '../../../Components/Panel/PanelNotice/PanelNoticeComp';
import toast from 'react-hot-toast'

export default function PanelNotice() {

    const contextUser = useContext(context)
    const noticeRefInput = useRef()

    useEffect(() => {
        contextUser.setPanelNoticesFlag(prev => !prev)
    }, [])

    useEffect(() => {
        async function getTitleOfNotice() {
            if (contextUser.isOpenEditNoticeModal.noticeID) {
                try {
                    const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/panel/notices/getSingelTitle/${contextUser.isOpenEditNoticeModal.noticeID}`);
                    if (Fetch.ok) {
                        const Json = await Fetch.json();
                        contextUser.setEditNoticeInputValue(Json[0].title)
                    } else {
                        console.log(Fetch);
                    }
                } catch (error) {
                    toast.error("خطای برقراری ارتباط با سرور")
                }
            }

        }
        getTitleOfNotice()
    }, [contextUser.isOpenEditNoticeModal])

    async function addNewNoticeLogic() {
        try {
            if (noticeRefInput.current.value) {
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/panel/notices/addNewNotice`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: noticeRefInput.current.value })
                });
                if (Fetch.ok) {
                    toast.success("با موفقیت اطلاعیه ثبت شد")
                    contextUser.setPanelNoticesFlag(prev => !prev)
                    noticeRefInput.current.value = ""
                }
            } else {
                toast.error("لطفا عنوان اطلاعیه را وارد کنید");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function editNoticeLogic() {
        try {
            if (contextUser.editNoticeInputValue) {
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/panel/notices/editTitle/${contextUser.isOpenEditNoticeModal.noticeID}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: contextUser.editNoticeInputValue })
                });
                if (Fetch.ok) {
                    toast.success("با موفقیت اطلاعیه ویرایش شد");
                    contextUser.setPanelNoticesFlag(prev => !prev)
                    contextUser.setEditNoticeInputValue("")
                    contextUser.setIsOpenEditNoticeModal({ situation: false, noticeID: "" })
                }
            } else {
                toast.error("لطفا عنوان اطلاعیه را وارد کنید");
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

                {
                    contextUser.panelNotices
                        ?
                        contextUser.panelNotices?.length === 0
                            ?
                            <>
                                <span className='PanelNotice__Left-Side__Title'>افزودن اطلاعیه جدید</span>

                                <div className='PanelNotice__Left-Side__Add-New-Notice'>
                                    <input ref={noticeRefInput} type="text" placeholder='متن اطلاعیه را وارد کنید ...' />
                                    <button onClick={addNewNoticeLogic}>ثبت اطلاعیه</button>
                                </div>
                            </>
                            :
                            <>
                                <span className='PanelNotice__Left-Side__Title'>اطلاعات اطلاعیه ساخته شده</span>
                                <div className='PanelNotice__Left-Side__Show-All-Notices'>
                                    {contextUser.panelNotices.map(notice => <PanelNoticeComp isLoaded={true} key={notice.id} {...notice}></PanelNoticeComp>)}
                                </div>
                            </>
                        :
                        <>
                            <span className='PanelNotice__Left-Side__Title'>اطلاعات اطلاعیه ساخته شده</span>
                            <div className='PanelNotice__Left-Side__Show-All-Notices'>
                                {[1, 2, 3, 4].map(notice => <PanelNoticeComp isLoaded={false} key={notice} {...notice}></PanelNoticeComp>)}
                            </div>
                        </>
                }

            </div>
        </div >
    )
}
