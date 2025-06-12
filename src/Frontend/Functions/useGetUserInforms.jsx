/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function useGetUserInforms(url) {

    const [userInforms, setUserInforms] = useState();
    const [flag , setFlag] = useState(false)

    useEffect(() => {
        const localStorageToken = localStorage.getItem("Caffe-User-Token")
        async function getFetch() {
            try {
                const Fetch = await fetch(`http://localhost:7000/cafeAPI/users${url}`, { headers: { authorization: localStorageToken } });
                if (Fetch.ok) {
                    const Json = await Fetch.json()
                    setUserInforms(Json);
                    // console.log(Json);
                } else {
                    swal({
                        title: `خطا در دیافت اطلاعات `,
                        buttons: "تلاش دوباره",
                        icon: "error"
                    })
                }
            } catch (error) {
                swal({
                    title: `خطا در دیافت اطلاعات کاربر `,
                    buttons: "تلاش دوباره",
                    icon: "error"
                });
            }
        }
        getFetch()
    }, [flag])

    return [userInforms , setFlag]
}
