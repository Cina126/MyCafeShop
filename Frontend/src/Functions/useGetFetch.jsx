/* eslint-disable no-self-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react'
import swal from 'sweetalert';

export default function useGetFetch(url) {

    const [hook, setHook] = useState();
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        async function FETCH() {
            try {
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI${url}`)
                if (Fetch.ok) {
                    const Json = await Fetch.json()
                    setHook(Json);
                }
            } catch (err) {
                console.log(err);
                swal({
                    title: `خطا در برقراری ارتباط `,
                    buttons: "تلاش دوباره",
                    icon: "error",
                }).then(res => window.location.href = window.location.href)
            }
        }
        FETCH()
    }, [flag]);
    return [hook, setHook, flag, setFlag];
}
