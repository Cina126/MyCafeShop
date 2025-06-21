import { useContext, useEffect } from 'react'
import './PanelHeaders.css';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { useNavigate } from 'react-router-dom';
import { context } from '../../../Context/Context';

export default function PanelHeaders() {

    const navigate = useNavigate()
    const contextUser = useContext(context)

    useEffect(() => {
        localStorage.setItem("theme", contextUser.isThemeLight)
    }, [contextUser.isThemeLight])

    function changeThemeLogic() {
        if (contextUser.isThemeLight === "false") {
            contextUser.setIsThemeLight("true")
        } else {
            contextUser.setIsThemeLight("false")
        }

    }

    return (
        <div className='PanelHeaders'>
            <div className='PanelHeaders__Right-Side'>
                <span>سید سینا سید رضایی</span>
                <span>برنامه نویس فرانت</span>
            </div>
            <div className='PanelHeaders__Left-Side'>
                <button className='PanelHeaders__Left-Side__Change-Theme' onClick={changeThemeLogic}><Brightness3Icon></Brightness3Icon></button>
                <button className='PanelHeaders__Left-Side__Logout'>خروج از اکانت</button>
                <button onClick={() => { navigate("/") }} className='PanelHeaders__Left-Side__Home'>رفتن به صفحه اصلی</button>
            </div>
        </div>
    )
}
