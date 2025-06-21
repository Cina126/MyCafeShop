/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useContext } from 'react'
import './PanelProducts.css';
import PanelRightSide from './../../../Components/Panel/PanelRightSide/PanelRightSide'
import PanelHeaders from './../../../Components/Panel/PanelHeaders/PanelHeaders';
import PanelProductsComp from './../../../Components/Panel/PanelProducts/PanelProducts';
import context from '../../../Context/Context';

export default function PanelProducts() {

  const contextUser = useContext(context);

  useEffect(() => {
    contextUser.setUserInformsFlag(prev => !prev)
    contextUser.setAllProductsFlag(prev => !prev)
  }, [])

  return (
    <div className='PanelProducts'>
      <PanelRightSide></PanelRightSide>
      <div className='PanelProducts__Left-Side'>
        <PanelHeaders></PanelHeaders>
        <div className='space'></div>
        <span className='PanelProducts__Left-Side__Title'>افزودن محصول جدید</span>
        <div className='PanelProducts__Left-Side__Add-New-Product'>
          <div className='PanelProducts__Left-Side__Add-New-Product__Inputs'>
            <input type="text" placeholder='اسم محصول را وارد کنید :' />
            <input type="text" placeholder='قیمت محصول را وارد کنید :' />
            <input type="text" placeholder='آدرس عکس محصول را وارد کنید :' />
            <input type="text" placeholder='مقدار تخفیف محصول را وارد کنید :' />
          </div>
          <button>ثبت محصول</button>
        </div>
        <div className='PanelProducts__Left-Side__Products-Container'>
          {contextUser.allProducts?.length ? contextUser.allProducts.map((product) => { return <PanelProductsComp key={product.id} {...product}></PanelProductsComp> }) : ""}
        </div>
      </div>
    </div>
  )
}

