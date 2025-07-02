/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { context } from '../../../Context/Context';
import swal from 'sweetalert'
import Main from '../../Shop/Main/Main';
import Page404 from '../../Shop/Page404/Page404';

export default function Private({ children }) {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
    }, [])

    if (contextUser.userInforms?.[0]?.role === "ادمین") {
        return children
    } else {
        console.log(contextUser);
        return <Page404></Page404>
    }
}
