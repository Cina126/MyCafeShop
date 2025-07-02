import React, { useContext } from 'react'
import './PanelUsers.css';
import {context} from '../../../Context/Context';
import swal from 'sweetalert';

export default function PanelUsers({ dateJoined, email, id, firstName, lastName, password, role, isBlocked, phone, token }) {

  const contextUser = useContext(context);

  async function unBlockUserLogic() {
    const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/editUserVerify/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBlocked })
    });
    if (Fetch.ok) {
      swal({
        title: `با موفقیت کاربر از مسدودی خارج شد`,
        buttons: "اوکی",
        icon: "success"
      }).then(() => contextUser.setAllUsersFlag(prev => !prev))
    }
  }

  async function blockUserLogic() {
    const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/editUserVerify/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBlocked })
    });
    if (Fetch.ok) {
      swal({
        title: `با موفقیت کاربر مسدود شد`,
        buttons: "اوکی",
        icon: "success"
      }).then(() => contextUser.setAllUsersFlag(prev => !prev))
    }
  }

  async function removeUserLogic() {
    swal({
      title: "از حذف کامنت اطمینان دارید ؟",
      buttons: ["انصراف", "حذف"],
      icon: "warning"
    })
      .then(async (res) => {
        if (res) {
          const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/deleteUser/${id}`, {
            method: "DELETE"
          });
          if (Fetch.ok) {
            swal({
              title: `با موفقیت کاربر حذف شد`,
              buttons: "اوکی",
              icon: "success"
            }).then(() => contextUser.setAllUsersFlag(prev => !prev))
          }
        }
      })
  }

  async function editUserLogic() {
    contextUser.setIsShowEditUserModal({
      situation: true, userID: id, dateJoined, email, firstName, lastName, password, role, isBlocked, phone, token
    })
  }

  return (
    <div className='PanelUsers'>
      <span>{firstName}</span>
      <span>{lastName}</span>
      <span>{role}</span>
      <span>{phone}</span>
      <span>{dateJoined}</span>
      {isBlocked === 1 ? <button onClick={unBlockUserLogic}>رفع بلاک</button> : <button onClick={blockUserLogic}>بلاک کردن کاربر</button>}
      <button onClick={removeUserLogic}>حذف کاربر</button>
      <button onClick={editUserLogic}>ویرایش کاربر</button>
    </div>
  )
}
