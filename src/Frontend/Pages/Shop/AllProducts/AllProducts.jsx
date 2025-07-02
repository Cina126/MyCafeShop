/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */

import React, { useContext, useEffect, useRef } from 'react'
import './AllProducts.css'
import { context } from '../../../Context/Context'
import swal from 'sweetalert'

//start  import components 
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc'
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import AllProducts from '../../../Components/Shop/AllProducts/AllProducts'
import Footer from '../../../Components/Shop/Footer/Footer';
import GrainFilter from '../../../Components/Shop/GrainFilter/GrainFilter';
import BrandFilter from '../../../Components/Shop/BrandFilter/BrandFilter';
import OfferFilter from '../../../Components/Shop/OfferFilter/OfferFilter';
//end import components 

// start import icons 
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// end import icons 

export default function ProductsDetails() {

  const contextUser = useContext(context);
  const rangeInput = useRef()
  const parentOfBrnads = useRef()
  const parentOfGrains = useRef()
  const parentOfOffers = useRef()

  useEffect(() => {
    contextUser.setUserInformsFlag(prev => !prev);
    contextUser.setUserInformsFlag(prev => !prev);
  }, []);

  useEffect(() => {
    async function searchProductsHandle() {
      try {
        const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/searchProducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputValue: contextUser.searchInput,
            filterPrice: contextUser.filterInputMaxNumber,
            grainType: Array.from(contextUser.grainSelected),
            brandType: Array.from(contextUser.brandSelected),
            offerType: Array.from(contextUser.offerSelected)
          })
        })
        if (Fetch.ok) {
          const Json = await Fetch.json()
          contextUser.setAllProducts(Json)
        }
      } catch (error) {
        console.log(error, Array.from(contextUser.brandSelected))
        swal({
          title: `خطا در برقراری ارتباط `,
          buttons: "تلاش دوباره",
          icon: "error"
        });
      }
    }
    searchProductsHandle()
  }, [
    contextUser.searchInput, contextUser.grainSelected,
    contextUser.brandSelected, contextUser.offerSelected,
  ])

  function changeAllProductsSearchInput(event) {
    contextUser.setSearchInput(event.target.value);
  }

  function changePriceFilterShow() {
    contextUser.setFilterInputMaxNumber(rangeInput.current.value * 10_000);
  }

  async function filterBasedPriceLogic() {
    try {
      const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/searchProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputValue: contextUser.searchInput,
          filterPrice: contextUser.filterInputMaxNumber,
          grainType: Array.from(contextUser.grainSelected),
          brandType: Array.from(contextUser.brandSelected),
          offerType: Array.from(contextUser.offerSelected)
        })
      })
      if (Fetch.ok) {
        const Json = await Fetch.json()
        console.log(Json);
        contextUser.setAllProducts(Json)
      }
    } catch (error) {
      console.log(error, Array.from(contextUser.brandSelected))
      swal({
        title: `خطا در برقراری ارتباط `,
        buttons: "تلاش دوباره",
        icon: "error"
      });
    }
  }

  function removeGrainFilters() {
    contextUser.setGrainSelected(['Mixed Arabica And Robusta', 'Pure Arabica', 'Pure Robusta'])
  }
  function removeBrandsFilters() {
    contextUser.setBrandSelected(["Bonmono", "Tomkins", "Robusta"])
  }

  function removeOffersFilters() {
    contextUser.setOfferSelected(["1", "0"])
  }

  return (
    <section className='AllProductsPage'>
      
      <HeaderPc></HeaderPc>
      <HeaderPhone></HeaderPhone>

      <div className='AllProductsPage__Filter'>

        {/* start right side */}
        <div className='AllProductsPage__Filter__Right-Side'>

          <div className='AllProductsPage__Filter__Right-Side__Price'>
            <h1>محدوده قیمت </h1>
            <input type="range" ref={rangeInput} onChange={changePriceFilterShow} value={contextUser.filterInputMaxNumber / 10_000} />
            <div className='AllProductsPage__Filter__Right-Side__Price__inner-Two-Price'>
              <span>0 تومان</span>
              <span>{Number(contextUser.filterInputMaxNumber).toLocaleString()} تومان</span>
            </div>
            <button onClick={filterBasedPriceLogic}>
              اعمال کردن
              <FilterAltIcon></FilterAltIcon>
            </button>
          </div>

          <div ref={parentOfGrains} className='AllProductsPage__Filter__Right-Side__Grain'>
            <h1>نوع دانه قهوه</h1>
            {contextUser?.grainTypes ? contextUser.grainTypes.map((informs) => {
              return <GrainFilter key={informs.id} {...informs}></GrainFilter>
            }) : ""}
          </div>

          <div ref={parentOfBrnads} className='AllProductsPage__Filter__Right-Side__Brand'>
            <h1>برند های قهوه </h1>
            {contextUser?.brandTypes ? contextUser.brandTypes.map((informs) => {
              return <BrandFilter key={informs.id} {...informs}></BrandFilter>
            }) : ""}
          </div>

          <div ref={parentOfOffers} className='AllProductsPage__Filter__Right-Side__Offers'>
            <h1>تخفیف دار باشه یا نه </h1>
            {contextUser?.offersTypes ? contextUser.offersTypes.map((informs) => {
              return <OfferFilter key={informs.id} {...informs}></OfferFilter>
            }) : ""}
          </div>

        </div>
        {/* end right side */}

        {/* start left side filter */}
        <div className='AllProductsPage__Filter__Left-Side'>
          <input placeholder='دنبال چه نوع نوشیدنی هستی ؟' type="text" onChange={changeAllProductsSearchInput} value={contextUser.searchInput} />

          <div className='AllProductsPage__Filter__Left-Side__Show-All-Products'>
            {contextUser.allProducts ?
              contextUser.allProducts?.length ?
                contextUser.allProducts.map((products) => {
                  console.log(products.image)
                  return <AllProducts key={products.id} {...products} isLoaded={true}></AllProducts>
                })
                : <span className='AllProductsPage__Filter__Left-Side__Show-All-Products__Not-Found'>هیچ محصولی موجود نیست </span>
              : [1, 2, 3, 4, 5, 6, 7, 8].map((products) => { return <AllProducts key={products} isLoaded={false}></AllProducts> })}
          </div>

        </div>
        {/* end left side filter */}
      </div>

      <Footer></Footer>
    </section >

  )
}

