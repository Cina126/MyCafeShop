/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import context from '../../../Context/Context';
import swal from 'sweetalert'

export default function Private({ children }) {

    const contextUser = useContext(context);

    const [hook, setHook] = useState();

    return children
}
