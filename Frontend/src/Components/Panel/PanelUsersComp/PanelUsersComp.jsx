import React, { useContext } from 'react'
import './PanelUsersComp.css';
import { context } from '../../../Context/Context';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

export default function PanelUsersComp({ dateJoined, email, id, firstName, lastName, password, role, isBlocked, phone, token, isLoaded }) {

  const contextUser = useContext(context);

  async function unBlockUserLogic() {
    try {
      contextUser.setIsLoadingRequest(true)
      const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/editUserVerify/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked })
      });
      if (Fetch.ok) {
        toast.success("با موفقیت کاربر از مسدودی خارج شد")
        contextUser.setAllUsersFlag(prev => !prev)
      } else {
        toast.error("خطا در ارتباط با سرور ")
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا در ارتباط با سرور ")
    } finally {
      contextUser.setIsLoadingRequest(false)
    }

  }

  async function blockUserLogic() {
    try {
      contextUser.setIsLoadingRequest(true)
      const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/editUserVerify/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked })
      });
      if (Fetch.ok) {
        toast.success("با موفقیت کاربر مسدود شد")
        contextUser.setAllUsersFlag(prev => !prev)
      } else {
        toast.error("خطا در ارتباط با سرور ")
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا در ارتباط با سرور ")

    }
    finally {
      contextUser.setIsLoadingRequest(false)
    }

  }

  async function removeUserLogic() {
    swal({
      title: "از حذف کامنت اطمینان دارید ؟",
      buttons: {
        cancel: "انصراف",
        confirm: {
          text: "حذف",
          value: true,
          visible: true,
          className: "swal-red-btn"
        },
      },
      icon: "warning"
    })
      .then(async (res) => {
        if (res) {
          try {
            contextUser.setIsLoadingRequest(true)
            const Fetch = await fetch(`http://localhost:7000/cafeAPI/users/deleteUser/${id}`, {
              method: "DELETE"
            });
            if (Fetch.ok) {
              toast.success("با موفقیت کاربر حذف شد")
              contextUser.setAllUsersFlag(prev => !prev)
            } else {
              toast.error("خطا در ارتباط با سرور ")
            }
          } catch (error) {
            console.log(error);
            toast.error("خطا در ارتباط با سرور ")
          } finally {
            contextUser.setIsLoadingRequest(false)
          }

        }
      })
  }

  function editUserLogic() {
    contextUser.setIsShowEditUserModal({
      situation: true, userID: id, dateJoined, email, firstName, lastName, password, role, isBlocked, phone, token
    })
  }

  if (isLoaded) {
    return (
      <div className='PanelUsersComp'>
        <span>{firstName}</span>
        <span>{lastName}</span>
        <span>{role}</span>
        <span>{phone}</span>
        <span>{dateJoined}</span>
        {isBlocked === 1 ? <button onClick={unBlockUserLogic}>رفع بلاک</button> : <button onClick={blockUserLogic}>بلاک کاربر</button>}
        <button onClick={removeUserLogic}>حذف کاربر</button>
        <button onClick={editUserLogic}>ویرایش کاربر</button>
      </div>
    )
  } else {
    return (
      <div className='PanelUsersComp'>
        <span className='skeleton'></span>
        <span className='skeleton'></span>
        <span className='skeleton'></span>
        <span className='skeleton'></span>
        <span className='skeleton'></span>
        <button className='skeleton' ></button>
        <button className='skeleton' ></button>
        <button className='skeleton' ></button>
      </div>
    )
  }


}
