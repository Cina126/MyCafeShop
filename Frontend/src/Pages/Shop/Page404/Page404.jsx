import React, { useContext, useEffect } from 'react'
import './Page404.css';
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import Footer from '../../../Components/Shop/Footer/Footer';
import Typewriter from 'typewriter-effect';
import { context } from '../../../Context/Context';
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';
import Notice from '../../../Components/Shop/Notice/Notice';
import CampainComp from '../../../Components/Shop/CampainComp/CampainComp';

export default function Page404() {

  const contextUser = useContext(context)

  useEffect(() => {
    contextUser.setIsOpenHiddenMeues(false)
  }, [])

  return (
    <div className='Page404'>

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

      <div className='Page404__Container'>
        <span>
          <Typewriter
            options={{ loop: true, delay: 45 }}
            onInit={(typewriter) => {
              typewriter.typeString("خطای 404 ، صفحه مورد نظر یافت نشد")
                .pauseFor(1000)
                .deleteAll()
                .start()
            }}
          />
        </span>
      </div>
      <Footer></Footer>
    </div>
  )
}
