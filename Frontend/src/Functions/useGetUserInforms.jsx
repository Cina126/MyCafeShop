/* eslint-disable no-self-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import swal from 'sweetalert';

export default function useGetUserInforms(url) {

    const [userInforms, setUserInforms] = useState();
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        const localStorageToken = localStorage.getItem("Caffe-User-Token")
        async function getFetch() {
            try {
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/users${url}`, { headers: { authorization: localStorageToken } });
                if (Fetch.ok) {
                    const Json = await Fetch.json()
                    setUserInforms(Json);
                } else {
                    swal({
                        title: `خطا در دریافت اطلاعات `,
                        buttons: "تلاش دوباره",
                        icon: "error"
                    }).then(res => window.location.href = window.location.href)
                }
            } catch (error) {
                console.log(error);
                swal({
                    title: `خطا در دیافت اطلاعات کاربر `,
                    buttons: "تلاش دوباره",
                    icon: "error"
                }).then(res => window.location.href = window.location.href)
            }
        }
        getFetch()
    }, [flag])

    return [userInforms, setFlag]
}
