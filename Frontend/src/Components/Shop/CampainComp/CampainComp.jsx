/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react'
import './CampainComp.css';
import { context } from '../../../Context/Context';
import toast from 'react-hot-toast';
import swal from 'sweetalert'

export default function CampainComp({ id, title, campainOfferPrecent, days, isActive }) {

    const contextUser = useContext(context)
    const [futureDate] = useState(new Date(days));
    const [nowDate, setNowDate] = useState(new Date());
    const [timeLeft, setTimeLeft] = useState({ days: "", hours: "", minutes: "", seconds: "" });

    useEffect(() => {
        async function calculateDateDiff() {
            const now = new Date();
            setNowDate(now);
            const diffInMs = futureDate - now;
            const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) > 0 ? Math.floor(diffInMs / (1000 * 60 * 60 * 24)) : 0;
            const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) > 0 ? Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : 0;
            const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)) > 0 ? Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)) : 0;
            const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000) > 0 ? Math.floor((diffInMs % (1000 * 60)) / 1000) : 0;
            if (days || hours || minutes || seconds) {
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                removeCampainLogic()
            }
        }
        calculateDateDiff()
        const interval = setInterval(() => {
            calculateDateDiff()
        }, 1000);
        return () => clearInterval(interval);
    }, [futureDate]);

    async function removeCampainLogic() {
        try {
            const FetchRemove = await fetch(`http://localhost:7000/cafeAPI/panel/campains/removeCampain/${id}`, {
                method: "DELETE"
            })
            const FetchRemoveCampainOffs = await fetch("http://localhost:7000/cafeAPI/panel/campains/editProductsCampainPrecent", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    campainOfferPrecent: 0,
                    productsID: [""]
                })
            })
            if (FetchRemove.ok && FetchRemoveCampainOffs.ok) {
                contextUser.setPanelCampainsFlag(prev => !prev)
                contextUser.setProductsInCampains([])
            }
        } catch (error) {
            toast.error("خطا در برقراری ارتباط")
        }
    }

    if (isActive) {
        return (
            <div className='CampainComp' id={id}>

                <div className='CampainComp__Top'>
                    <span className='CampainComp__Top__Title'>{title}</span>
                </div>

                <div className='CampainComp__Bott'>
                    <div className='CampainComp__Bott__Date-Container'>
                        <span className='CampainComp__Bott__Date-Container__Counter'>{timeLeft.days}</span>
                        <span className='CampainComp__Bott__Date-Container__Remain-Shower'>روز باقی مونده</span>
                    </div>

                    <div className='CampainComp__Bott__Date-Container'>
                        <span className='CampainComp__Bott__Date-Container__Counter'>{timeLeft.hours}</span>
                        <span className='CampainComp__Bott__Date-Container__Remain-Shower'>ساعت باقی مونده</span>
                    </div>

                    <div className='CampainComp__Bott__Date-Container'>
                        <span className='CampainComp__Bott__Date-Container__Counter'>{timeLeft.minutes}</span>
                        <span className='CampainComp__Bott__Date-Container__Remain-Shower'>دقیقه باقی مونده</span>
                    </div>

                    <div className='CampainComp__Bott__Date-Container'>
                        <span className='CampainComp__Bott__Date-Container__Counter'>{timeLeft.seconds}</span>
                        <span className='CampainComp__Bott__Date-Container__Remain-Shower'>ثانیه باقی مونده</span>
                    </div>
                </div>

            </div>
        )
    } else {
        return ""
    }

}
