import React, { useContext } from 'react'
import './AllArticles.css';
import Footer from '../../../Components/Shop/Footer/Footer';
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone';
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import CampainComp from '../../../Components/Shop/CampainComp/CampainComp';
import Notice from '../../../Components/Shop/Notice/Notice';
import { context } from './../../../Context/Context'
import AllArticlesComp from '../../../Components/Shop/AllArticlesComp/AllArticlesComp';
import AllArticlesLoading from '../../../Components/ShopLoading/AllArticlesLoading/AllArticlesLoading';

export default function AllArticles() {

  const contextUser = useContext(context)

  return (

    <div className='AllArticles'>

      {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

      {/* start notice comp  */}
      {
        contextUser.panelNotices
          ?
          contextUser.panelNotices.map(notice => <Notice isLoaded={true} key={notice.id} {...notice}></Notice>)
          :
          ""
      }
      {/* end notice comp  */}

      {/* start campains comp  */}
      {
        contextUser.panelCampains
          ?
          contextUser.panelCampains.map(campain => <CampainComp key={campain.id} {...campain}></CampainComp>)
          :
          ""
      }
      {/* end campains comp  */}

      {/* start headers   */}
      <HeaderPc></HeaderPc>
      <HeaderPhone></HeaderPhone>
      {/* end headers   */}

      <div className='SpaceAllArticles'></div>

      <div className='AllArticles__Show-All-Articles'>

        <input type="text" placeholder='اسم مقاله سرچ کن ...' />

        <div className='AllArticles__Show-All-Articles__Articles-Content'>
          {
            contextUser.allArticles
              ?
              contextUser.allArticles.map((art) => <AllArticlesComp key={art.id} {...art}></AllArticlesComp>)
              :
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => <AllArticlesLoading key={num}></AllArticlesLoading>)
          }
        </div>

      </div>

      <div className='SpaceAllArticles'></div>

      <Footer></Footer>
    </div>
  )
}
