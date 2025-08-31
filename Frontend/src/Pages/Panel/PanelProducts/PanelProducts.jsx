/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useContext, useRef } from 'react'
import './PanelProducts.css';

// start import componenets 
import PanelRightSide from '../../../Components/Panel/PanelRightSide/PanelRightSide'
import PanelHeaders from '../../../Components/Panel/PanelHeaders/PanelHeaders';
import PanelProductsComp from '../../../Components/Panel/PanelProductsComp/PanelProductsComp';
// end import componenets 

// start add depends 
import { context } from '../../../Context/Context';
import toast from 'react-hot-toast';
import IconsComp from '../../../Components/IconsComp/IconsComp';
import LoadingRequest from '../../../Components/LoadingRequest/LoadingRequest';
// end add depends 

export default function PanelProducts() {

  const contextUser = useContext(context);

  const productName = useRef()
  const productPrice = useRef()
  const productImageAddress = useRef()
  const productOffPrecents = useRef()
  const productCount = useRef()
  const productSellCount = useRef()
  const productBrandType = useRef()
  const productGrainType = useRef()
  const productDisc = useRef()

  const productNameEdit = useRef()
  const productPriceEdit = useRef()
  const productImageAddressEdit = useRef()
  const productOffPrecentsEdit = useRef()
  const productCountEdit = useRef()
  const productSellCountEdit = useRef()
  const productBrandTypeEdit = useRef()
  const productGrainTypeEdit = useRef()
  const productDiscEdit = useRef()

  useEffect(() => {
    contextUser.setAllProductsFlag(prev => !prev);
  }, []);

  async function addtNewProductLogic() {
    if (
      productName.current.value &&
      String(productPrice.current.value).replaceAll(",", "") &&
      productImageAddress.current.value &&
      productOffPrecents.current.value &&
      productCount.current.value &&
      productSellCount.current.value &&
      productBrandType.current.value &&
      productGrainType.current.value &&
      productDisc.current.value
    ) {
      try {
        const datas = {
          id: null,
          name: productName.current.value,
          disc: productDisc.current.value,
          image: productImageAddress.current.value,
          price: +productPrice.current.value.replaceAll(",", ""),
          offPrice: +(productPrice.current.value.replaceAll(",", "") - (productPrice.current.value.replaceAll(",", "") * productOffPrecents.current.value / 100)),
          offPrecent: + productOffPrecents.current.value,
          productCount: +productCount.current.value,
          grainType: productGrainType.current.value,
          cafeType: productBrandType.current.value,
          MainPageProducts__hasOffer: productOffPrecents.current.value > 0 ? 1 : 0,
          numberOfSell: +productSellCount.current.value,
          campainOfferPrecent: 0,
          stars: 5,
        }
        contextUser.setIsLoadingRequest(true)
        const Fetch = await fetch("https://mycafeshop.onrender.com/cafeAPI/products/addNewProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datas)
        });
        if (Fetch.ok) {
          toast.success("ثبت اطلاعات محصول با موفقیت انجام شد")
          contextUser.setAllProductsFlag(prev => !prev)
          productName.current.value = ""
          contextUser.setPriceOfProduct("")
          productImageAddress.current.value = ""
          productOffPrecents.current.value = ""
          productCount.current.value = ""
          productSellCount.current.value = ""
          contextUser.setBrandTypeSelect("Bonmono")
          contextUser.setGrainTypeSelect("Pure-Arabica")
          productDisc.current.value = ""
        }
        else {
          console.log(Fetch);
          toast.error("خطا در ثبت اطلاعات محصول ")
        }
      }
      catch (error) {
        toast.error("خطا در ثبت اطلاعات محصول ")
      }
      finally {
        contextUser.setIsLoadingRequest(false)
      }
    }
    else {
      toast.error("لطفا فیلد هارو کامل پر کنید")
    }
  }

  function changeBrandSelectHandle(event) {
    contextUser.setBrandTypeSelect(event.target.value)
  }
  function changeGrainSelectHandle(event) {
    contextUser.setGrainTypeSelect(event.target.value)
  }
  function removeEditModalLogic() {
    contextUser.setEditProductModal({ situation: false, datas: "" });
  }

  function changePriceLogic(e) {
    contextUser.setPriceOfProduct(() => {
      if (e.target.value.length) {
        return Number(e.target.value.replaceAll(",", "")).toLocaleString()
      } else {
        return ""
      }
    })
  }

  function changeEditNameLogic(e) { contextUser.setEditNameOfProduct(e.target.value) }
  function changeEditPriceLogic(e) { contextUser.setEditPriceOfProduct(Number(e.target.value.replaceAll(",", "")).toLocaleString()) }
  function changeEditImageLogic(e) { contextUser.setEditImageOfProduct(e.target.value) }
  function changeEditOffPrecentLogic(e) { contextUser.setEditoffPrecentOfProduct(e.target.value) }
  function changeEditProductCountLogic(e) { contextUser.setEditproductCountOfProduct(e.target.value) }
  function changeEditNumberOfSellLogic(e) { contextUser.setEditnumberOfSellOfProduct(e.target.value) }
  function changeBrandSelectEditHandle(e) { contextUser.setBrandTypeSelectEdited(e.target.value) }
  function changeGrainSelectEditHandle(e) { contextUser.setGrainTypeSelectEdited(e.target.value) }
  function cahngeDiscEditLogic(e) { contextUser.setEditDiscOfProduct(e.target.value) }

  async function submitEditProduct() {
    const editDatas = {
      id: null,
      name: productNameEdit.current.value,
      disc: productDiscEdit.current.value,
      image: productImageAddressEdit.current.value,
      price: +productPriceEdit.current.value.replaceAll(",", ""),
      offPrice: +productPriceEdit.current.value.replaceAll(",", "") - (productPriceEdit.current.value.replaceAll(",", "") * productOffPrecentsEdit.current.value / 100),
      offPrecent: + productOffPrecentsEdit.current.value,
      productCount: +productCountEdit.current.value,
      grainType: productGrainTypeEdit.current.value,
      caffeType: productBrandTypeEdit.current.value,
      MainPageProducts__hasOffer: productOffPrecentsEdit.current.value > 0 ? 1 : 0,
      numberOfSell: +productSellCountEdit.current.value,
      stars: 5,
    }
    try {
      contextUser.setIsLoadingRequest(true)
      const Fetch = await fetch(`https://mycafeshop.onrender.com/cafeAPI/products/editProduct/${contextUser.editProductModal.productID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDatas)
      });
      if (Fetch.ok) {
        toast.success("ثبت اطلاعات محصول با موفقیت انجام شد")
        contextUser.setAllProductsFlag(prev => !prev)
        contextUser.setEditProductModal({ situation: false, productID: "" })
      }
      else {
        toast.error("خطا در ثبت اطلاعات محصول ")
      }
    }
    catch (error) {
      toast.error("خطا در ثبت اطلاعات محصول ")
    } finally {
      contextUser.setIsLoadingRequest(false)
    }
  }

  return (
    <div className='PanelProducts'>

      {/* start add Loading Requerst Component */}
      {contextUser.isLoadingRequest ? <LoadingRequest></LoadingRequest> : ""}
      {/* end add Loading Requerst Component */}

      {contextUser.editProductModal.situation ?
        <div className='PanelProducts__Edit-Product-Modal-Page'>
          <span className='PanelProducts__Edit-Product-Modal-Page__Delete-Modal' onClick={removeEditModalLogic}>
            <IconsComp iconName={"Clear"}></IconsComp>
          </span>
          <div className='PanelProducts__Edit-Product-Modal-Page__Container'>

            <input ref={productNameEdit} type="text" placeholder='اسم محصول را وارد کنید :' value={contextUser.editNameOfProduct} onChange={changeEditNameLogic} />
            <input ref={productPriceEdit} type="text" placeholder='قیمت محصول را وارد کنید :' value={contextUser.editPriceOfProduct} onChange={changeEditPriceLogic} />
            <input ref={productImageAddressEdit} type="text" placeholder='آدرس عکس محصول را وارد کنید :' value={contextUser.editImageOfProduct} onChange={changeEditImageLogic} />
            <input ref={productOffPrecentsEdit} type="text" placeholder='درصد تخفیف محصول را وارد کنید :' value={contextUser.editoffPrecentOfProduct} onChange={changeEditOffPrecentLogic} />
            <input ref={productCountEdit} type="number" placeholder='تعداد محصول را وارد کنید :' value={contextUser.editproductCountOfProduct} onChange={changeEditProductCountLogic} />
            <input ref={productSellCountEdit} type="number" placeholder='تعداد فروش محصول را وارد کنید :' value={contextUser.editnumberOfSellOfProduct} onChange={changeEditNumberOfSellLogic} />

            <div>
              <span>برند محصول را وارد کنید : </span>
              <select ref={productBrandTypeEdit} value={contextUser.brandTypeSelectEdited} onChange={changeBrandSelectEditHandle}>
                <option value="Bonmono">بنمانو</option>
                <option value="Robusta">ربوستا</option>
                <option value="Tomkins">تام کینز</option>
              </select>
            </div>

            <div>
              <span>نوع دانه محصول را وارد کنید :</span>
              <select ref={productGrainTypeEdit} value={contextUser.grainTypeSelectEdited} onChange={changeGrainSelectEditHandle}>
                <option value="Pure Arabica">عربیکا خالص</option>
                <option value="Pure Robusta">ربوستا خالص</option>
                <option value="Mixed Arabica And Robusta">ترکیب عربیکا و ربوستا</option>
              </select>
            </div>

            <textarea ref={productDiscEdit} value={contextUser.editDiscOfProduct} onChange={cahngeDiscEditLogic} placeholder='توضیحات محصول را وارد کنید :'></textarea>

            <button onClick={submitEditProduct}>ثبت تغییرات</button>

          </div>
        </div>
        : ""}


      <PanelRightSide></PanelRightSide>

      <div className='PanelProducts__Left-Side'>

        <PanelHeaders></PanelHeaders>
        <div className='PanelProducts__Left-Side__Space'></div>
        <span className='PanelProducts__Left-Side__Title'>افزودن محصول جدید</span>

        <div className='PanelProducts__Left-Side__Add-New-Product'>
          <div className='PanelProducts__Left-Side__Add-New-Product__Inputs'>

            <input ref={productName} type="text" placeholder='اسم محصول را وارد کنید :' />
            <input ref={productPrice} onChange={changePriceLogic} value={contextUser.priceOfProduct} type="text" placeholder='قیمت محصول را وارد کنید :' />
            <input ref={productImageAddress} type="text" placeholder='آدرس عکس محصول را وارد کنید :' />
            <input ref={productOffPrecents} max="100" type="number" placeholder='درصد تخفیف محصول را وارد کنید :' />
            <input ref={productCount} type="number" placeholder='تعداد محصول را وارد کنید :' />
            <input ref={productSellCount} type="number" placeholder='تعداد فروش محصول را وارد کنید :' />

            <div className='PanelProducts__Left-Side__Add-New-Product__Inputs__Select'>
              <span>برند محصول را وارد کنید : </span>
              <select ref={productBrandType} value={contextUser.brandTypeSelect} onChange={changeBrandSelectHandle}>
                <option value="Bonmono">بنمانو</option>
                <option value="Robusta">ربوستا</option>
                <option value="Tomkins">تام کینز</option>
              </select>
            </div>

            <div className='PanelProducts__Left-Side__Add-New-Product__Inputs__Select'>
              <span>نوع دانه محصول را وارد کنید :</span>
              <select ref={productGrainType} value={contextUser.grainTypeSelect} onChange={changeGrainSelectHandle}>
                <option value="Pure-Arabica">عربیکا خالص</option>
                <option value="Pure-Robusta">ربوستا خالص</option>
                <option value="Mixed-Arabica-And-Robusta">ترکیب عربیکا و ربوستا</option>
              </select>
            </div>

            <textarea ref={productDisc} name="" id="" placeholder='توضیحات محصول را وارد کنید :'></textarea>

          </div>
          <button onClick={addtNewProductLogic}>ثبت محصول</button>
        </div>
        <div className='PanelProducts__Left-Side__Products-Container'>
          <div className='PanelProducts__Left-Side__Products-Container__Title'>
            <span className='PanelProducts__Left-Side__Products-Container__Title__Image'>عکس</span>
            <span className='PanelProducts__Left-Side__Products-Container__Title__Name'>نام محصول</span>
            <span className='PanelProducts__Left-Side__Products-Container__Title__Price'>قیمت محصول</span>
            <span className='PanelProducts__Left-Side__Products-Container__Title__OffPrice'>قیمت با تخفیف </span>
            <div className='PanelProducts__Left-Side__Products-Container__Title__Space'></div>
            <div className='PanelProducts__Left-Side__Products-Container__Title__Space'></div>
          </div>
          {
            contextUser.allProducts
              ?
              contextUser.allProducts.map((product) => { return <PanelProductsComp key={product.id} {...product} isLoaded={true} /> })
              :
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((product) => { return <PanelProductsComp key={product} isLoaded={false} /> })
          }
        </div>
      </div>
    </div>
  )
}

