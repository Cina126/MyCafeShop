/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import './PanelArticles.css';
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide';
import PanelEditor from './../../../Components/Panel/PanelEditor/PanelEditor'
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders';
import { context } from './../../../Context/Context';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import PanelArticlesComp from '../../../Components/Panel/PanelArticlesComp/PanelArticlesComp';
import IconsComp from './../../../Components/IconsComp/IconsComp';
import PanelHiddenMenus from './../../../Components/Panel/PanelHiddenMenus/PanelHiddenMenus'
import LoadingRequest from '../../../Components/LoadingRequest/LoadingRequest';

export default function PanelArticles() {

    const contextUser = useContext(context)
    const articleTitleRef = useRef()
    const articleLinkRef = useRef()
    const summeryArticleRef = useRef()
    const chooseArticleCoverRef = useRef()
    const editArticleCoverRef = useRef()

    useEffect(() => {
        contextUser.setAllArticlesFlag(prev => !prev)
        contextUser.setIsOpenEditArticlesModal(prev => { return { ...prev, situation: false } })
        contextUser.setIsOpenPanelHiddenMenu(false)
    }, [])

    useEffect(() => {
        if (contextUser.allArticles) {
            const articleFinder = contextUser.allArticles.find((art) => { return art.id === contextUser.isOpenEditArticlesModal.id })
            articleFinder?.cover !== "null" ? contextUser.setEditArticlePreview(`http://localhost:7000${articleFinder?.cover}`) : contextUser.setEditArticlePreview(null)
            contextUser.setEditArticlesTitleValue(articleFinder?.title)
            contextUser.setEditArticlesLinkValue(articleFinder?.link)
            contextUser.setEditArticlesSummeryValue(articleFinder?.summery)
            contextUser.setEditArticlesBodyValue(articleFinder?.body)
        }
    }, [contextUser.isOpenEditArticlesModal])

    function changeCoverArticlesLogic(event) {
        if (event.target.files?.[0]) {
            const render = new FileReader()
            render.onloadend = () => {
                contextUser.setArticlePreview(render.result)
            }
            render.readAsDataURL(event.target.files?.[0])
        } else {
            contextUser.setArticlePreview(null)
        }
    }

    async function addNewArticleLogic() {
        if (
            articleTitleRef.current.value && contextUser.cKEditorContent &&
            summeryArticleRef.current.value && articleLinkRef.current.value

        ) {
            try {
                contextUser.setIsLoadingRequest(true)
                const formData = new FormData()
                formData.append("cover", chooseArticleCoverRef.current?.files?.[0])
                formData.append("title", articleTitleRef.current.value)
                formData.append("summery", summeryArticleRef.current.value)
                formData.append("body", contextUser.cKEditorContent)
                formData.append("date", new Date().toLocaleDateString("fa-Ir"))
                formData.append("creator", contextUser.userInforms[0].firstName + contextUser.userInforms[0].lastName)
                formData.append("link", articleLinkRef.current.value)
                const Fetch = await fetch("http://localhost:7000/cafeAPI/articles/addNewArticle", {
                    method: "POST",
                    body: formData
                });
                if (Fetch.ok) {
                    toast.success("با موفقیت مقاله ثبت شد")
                    contextUser.setAllArticlesFlag(prev => !prev)
                    articleTitleRef.current.value = ""
                    articleLinkRef.current.value = ""
                    summeryArticleRef.current.value = ""
                    contextUser.setCKEditorContent("سلام! این یک متن تستی است.")
                    contextUser.setArticlePreview(null)
                    chooseArticleCoverRef.current.value = ""
                }
            } catch (error) {
                toast.error("خطای برقراری ارتباط با سرور")
                console.log(error);
            }
            finally {
                contextUser.setIsLoadingRequest(false)
            }
        }
        else {
            toast.error("لطفا اطلاعات را صحیح وارد کنید");
        }
    }

    async function editArticleLogic() {
        if (
            contextUser.editArticlesTitleValue &&
            contextUser.editArticlesLinkValue &&
            contextUser.editArticlesSummeryValue &&
            contextUser.editArticlesBodyValue
        ) {
            const formData = new FormData()
            formData.append("cover", editArticleCoverRef.current?.files?.[0])
            formData.append("title", contextUser.editArticlesTitleValue)
            formData.append("link", contextUser.editArticlesLinkValue)
            formData.append("summery", contextUser.editArticlesSummeryValue)
            formData.append("body", contextUser.editArticlesBodyValue)
            try {
                contextUser.setIsLoadingRequest(true)
                const Fetch = await fetch(`http://localhost:7000/cafeAPI/articles/updateArticle/${contextUser.isOpenEditArticlesModal.id}`, {
                    method: "PUT",
                    body: formData
                });
                if (Fetch.ok) {
                    toast.success("مقاله با موفقیت ویرایش شد")
                    contextUser.setIsOpenEditArticlesModal(prev => { return { ...prev, situation: false } })
                    contextUser.setAllArticlesFlag(prev => !prev)
                }
            } catch (error) {
                toast.error("خطای برقراری ارتباط با سرور")
                console.log(error);
            }
            finally {
                contextUser.setIsLoadingRequest(false)
            }
        } else {
            toast.error("لطفا اطلاعات را صحیح وارد کنید");
        }

    }

    function editArticleCoverLogic(event) {
        if (event.target.files?.[0]) {
            const render = new FileReader()
            render.onloadend = () => {
                contextUser.setEditArticlePreview(render.result)
            }
            render.readAsDataURL(event.target.files?.[0])
        } else {
            contextUser.setEditArticlePreview(null)
        }
    }

    function deleteEditArticleModalLogic() {
        contextUser.setIsOpenEditArticlesModal((prev => { return { ...prev, situation: false } }))
    }

    return (
        <div className='PanelArticles'>

            {/* start add Loading Requerst Component */}
            {contextUser.isLoadingRequest ? <LoadingRequest></LoadingRequest> : ""}
            {/* end add Loading Requerst Component */}

            {
                contextUser.isOpenPanelHiddenMenu
                    ?
                    <PanelHiddenMenus styles={{ right: "0" }}></PanelHiddenMenus>
                    :
                    <PanelHiddenMenus styles={{ right: "-100%" }}></PanelHiddenMenus>
            }

            {/* start edit Articles Modal  */}

            {
                contextUser.isOpenEditArticlesModal.situation
                    ?
                    <div className='PanelArticles__Edit-Articles-Modal'>
                        <span onClick={deleteEditArticleModalLogic} className='PanelArticles__Edit-Articles-Modal__Delete-Modal'>
                            <IconsComp iconName={"Clear"}></IconsComp>
                        </span>
                        <div className='PanelArticles__Edit-Articles-Modal__edit-Art-Titles'>
                            <input onChange={(event) => { contextUser.setEditArticlesTitleValue(event.target.value) }} value={contextUser.editArticlesTitleValue} type="text" placeholder='عنوان مقاله را وارد کنید :' />
                            <input onChange={(event) => { contextUser.setEditArticlesLinkValue(event.target.value) }} value={contextUser.editArticlesLinkValue} type="text" placeholder='لینک مقاله را وارد کنید :' />
                        </div>

                        <textarea onChange={(event) => { contextUser.setEditArticlesSummeryValue(event.target.value) }} value={contextUser.editArticlesSummeryValue} placeholder='چکیده مقاله را وارد کنید : '></textarea>

                        <PanelEditor content={contextUser.editArticlesBodyValue} setContent={contextUser.setEditArticlesBodyValue}></PanelEditor>

                        <div className='PanelArticles__Edit-Articles-Modal__Edit-Article-Cover'>
                            <input ref={editArticleCoverRef} accept='image/*' onChange={editArticleCoverLogic} id='edit-cover-articles' type="file" />
                            <label htmlFor="edit-cover-articles">کاور مقاله را ویرایش کنید :</label>
                            {
                                contextUser.editArticlePreview
                                    ?
                                    <img src={contextUser.editArticlePreview} alt="" />
                                    :
                                    <img src={`Images/noImage.png`} alt="Images/noImage.png" />
                            }
                        </div>

                        <button onClick={editArticleLogic}>ویرایش مقاله</button>
                    </div>
                    :
                    ""
            }

            {/* end edit Articles Modal  */}

            <PanelRightSide></PanelRightSide>

            <div className='PanelArticles__Left-Side'>
                <PanelHeaders></PanelHeaders>
                <div className='PanelArticles__Left-Side__Space'></div>

                <span className='PanelArticles__Left-Side__Title'>افزودن مقاله جدید</span>
                <div className='PanelArticles__Left-Side__Add-New-Articles'>

                    <div className='PanelArticles__Left-Side__Add-New-Articles__Add-New-Art-Titles'>
                        <input ref={articleTitleRef} type="text" placeholder='عنوان مقاله را وارد کنید :' />
                        <input ref={articleLinkRef} type="text" placeholder='لینک مقاله را وارد کنید :' />
                    </div>

                    <textarea ref={summeryArticleRef} placeholder='چکیده مقاله را وارد کنید : '></textarea>

                    <PanelEditor content={contextUser.cKEditorContent} setContent={contextUser.setCKEditorContent}></PanelEditor>

                    <div className='PanelArticles__Left-Side__Add-New-Articles__Choose-Article-Cover'>
                        <input ref={chooseArticleCoverRef} accept='image/*' onChange={changeCoverArticlesLogic} id='cover-articles' type="file" />
                        <label htmlFor="cover-articles">کاور مقاله را انتخاب کنید :</label>
                        {
                            contextUser.articlePreview
                                ?
                                <img src={`${contextUser.articlePreview}`} alt="" />
                                :
                                <img src={`Images/noImage.png`} alt="Images/noImage.png" />
                        }
                    </div>

                    <button onClick={addNewArticleLogic}>ثبت مقاله</button>
                </div>

                <div className='PanelArticles__Left-Side__Show-All-Articles'>
                    <span className='PanelArticles__Left-Side__Show-All-Articles__Title'>لیست مقالات</span>

                    <div className='PanelArticles__Left-Side__Show-All-Articles__Guide-Titles'>
                        <span>عکس مقاله</span>
                        <span>عنوان مقاله</span>
                        <span>نویسنده مقاله</span>
                        <div></div>
                        <div></div>
                    </div>
                    {
                        contextUser.allArticles
                            ?
                            contextUser.allArticles.map((article) => {
                                return <PanelArticlesComp {...article} key={article.id}></PanelArticlesComp>
                            })
                            :
                            ""
                    }
                </div>

            </div>
        </div>
    )
}
