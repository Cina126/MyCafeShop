/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect } from 'react'
import { context } from '../../../Context/Context';
import Page404 from '../../Shop/Page404/Page404';

export default function Private({ children }) {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
        contextUser.setIsOpenHiddenMeues(false)
    }, [])

    if (contextUser.userInforms?.[0]?.role === "ادمین") {
        return children
    } else {
        return <Page404></Page404>
    }
}
