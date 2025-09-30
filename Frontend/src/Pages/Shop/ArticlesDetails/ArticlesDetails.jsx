/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react'
import './ArticlesDetails.css';
import { useParams } from 'react-router-dom';
import { context } from './../../../Context/Context';
import Page404 from '../Page404/Page404';
import DOMPurify from 'dompurify'
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone';
import Notice from '../../../Components/Shop/Notice/Notice';
import Footer from '../../../Components/Shop/Footer/Footer';
import CampainComp from '../../../Components/Shop/CampainComp/CampainComp';

export default function ArticlesDetails() {

    const contextUser = useContext(context)
    const params = useParams()
    const articleBodyRef = useRef()

    useEffect(() => {
        contextUser.setAllArticlesFlag(prev => !prev)
    }, [])

    useEffect(() => {
        const findArticle = contextUser.allArticles?.find(article => { return article.link === params.BlogsLink })

        if (findArticle?.body) {
            findArticle.body = addIdsToHeadings(findArticle?.body)
            const filterH2FromBody = extractTOC(findArticle?.body)
            contextUser.setArticle(findArticle)
            contextUser.setArticleTOC(filterH2FromBody)
        }

    }, [contextUser.allArticles])

    function addIdsToHeadings(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        doc.querySelectorAll("h2").forEach((h2, index) => {
            const slug = h2.textContent
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-");
            const id = `${slug}-${index}`;
            h2.setAttribute("id", id);
        });

        return doc.body.innerHTML;
    }

    function extractTOC(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        return Array.from(doc.querySelectorAll("h2")).map((h2, index) => {
            const slug = h2.textContent
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-");
            return {
                id: `${slug}-${index}`,
                title: h2.textContent,
            };
        });
    }

    function scrollToPositionLogic(id) {
        const container = articleBodyRef.current;
        if (container) {
            const allH2 = container.querySelectorAll(`h2`)
            const findH2 = Array.from(allH2).find((h2) => { return h2.id === id })
            if (findH2) {
                findH2.scrollIntoView({ behavor: "smooth", block: "start" })
            }
            console.log(findH2);
        }

    }


    if (true) {
        return (
            <div className='ArticlesDetails'>

                {
                    contextUser.panelNotices
                        ?
                        contextUser.panelNotices.map(notice => <Notice isLoaded={true} key={notice.id} {...notice}></Notice>)
                        :
                        ""
                }

                {/* start campains comp  */}
                {
                    contextUser.panelCampains
                        ?
                        contextUser.panelCampains.map(campain => <CampainComp key={campain.id} {...campain}></CampainComp>)
                        :
                        ""
                }
                {/* end campains comp  */}

                <HeaderPc></HeaderPc>
                <HeaderPhone></HeaderPhone>

                {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

                <div className='ArticlesDetails__Article-Content'>
                    <div className='ArticlesDetails__Article-Content__Summery'>
                        <span className='ArticlesDetails__Article-Content__Summery__Title'>لیست مطالب</span>
                        {
                            contextUser.articleTOC?.map((list) => {
                                return <span key={list.id} onClick={() => { scrollToPositionLogic(list.id) }}>{list.title}</span>
                            })
                        }
                    </div>
                    <div ref={articleBodyRef} className='ArticlesDetails__Article-Content__Body' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contextUser.article?.body) }}></div>
                </div>

                <div className='ArticlesDetails__Space'></div>

                <Footer></Footer>
            </div>
        )
    } else {
        return <Page404></Page404>
    }


}
