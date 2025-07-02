/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import './PanelOffCodes.css';
import swal from 'sweetalert';
import { context } from '../../../Context/Context';

export default function PanelOffCodes({ id, code, precent, amount, timeUsed, dateCreated, creator }) {

    const contextUser = useContext(context)

    function editeOffCodeLogic() {
        contextUser.setIsShowEditCodeModal({
            situation: true, id, code, precent, amount, timeUsed, dateCreated, creator
        })
    }

    async function deleteOffCodeLogic() {
        swal({
            title: `کد تخفیف حذف شود ؟`,
            buttons: ["انصراف", "حذف"],
            icon: "warning"
        }).then(async res => {
            if (res) {
                try {
                    const Fetch = await fetch(`http://localhost:7000/cafeAPI/offCodes/deleteOffCode/${id}`, {
                        method: "DELETE"
                    })
                    if (Fetch.ok) {
                        swal({
                            title: `کد تخفیف با موفقیت پاک شد`,
                            buttons: "باشه",
                            icon: "success"
                        }).then(res => contextUser.setOffersCodeFlag(prev => !prev))
                    }
                } catch (error) {
                    swal({
                        title: `خطا در برقراری ارتباط `,
                        buttons: "تلاش دوباره",
                        icon: "error"
                    })
                }
            }
        })

    }

    return (
        <div id={id} className='PanelOffCodes'>
            <span>{code}</span>
            <span>{precent}%</span>
            <span>{amount}</span>
            <span>{timeUsed}</span>
            <span>{creator}</span>
            <span>{dateCreated}</span>
            <button onClick={deleteOffCodeLogic}>حذف </button>
            <button onClick={editeOffCodeLogic}>ویرایش</button>
        </div>
    )
}
