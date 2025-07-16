/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import './PanelCampainsComp.css';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

export default function PanelCampainsComp({ id, title, date, campainOfferPrecent }) {

    const [daysLeft, setDaysLeft] = useState(0)
    const [hoursLeft, setHoursLeft] = useState(0)
    const [minutesLeft, setMinutesLeft] = useState(0)
    const [secondsLeft, setSecondsLeft] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(date).getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(timer);
                setDaysLeft(0)
                setHoursLeft(0)
                setMinutesLeft(0)
                setSecondsLeft(0)
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDaysLeft(days)
            setHoursLeft(hours)
            setMinutesLeft(minutes)
            setSecondsLeft(seconds)

        }, 1000);

        return () => clearInterval(timer);
    }, [date]);

    return (
        <div id={id} className='PanelCampainsComp'>
            <span className='PanelCampainsComp__Title'>{title}</span>
            <span className='PanelCampainsComp__Title'>{daysLeft}</span>
            <span className='PanelCampainsComp__Title'>{hoursLeft}</span>
            <span className='PanelCampainsComp__Title'>{minutesLeft}</span>
            <span className='PanelCampainsComp__Title'>{secondsLeft}</span>
            <div className='PanelCampainsComp__Btns'>
                <button className='PanelCampainsComp__Btns__Rm'>حذف</button>
                <button className='PanelCampainsComp__Btns__Active'>فعال کردن</button>
                <button className='PanelCampainsComp__Btns__Edit'>ویرایش</button>
            </div>

        </div>
    )
}
