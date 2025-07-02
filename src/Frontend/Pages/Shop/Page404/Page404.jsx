import React from 'react'
import './Page404.css';
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import Footer from '../../../Components/Shop/Footer/Footer';
import Typewriter from 'typewriter-effect';

export default function Page404() {
  return (
    <div className='Page404'>
      <HeaderPc></HeaderPc>
      <HeaderPhone></HeaderPhone>
      <div className='Page404__Container'>
        <span>
          <Typewriter
            options={{ loop: true, delay: 45}}
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
