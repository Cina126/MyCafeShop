/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import './PanelCampainComp.css';
import { context } from '../../../Context/Context';
import swal from 'sweetalert';

export default function PanelCampainComp({ id, title, campainOfferPrecent, days, isActive, isLoaded }) {

    const contextUser = useContext(context);
    const [timeLeft, setTimeLeft] = useState({ days: "", hours: "", minutes: "", seconds: "" });
    const [flagTime, setFlagTime] = useState(false)

    async function removeCampainLogic() {
        try {
            const FetchRemove = await fetch(`https://mycafeshop.onrender.com/cafeAPI/panel/campains/removeCampain/${id}`, {
                method: "DELETE"
            })
            const FetchRemoveCampainOffs = await fetch("https://mycafeshop.onrender.com/cafeAPI/panel/campains/editProductsCampainPrecent", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    campainOfferPrecent: 0,
                    productsID: [""]
                })
            })
            if (FetchRemove.ok && FetchRemoveCampainOffs.ok) {
                toast.success("کمپین با موفقیت حذف شد")
                console.log(1);
                contextUser.setPanelCampainsFlag(prev => !prev)
                contextUser.setProductsInCampains([])
            } else {
                toast.error("خطا در حذف کمپین")
            }
        } catch (error) {
            toast.error("خطا در برقراری ارتباط")
        }
    }

    useEffect(() => {
        const diffInMs = new Date(days) - new Date();
        const daysCalc = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) > 0 ? Math.floor(diffInMs / (1000 * 60 * 60 * 24)) : 0;
        const hoursCalc = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) > 0 ? Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : 0;
        const minutesCalc = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)) > 0 ? Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)) : 0;
        const secondsCalc = Math.floor((diffInMs % (1000 * 60)) / 1000) > 0 ? Math.floor((diffInMs % (1000 * 60)) / 1000) : 0;
        if (daysCalc || hoursCalc || minutesCalc || secondsCalc) {
            setTimeLeft({ days: daysCalc, hours: hoursCalc, minutes: minutesCalc, seconds: secondsCalc });
        } else {
            removeCampainLogic()
        }
        const interval = setInterval(() => {
            setFlagTime(prev => !prev)
        });
        return () => clearInterval(interval);
    }, [flagTime])


    async function rmCampainWhenClick() {
        swal({
            title: `کمپین حذف شود ؟`,
            buttons: ["انصراف", "حذف"],
            icon: "warning"
        }).then(async res => {
            if (res) {
                removeCampainLogic()
            }
        })
    }

    function editCampainLogic() {
        contextUser.setIsOpenEditCampainModal(true)
    }

    async function activeCampainLogic() {
        try {
            const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/panel/campains/editCampainActivity/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: Number(!isActive) })
            })
            if (Fetch.ok) {
                contextUser.setPanelCampainsFlag(prev => !prev)
                toast.success('وضعیت کمپین با موفقیت تغییر کرد !')
            } else {
                toast.error("خطا در بر قراری ارتباط با سرور")
            }
        } catch (error) {
            toast.error("خطا در بر قراری ارتباط با سرور")
        }
    }

    if (isLoaded) {
        return (
            <div id={id} className='PanelCampainComp'>
                <span className='PanelCampainComp__Title'>{title}</span>

                <span className='PanelCampainComp__Precent'>% {campainOfferPrecent}</span>

                <div className='PanelCampainComp__Date-Container'>{timeLeft.days}</div>

                <div className='PanelCampainComp__Date-Container'>{timeLeft.hours}</div>

                <div className='PanelCampainComp__Date-Container'>{timeLeft.minutes}</div>

                <div className='PanelCampainComp__Date-Container'>{timeLeft.seconds}</div>

                {
                    isActive
                        ?
                        <button onClick={activeCampainLogic} className='PanelCampainsComp__Btns__Active'>غیر فعال کردن</button>
                        :
                        <button onClick={activeCampainLogic} className='PanelCampainsComp__Btns__Active'>فعال کردن</button>
                }

                <button onClick={editCampainLogic} className='PanelCampainsComp__Btns__Edit'>ویرایش</button>
                <button onClick={rmCampainWhenClick} className='PanelCampainsComp__Btns__Rm'>حذف</button>

            </div>
        )
    } else {
        return (
            <div style={{ backgroundColor: "var(--products-background)" }} id={id} className='PanelCampainComp'>
                <span className='PanelCampainComp__Title skeleton'></span>

                <span className='PanelCampainComp__Precent skeleton'></span>

                <div className='PanelCampainComp__Date-Container skeleton'></div>

                <div className='PanelCampainComp__Date-Container skeleton'></div>

                <div className='PanelCampainComp__Date-Container skeleton'></div>

                <div className='PanelCampainComp__Date-Container skeleton'></div>

                <button className='PanelCampainsComp__Btns__Active skeleton'></button>

                <button className='PanelCampainsComp__Btns__Edit skeleton'></button>
                <button className='PanelCampainsComp__Btns__Rm skeleton'></button>

            </div>
        )
    }


}
