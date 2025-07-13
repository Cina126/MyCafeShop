import React from 'react'
import './PanelNotice.css';

export default function PanelNotice({ id, title, isActive, isLoaded }) {

    async function activationNoticeLogic() { }
    async function deleteNoticeLogic() { }
    async function editNoticeLogic() { }
    
    return (
        <div className='PanelNotice' id={id}>
            <span>{title}</span>
            <button onClick={activationNoticeLogic}>غیر فعال کردن</button>
            <button onClick={deleteNoticeLogic}>حذف</button>
            <button onClick={editNoticeLogic}>ویرایش</button>
        </div>
    )
}
