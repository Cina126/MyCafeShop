import React, { useContext, useEffect } from 'react'
import './Page404.css';
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import Footer from '../../../Components/Shop/Footer/Footer';
import Typewriter from 'typewriter-effect';
import {context} from '../../../Context/Context';

export default function Page404() {

  const contextUser = useContext(context)

  useEffect(() => {
    contextUser.setIsOpenHiddenMeues(false)
  }, [])

  return (
    <div className='Page404'>
      <HeaderPc></HeaderPc>
      <HeaderPhone></HeaderPhone>
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
