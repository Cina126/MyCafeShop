/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import './PanelOffersComp.css';
import swal from 'sweetalert';
import { context } from '../../../Context/Context';
import toast from 'react-hot-toast';

export default function PanelOffersComp({ id, code, precent, amount, timeUsed, dateCreated, creator, isLoaded }) {

    const contextUser = useContext(context)

    function editeOffCodeLogic() {
        contextUser.setIsShowEditCodeModal({
            situation: true, id, code, precent, amount, timeUsed, dateCreated, creator
        })
    }

    async function deleteOffCodeLogic() {
        swal({
            title: `کد تخفیف حذف شود ؟`,
            icon: "warning",
            buttons: {
                cancel: "انصراف",
                confirm: {
                    text: "حذف",
                    value: true,
                    visible: true,
                    className: "swal-red-btn"
                },
            }

        }).then(async res => {
            if (res) {
                try {
                    const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/offCodes/deleteOffCode/${id}`, {
                        method: "DELETE"
                    })
                    if (Fetch.ok) {
                        toast.success("کد تخفیف با موفقیت پاک شد")
                        contextUser.setOffersCodeFlag(prev => !prev)
                    }
                } catch (error) {
                    toast.error("خطا در برقراری ارتباط ")
                }
            }
        })

    }

    if (isLoaded) {
        return (
            <div id={id} className='PanelOffersComp'>
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
    } else {
        return (
            <div id={id} className='PanelOffersComp'>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <span className='skeleton'></span>
                <button className='skeleton' ></button>
                <button className='skeleton'></button>
            </div>
        )
    }

}
