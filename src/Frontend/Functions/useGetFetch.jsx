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
                const Fetch = await fetch(`http://localhost:7000/cafeAPI${url}`);
                if (Fetch.ok) {
                    const Json = await Fetch.json();
                    setHook(Json);
                }
            } catch (err) {
                swal({
                    title: `خطا در برقراری ارتباط `,
                    buttons: "تلاش دوباره",
                    icon: "error"
                });
            }
        }
        FETCH()
    }, [flag]);
    return [hook, setHook, flag, setFlag];
}
