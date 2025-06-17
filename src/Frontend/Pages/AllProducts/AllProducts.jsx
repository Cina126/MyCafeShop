/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect, useRef } from 'react'
import './AllProducts.css'
import context from '../../Context/Context'
import swal from 'sweetalert'

//start  import components 
import HeaderPc from '../../Components/HeaderPc/HeaderPc'
import HeaderPhone from './../../Components/HeaderPhone/HeaderPhone'
import FilterSection from '../../Components/GrainFilter/GrainFilter'
import AllProducts from './../../Components/AllProducts/AllProducts'
import Footer from '../../Components/Footer/Footer';
import GrainFilter from '../../Components/GrainFilter/GrainFilter';
import BrandFilter from '../../Components/BrandFilter/BrandFilter';
import OfferFilter from '../../Components/OfferFilter/OfferFilter';
//end import components 

// start import icons 
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useGetFetch from '../../Functions/useGetFetch'
import { useLocation } from 'react-router-dom'
// end import icons 

export default function ProductsDetails() {

  const location = useLocation()
  const contextUser = useContext(context);
  const rangeInput = useRef();

  useEffect(() => {
    contextUser.setUserInformsFlag(prev => !prev);
  }, []);

  useEffect(() => {
    async function searchProductsHandle() {
      console.log(12);
      try {
        const Fetch = await fetch("http://localhost:7000/cafeAPI/products/allProducts/searchProducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputValue: contextUser.searchInput,
            grainType: contextUser.grainSelected,
            brandType: contextUser.brandSelected,
            offerType: contextUser.OfferSelected
          })
        })
        if (Fetch.ok) {
          const Json = await Fetch.json()
          contextUser.setAllProducts(Json)
        }
      } catch (error) {
        console.log(error);
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
    contextUser.brandSelected, contextUser.OfferSelected,
    contextUser.grainTypes, contextUser.brandTypes, contextUser.offersTypes,
  ])

  useEffect(() => {
    async function resetFilters() {
      try {
        const UpdateBrandTypesFetch = await fetch("http://localhost:7000/cafeAPI/filterProducts/brandTypes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: 4 })
        });
        const UpdateGrainTypesFetch = await fetch("http://localhost:7000/cafeAPI/filterProducts/grainTypes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: 49 })
        });
        const UpdateOfferTypesFetch = await fetch("http://localhost:7000/cafeAPI/filterProducts/offersType", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: 33 })
        });
        if (UpdateBrandTypesFetch.ok && UpdateGrainTypesFetch.ok && UpdateOfferTypesFetch.ok) {

          const GeteBrandTypesFetch = await fetch("http://localhost:7000/cafeAPI/filterProducts/brandTypes")
          const GetGrainTypesFetch = await fetch("http://localhost:7000/cafeAPI/filterProducts/grainTypes")
          const GetOfferTypesFetch = await fetch("http://localhost:7000/cafeAPI/filterProducts/offersType")

          if (GeteBrandTypesFetch.ok && GetGrainTypesFetch.ok && GetOfferTypesFetch.ok) {
            const grainJson = await GetGrainTypesFetch.json()
            const brandJson = await GeteBrandTypesFetch.json()
            const offerJson = await GetOfferTypesFetch.json()

            contextUser.setGrainTypes(grainJson)
            contextUser.setBrandTypes(brandJson)
            contextUser.setOffersTypes(offerJson)
            contextUser.setGrainSelected("")
            contextUser.setBrandSelected("")
            contextUser.setOfferSelected("")
          }
        }
      } catch (error) {
        swal({
          title: `خطا در برقراری ارتباط `,
          buttons: "تلاش دوباره",
          icon: "error"
        });
      }
    }
    resetFilters()
  }, [location.href])

  async function changeAllProductsSearchInput(event) {
    contextUser.setSearchInput(event.target.value);
  }

  function changePriceFilterShow() {
    contextUser.setMaxPriceFilterShow(rangeInput.current.value * 10_000);
  }
  function changePriceFilterLogic() {
    contextUser.setMaxPriceFilterLogic(rangeInput.current.value * 10_000);
  }

  return (
    <section className='AllProductsPage'>

      <HeaderPc></HeaderPc>
      <HeaderPhone></HeaderPhone>

      <div className='AllProductsPage__Filter'>

        {/* start right side */}
        <div className='AllProductsPage__Filter__Right_Side'>

          <div className='AllProductsPage__Filter__Right_Side__Price'>
            <h1>محدوده قیمت </h1>
            <input type="range" ref={rangeInput} onChange={changePriceFilterShow} value={contextUser.maxPriceFilterShow / 10_000} />
            <div className='AllProductsPage__Filter__Right_Side__Price__inner_Two_Price'>
              <span>0 تومان</span>
              <span>{Number(contextUser.maxPriceFilterShow).toLocaleString()} تومان</span>
            </div>
            <button onClick={changePriceFilterLogic}>
              اعمال کردن
              <FilterAltIcon></FilterAltIcon>
            </button>
          </div>

          <div className='AllProductsPage__Filter__Right_Side__Grain'>
            <h1>نوع دانه قهوه</h1>
            {contextUser?.grainTypes ? contextUser.grainTypes.map((informs) => {
              return <GrainFilter key={informs.id} {...informs}></GrainFilter>
            }) : ""}
          </div>

          <div className='AllProductsPage__Filter__Right_Side__Brand'>
            <h1>برند های قهوه </h1>
            {contextUser?.brandTypes ? contextUser.brandTypes.map((informs) => {
              return <BrandFilter key={informs.id} {...informs}></BrandFilter>
            }) : ""}
          </div>

          <div className='AllProductsPage__Filter__Right_Side__Offers'>
            <h1>تخفیف دار باشه یا نه </h1>
            {contextUser?.offersTypes ? contextUser.offersTypes.map((informs) => {
              return <OfferFilter key={informs.id} {...informs}></OfferFilter>
            }) : ""}
          </div>

        </div>
        {/* end right side */}

        {/* start left side filter */}
        <div className='AllProductsPage__Filter__Left_Side'>
          <input placeholder='دنبال چه نوع نوشیدنی هستی ؟' type="text" onChange={changeAllProductsSearchInput} value={contextUser.searchInput} />
          <div className='AllProductsPage__Filter__Left_Side__Show_All_Products'>
            {contextUser.allProducts?.length ? contextUser.allProducts.map((products) => { return <AllProducts key={products.id} {...products} isLoaded={true}></AllProducts> }) : ""}
          </div>
        </div>
        {/* end left side filter */}
      </div>

      <Footer></Footer>
    </section >

  )
}

