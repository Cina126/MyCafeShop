/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import './HiddenMenue.css';

// start import componenet 
import HiddenMenuesLinks from './../../../Components/Shop/HiddenMenuesLinks/HiddenMenuesLinks';
import HiddenMenusLinkLoading from './../../../Components/ShopLoading/HiddenMenusLinkLoading/HiddenMenusLinkLoading';
// end import componenet 

// start use other depends 
import { context } from '../../../Context/Context';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
// end use other depends 


export default function HiddenMenue({ style }) {

    const contextUser = useContext(context)
    const navigate = useNavigate()

    window.addEventListener("resize", () => {
        if (window.outerWidth >= 700) {
            contextUser.setIsOpenHiddenMeues(false)
        }
    })

    function remHiddenMenueLogic() {
        contextUser.setIsOpenHiddenMeues(false)
    }

    function logoutLogic() {
        swal({
            title: "آیا میخواهید خارج شوید ؟",
            icon: "warning",
            buttons: [
                "انصراف", "بله"
            ]
        }).then(res => {
            if (res) {
                localStorage.removeItem("Caffe-User-Token");
                contextUser.setUserInformsFlag(prev => !prev);
                contextUser.setIsOpenHiddenMeues(false);
                toast.success("از حساب خود خارج شدید")
            }
        })
    }

    function changeThemeLogic() {
        if (contextUser.isThemeLight === "false") {
            contextUser.setIsThemeLight("true")
        } else {
            contextUser.setIsThemeLight("false")
        }

    }

    return (
        <div ref={contextUser.hiddenMenuRef} className="HiddenMenue" style={style}>
            <span onClick={remHiddenMenueLogic} className="HiddenMenue__rm-Hidden-Menue">بستن منو</span>

            <span onClick={changeThemeLogic} className="HiddenMenue__Icon">
                <Brightness3Icon></Brightness3Icon>
            </span>

            <div className="HiddenMenue__Line"></div>

            {contextUser.menues
                ?
                contextUser.menues.map((menue) => { return <HiddenMenuesLinks key={menue.id} {...menue}></HiddenMenuesLinks> })
                : [1, 2, 3, 4, 5].map((menue) => { return <HiddenMenusLinkLoading key={menue}></HiddenMenusLinkLoading> })}

            {contextUser.userInforms
                ?
                <>
                    {contextUser.userInforms?.length
                        ?
                        <>
                            <div className="HiddenMenue__Line"></div>
                            <button className="HiddenMenue__Logout" onClick={logoutLogic}>خروج از حساب کاربری </button>
                        </>
                        : <HiddenMenuesLinks isLoaded={true} key={0} to={"/Login"} title={"وارد اکانت خود شوید"}></HiddenMenuesLinks>
                    }

                    {(contextUser.userInforms?.[0]?.role === "ادمین")
                        ?
                        <button className="HiddenMenue__Panel" onClick={() => { navigate("/PanelProducts") }}>پنل کاربری</button>
                        : ""
                    }

                </>
                : "Loading ...."
            }

        </div>
    )
}
