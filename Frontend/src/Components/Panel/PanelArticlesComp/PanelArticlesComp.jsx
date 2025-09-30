import React, { useContext } from 'react'
import './PanelArticlesComp.css';
import swal from 'sweetalert';
import { context } from './../../../Context/Context';
import toast from 'react-hot-toast';

export default function PanelArticlesComp({ id, title, link, summery, cover, creator }) {

    const contextUser = useContext(context)

    async function editArticleLogic() {
        contextUser.setIsOpenEditArticlesModal({ id, title, cover, creator, link, summery, situation: true })
    }
    function deleteArticleLogic() {
        swal({
            title: `مقاله حذف شود ؟`,
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
        }).then(async (res) => {
            if (res) {
                try {
                    contextUser.setIsLoadingRequest(true)
                    const Fetch = await fetch(`http://localhost:7000/cafeAPI/articles/deleteArticle/${id}`, { method: "DELETE" })
                    if (Fetch.ok) {
                        toast.success("مقاله با موفقیت حذف شد")
                        contextUser.setAllArticlesFlag(prev => !prev)
                    }
                } catch (error) {
                    toast.error("خطای برقراری ارتباط با سرور")
                    console.log(error);
                }
                finally {
                    contextUser.setIsLoadingRequest(false)
                }
            }
        })
    }

    return (
        <div id={id} className='PanelArticlesComp'>
            {
                cover !== "null"
                    ?
                    <img src={`http://localhost:7000${cover}`} alt="" />
                    :
                    <img src={`Images/noImage.png`} alt="" />
            }
            <span>{title}</span>
            <span>{creator}</span>
            <button onClick={editArticleLogic}>ویرایش</button>
            <button onClick={deleteArticleLogic}>حذف</button>
        </div>
    )
}
