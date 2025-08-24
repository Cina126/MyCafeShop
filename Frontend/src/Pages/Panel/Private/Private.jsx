/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect } from 'react'
import { context } from '../../../Context/Context';
import Page404 from '../../Shop/Page404/Page404';
import LoadingUserInforms from './../../../Components/Panel/LoadingUserInforms/LoadingUserInforms'

export default function Private({ children }) {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
        contextUser.setIsOpenHiddenMeues(false)
    }, [])

    if (contextUser.userInforms) {
        if (contextUser.userInforms.length && contextUser.userInforms[0].role === "ادمین") {
            return children
        } else {
            return <Page404></Page404>
        }
    } else {
        return <LoadingUserInforms></LoadingUserInforms>
    }
}
