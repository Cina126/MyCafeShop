/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect } from 'react'
import { context } from '../../../Context/Context';
import LoadingUserInforms from './../../../Components/Panel/LoadingUserInforms/LoadingUserInforms';

export default function UserAuth({ children }) {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
        contextUser.setIsOpenHiddenMeues(false)
    }, [])

    if (contextUser.userInforms) {
        return children
    } else {
        return <LoadingUserInforms></LoadingUserInforms>
    }
}
