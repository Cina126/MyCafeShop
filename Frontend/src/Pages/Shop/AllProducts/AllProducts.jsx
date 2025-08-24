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
import AllProductsComp from '../../../Components/Shop/AllProductsComp/AllProductsComp'
import Footer from '../../../Components/Shop/Footer/Footer';
import GrainFilter from '../../../Components/Shop/GrainFilter/GrainFilter';
import BrandFilter from '../../../Components/Shop/BrandFilter/BrandFilter';
import OfferFilter from '../../../Components/Shop/OfferFilter/OfferFilter';
import HiddenMenue from './../../../Components/Shop/HiddenMenue/HiddenMenue';
import CampainComp from './../../../Components/Shop/CampainComp/CampainComp';
import AllProdLoading from './../../../Components/ShopLoading/AllProdLoading/AllProdLoading';
import FilterLoading from './../../../Components/ShopLoading/FilterLoading/FilterLoading';
//end import components 

// start import icons 
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Notice from '../../../Components/Shop/Notice/Notice';
import ClearIcon from '@mui/icons-material/Clear';
// end import icons 

export default function ProductsDetails() {

  const contextUser = useContext(context);
  const rangeInputPC = useRef()
  const rangeInputPH = useRef()
  const parentOfBrnads = useRef()
  const parentOfGrains = useRef()
  const parentOfOffers = useRef()
  const rightSideMenue = useRef()

  const urlSearch = new URLSearchParams(window.location.search)

  let priceRangeFilterValue = urlSearch.getAll("priceRange").map(String)
  let grainFilterIndexs = urlSearch.getAll("grainFilter").map(String)
  let brandFilterIndexs = urlSearch.getAll("brandFilter").map(String)
  let offerFilterIndexs = urlSearch.getAll("offerFilter").map(String)

  useEffect(() => {
    contextUser.setUserInformsFlag(prev => !prev);
    contextUser.setAllProductsFlag(prev => !prev)
    contextUser.setGrainTypesFlag(prev => !prev)
    contextUser.setBrandTypesFlag(prev => !prev)
    contextUser.setOffersTypesFlag(prev => !prev)
    contextUser.setIsOpenHiddenMeues(false);
    contextUser.setIsOpenRightSideFilterMenue(false);
  }, []);

  useEffect(() => {
    if (urlSearch.getAll("priceRange").map(String).length) {
      contextUser.setFilterInputMaxNumber(urlSearch.getAll("priceRange").map(String));
    } else {
      contextUser.setFilterInputMaxNumber(1_000_000);
    }

    async function searchProductsHandle() {
      try {
        const data = {
          inputValue: contextUser.searchInput,
          filterPrice: urlSearch.getAll("priceRange").length ? urlSearch.getAll("priceRange") : [1_000_000],
          grainType: urlSearch.getAll("grainFilter").length ? urlSearch.getAll("grainFilter") : ["Mixed-Arabica-And-Robusta", "Pure-Arabica", "Pure-Robusta"],
          brandType: urlSearch.getAll("brandFilter").length ? urlSearch.getAll("brandFilter") : ["Robusta", "Tomkins", "Bonmono"],
          offerType: urlSearch.getAll("offerFilter").length ? urlSearch.getAll("offerFilter") : [1, 0],
        }
        const Fetch = await fetch("https://mycafeshop.onrender.com/cafeAPI/products/allProducts/searchProducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
        if (Fetch.ok) {
          const Json = await Fetch.json()
          contextUser.setFilteredProducts(Json)
        }else{
          console.log(Fetch);
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
  }, [contextUser.searchInput])

  function changeAllProductsSearchInput(event) {
    contextUser.setSearchInput(event.target.value);
  }

  function changePriceFilterShowPC() {
    contextUser.setFilterInputMaxNumber(rangeInputPC.current.value * 10_000);
  }

  function changePriceFilterShowPH() {
    contextUser.setFilterInputMaxNumber(rangeInputPH.current.value * 10_000);
  }

  function filterBasedPriceLogic() {

    priceRangeFilterValue = [rangeInputPC.current.value * 10_000]

    let queryStringOffers = offerFilterIndexs.map(num => `offerFilter=${num}`).join("&");
    let queryStringBrands = brandFilterIndexs.map(num => `brandFilter=${num}`).join("&");
    let queryStringGrains = grainFilterIndexs.map(num => `grainFilter=${num}`).join("&");
    let queryStringPrice = priceRangeFilterValue.map(num => `priceRange=${num}`).join("&");
    let mixing = [queryStringBrands, queryStringOffers, queryStringGrains, queryStringPrice];

    mixing = mixing.filter(data => data !== "")
    window.location.search = mixing.join("&")
  }

  function openRightSideFilterMenueLogic() {
    contextUser.setIsOpenRightSideFilterMenue(true)
    contextUser.setIsOpenHiddenMeues(false)
  }

  function rmOpenRightSideFilterMenueLogic() {
    contextUser.setIsOpenRightSideFilterMenue(false)
  }

  function rmAllFiltersLogic() {
    window.location.search = ""
  }

  window.addEventListener("resize", () => {
    if (window.outerWidth >= 900) {
      contextUser.setIsOpenRightSideFilterMenue(false)
    }
  })

  return (
    <section className='AllProductsPage'>

      {/* start hidden filter menue*/}
      <span onClick={openRightSideFilterMenueLogic} className='AllProductsPage__Hidden-Filter-Button'>
        <FilterAltIcon></FilterAltIcon>
      </span>

      <div style={contextUser.isOpenRightSideFilterMenue ? { right: "0%" } : { right: "-100%" }} className='AllProductsPage__Hidden-Right-Side-Filter-Menue-Page'>

        <div className='AllProductsPage__Hidden-Right-Side-Filter-Menue-Page__Space'></div>

        <span onClick={rmOpenRightSideFilterMenueLogic} className='AllProductsPage__Hidden-Right-Side-Filter-Menue-Page__Rm-Modal'>
          <ClearIcon></ClearIcon>
        </span>

        <div className='AllProductsPage__Hidden-Right-Side-Filter-Menue-Page__Container'>

          <div className='AllProductsPage__Filter__Right-Side__Price'>
            <span>محدوده قیمت </span>
            <input type="range" ref={rangeInputPH} onChange={changePriceFilterShowPH} value={contextUser.filterInputMaxNumber / 10_000} />
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
            <span>نوع دانه قهوه</span>
            {contextUser.grainTypes ? contextUser.grainTypes.map((informs) => {
              return <GrainFilter key={informs.id} {...informs}></GrainFilter>
            }) : [1, 2, 3].map((data) => { return <FilterLoading key={data}></FilterLoading> })}
          </div>

          <div ref={parentOfBrnads} className='AllProductsPage__Filter__Right-Side__Brand'>
            <span>برند های قهوه </span>
            {contextUser.brandTypes ? contextUser.brandTypes.map((informs) => {
              return <BrandFilter key={informs.id} {...informs}></BrandFilter>
            }) : [1, 2, 3].map((data) => { return <FilterLoading key={data}></FilterLoading> })}
          </div>

          <div ref={parentOfOffers} className='AllProductsPage__Filter__Right-Side__Offers'>
            <span>تخفیف دار باشه یا نه </span>
            {contextUser.offersTypes ? contextUser.offersTypes.map((informs) => {
              return <OfferFilter key={informs.id} {...informs}></OfferFilter>
            }) : [1, 2, 3].map((data) => { return <FilterLoading key={data}></FilterLoading> })}
          </div>

          <button onClick={rmAllFiltersLogic} className='AllProductsPage__Filter__Right-Side__Rm-All-Filters'>حذف تمامی فیلتر ها </button>

        </div>

      </div>
      {/* end hidden filter menue*/}

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

      {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

      <div className='SpaceAllProducts'></div>

      <div className='AllProductsPage__Filter'>

        {/* start right side  */}
        <div ref={rightSideMenue} className='AllProductsPage__Filter__Right-Side'>

          <div className='AllProductsPage__Filter__Right-Side__Price'>
            <span>محدوده قیمت </span>
            <input type="range" ref={rangeInputPC} onChange={changePriceFilterShowPC} value={contextUser.filterInputMaxNumber / 10_000} />
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
            <span>نوع دانه قهوه</span>
            {contextUser.grainTypes
              ?
              contextUser.grainTypes.map((informs) => {
                return <GrainFilter key={informs.id} {...informs}></GrainFilter>
              })
              :
              [1, 2, 3].map((grains) => { return <FilterLoading key={grains}></FilterLoading> })}
          </div>

          <div ref={parentOfBrnads} className='AllProductsPage__Filter__Right-Side__Brand'>
            <span>برند های قهوه </span>
            {contextUser.brandTypes
              ?
              contextUser.brandTypes.map((informs) => {
                return <BrandFilter key={informs.id} {...informs}></BrandFilter>
              })
              :
              [1, 2, 3].map((grains) => { return <FilterLoading key={grains}></FilterLoading> })}
          </div>

          <div ref={parentOfOffers} className='AllProductsPage__Filter__Right-Side__Offers'>
            <span>تخفیف دار باشه یا نه </span>
            {contextUser.offersTypes
              ?
              contextUser.offersTypes.map((informs) => {
                return <OfferFilter key={informs.id} {...informs}></OfferFilter>
              })
              :
              [1, 2, 3].map((grains) => { return <FilterLoading key={grains}></FilterLoading> })}
          </div>

          <button onClick={rmAllFiltersLogic} className='AllProductsPage__Filter__Right-Side__Rm-All-Filters'>حذف تمامی فیلتر ها </button>

        </div>
        {/* end right side  */}

        {/* start left side filter  */}
        <div className='AllProductsPage__Filter__Left-Side'>
          <input placeholder='دنبال چه نوع نوشیدنی هستی ؟' type="text" onChange={changeAllProductsSearchInput} value={contextUser.searchInput} />

          <div className='AllProductsPage__Filter__Left-Side__Show-All-Products'>
            {
              contextUser.filteredProducts
                ?
                contextUser.filteredProducts?.length
                  ?
                  contextUser.filteredProducts.map(products => <AllProductsComp key={products.id} {...products}></AllProductsComp>)
                  :
                  <span className='AllProductsPage__Filter__Left-Side__Show-All-Products__Not-Found'>هیچ محصولی موجود نیست </span>
                :
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((products) => { return <AllProdLoading key={products}></AllProdLoading> })
            }
          </div>

        </div>
        {/* end left side filter  */}

      </div>

      <div className='SpaceAllProducts'></div>

      <Footer></Footer>
    </section >

  )
}

