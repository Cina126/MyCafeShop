/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from 'react';
import './PanelUsers.css';

import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders'
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide'
import { context } from '../../../Context/Context';
import PanelUsersComp from '../../../Components/Panel/PanelUsersComp/PanelUsersComp'
import Empty from '../../../Components/Panel/Empty/Empty';
import swal from 'sweetalert';
import toast from 'react-hot-toast'
import IconsComp from '../../../Components/IconsComp/IconsComp';
import LoadingRequest from '../../../Components/LoadingRequest/LoadingRequest';

export default function PanelUsers() {

    const contextUser = useContext(context);

    useEffect(() => {
        contextUser.setAllUsersFlag(prev => !prev);
    }, []);

    useEffect(() => {
        contextUser.setEditUserName(contextUser.isShowEditUserModal.firstName)
        contextUser.setEditUserFamily(contextUser.isShowEditUserModal.lastName)
        contextUser.setEditUserRole(contextUser.isShowEditUserModal.role)
        contextUser.setEditUserEmail(contextUser.isShowEditUserModal.email)
        contextUser.setEditUserDate(contextUser.isShowEditUserModal.dateJoined)
        contextUser.setEditUserPhone(contextUser.isShowEditUserModal.phone)
        contextUser.setEditUserPassword(contextUser.isShowEditUserModal.password)
        contextUser.setEditUserToken(contextUser.isShowEditUserModal.token)
        contextUser.setEditUserIsBlocked(contextUser.isShowEditUserModal.isBlocked)
    }, [contextUser.isShowEditUserModal])

    function editNameLogic(e) { contextUser.setEditUserName(e.target.value) }
    function editFamilyLogic(e) { contextUser.setEditUserFamily(e.target.value) }
    function editRoleLogic(e) { contextUser.setEditUserRole(e.target.value) }
    function editEmailLogic(e) { contextUser.setEditUserEmail(e.target.value) }
    function editDateLogic(e) { contextUser.setEditUserDate(e.target.value) }
    function editPhoneLogic(e) { contextUser.setEditUserPhone(e.target.value) }
    function editPassLogic(e) { contextUser.setEditUserPassword(e.target.value) }
    function editTokenLogic(e) { contextUser.setEditUserToken(e.target.value) }
    function editIsBlockLogic(e) { contextUser.setEditUserIsBlocked(e.target.value) }

    function removeEditUserModal() {
        contextUser.setIsShowEditUserModal({
            situation: false, userID: "", dateJoined: "", email: "", firstName: "", lastName: "", password: "", role: "", isBlocked: "", phone: "", token: ""
        })
    }

    async function submitUserEdition() {
        try {
            if (
                contextUser.editUserName &&
                contextUser.editUserFamily &&
                contextUser.editUserPassword &&
                contextUser.editUserEmail &&
                contextUser.editUserPhone &&
                contextUser.editUserToken &&
                contextUser.editUserRole &&
                contextUser.editUserDate
            ) {
                const datas = {
                    id: null,
                    firstName: contextUser.editUserName,
                    lastName: contextUser.editUserFamily,
                    password: contextUser.editUserPassword,
                    email: contextUser.editUserEmail,
                    phone: contextUser.editUserPhone,
                    token: contextUser.editUserToken,
                    role: contextUser.editUserRole,
                    dateJoined: contextUser.editUserDate,
                    isBlocked: contextUser.editUserIsBlocked,
                }
                contextUser.setIsLoadingRequest(true)
                const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/users/editUser/${contextUser.isShowEditUserModal.userID}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datas)
                });
                if (Fetch.ok) {
                    toast.success("ویرایش اطلاعات کاربر با موفقیت انجام شد");
                    contextUser.setAllUsersFlag(prev => !prev);
                    contextUser.setIsShowEditUserModal({
                        situation: false, userID: "", dateJoined: "", email: "", firstName: "", lastName: "", password: "", role: "", isBlocked: "", phone: "", token: ""
                    })
                }
            } else {
                console.log(contextUser.editUserName,
                    contextUser.editUserFamily,
                    contextUser.editUserPassword,
                    contextUser.editUserEmail,
                    contextUser.editUserPhone,
                    contextUser.editUserToken,
                    contextUser.editUserRole,
                    contextUser.editUserDate);

                toast.error("لطفا فیلد هارو کامل پر کنید")
            }
        } catch (error) {
            console.log(error);
            toast.error("خطا در ویرایش اطلاعات کاربر  ")
        }
        finally {
            contextUser.setIsLoadingRequest(false)
        }
    }

    return (
        <div className='PanelUsers'>

            {/* start add Loading Requerst Component */}
            {contextUser.isLoadingRequest ? <LoadingRequest></LoadingRequest> : ""}
            {/* end add Loading Requerst Component */}

            {contextUser.isShowEditUserModal.situation ?
                <div className='PanelUsers__Edit-User-Modal-Page'>
                    <span onClick={removeEditUserModal} className='PanelUsers__Edit-User-Modal-Page__Remove-Modal'>
                        <IconsComp iconName={"Clear"}></IconsComp>
                    </span>
                    <div className='PanelUsers__Edit-User-Modal-Page__Container'>

                        <input type="text" placeholder='نام کاربر را ویرایش کنید' value={contextUser.editUserName} onChange={editNameLogic} />
                        <input type="text" placeholder='نام خانوادگی کاربر را ویرایش کنید' value={contextUser.editUserFamily} onChange={editFamilyLogic} />
                        <input type="text" placeholder='ایمیل کاربر را ویرایش کنید' value={contextUser.editUserEmail} onChange={editEmailLogic} />
                        <input type="text" placeholder='تاریخ عضویت کاربر را ویرایش کنید' value={contextUser.editUserDate} onChange={editDateLogic} />
                        <input type="text" placeholder='تلفن همراه کاربر را ویرایش کنید' value={contextUser.editUserPhone} onChange={editPhoneLogic} />
                        <input type="text" placeholder='رمز عبور کاربر را ویرایش کنید' value={contextUser.editUserPassword} onChange={editPassLogic} />
                        <input type="text" placeholder='توکن کاربر را ویرایش کنید' value={contextUser.editUserToken} onChange={editTokenLogic} />

                        <div>
                            <span>وضعیت مسدودی کاربر را تعین کنید :</span>
                            <select value={contextUser.editUserIsBlocked} onChange={editIsBlockLogic}>
                                <option value="0"> مسدود نباشه</option>
                                <option value="1">مسدود</option>
                            </select>
                        </div>

                        <div>
                            <span> نقش کاربر را تعین کنید :</span>
                            <select value={contextUser.editUserRole} onChange={editRoleLogic}>
                                <option value="ادمین">ادمین</option>
                                <option value="کاربر">کاربر</option>
                            </select>
                        </div>

                        <button onClick={submitUserEdition}>ثبت تغییرات کاربر</button>

                    </div>
                </div>
                : ""}

            <PanelRightSide></PanelRightSide>
            <div className='PanelUsers__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='PanelUsers__Left-Side__Space'></div>
                <span className='PanelUsers__Left-Side__Title'>لیست کاربران</span>

                {
                    contextUser.allUsers
                        ?
                        contextUser.allUsers?.length
                            ?

                            <div className='PanelUsers__Left-Side__Users-Container'>
                                <div className='PanelUsers__Left-Side__Users-Container__Title'>
                                    <span>نام کاربر</span>
                                    <span>فامیلی کاربر</span>
                                    <span>نقش کاربر</span>
                                    <span>تلفن کاربر</span>
                                    <span>تاریخ عضو کاربر</span>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                {contextUser.allUsers.map((user) => {
                                    return <PanelUsersComp key={user.id} {...user} isLoaded={true}></PanelUsersComp>
                                })}
                            </div>
                            :
                            <Empty></Empty>
                        :
                        <div className='PanelUsers__Left-Side__Users-Container'>
                            <div className='PanelUsers__Left-Side__Users-Container__Title'>
                                <span>نام کاربر</span>
                                <span>فامیلی کاربر</span>
                                <span>نقش کاربر</span>
                                <span>تلفن کاربر</span>
                                <span>تاریخ عضو کاربر</span>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((user) => {
                                return <PanelUsersComp key={user} isLoaded={false}></PanelUsersComp>
                            })}
                        </div>
                }
            </div>
        </div>
    )
}
