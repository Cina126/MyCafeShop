/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */


import React, { useContext, useEffect } from 'react'
import './Main.css'
import { useNavigate } from 'react-router-dom'
import { context } from '../../../Context/Context';
import { Swiper, SwiperSlide } from 'swiper/react'
import Typewriter from 'typewriter-effect';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// start import components 
import HeaderPc from '../../../Components/Shop/HeaderPc/HeaderPc';
import HeaderPhone from '../../../Components/Shop/HeaderPhone/HeaderPhone'
import TwoSuggested from '../../../Components/Shop/TwoSuggessted/TwoSuggested'
import MainPageProducts from '../../../Components/Shop/MainPageProducts/MainPageProducts'
import Categories from '../../../Components/Shop/Categories/Categories';
import CafeClubComp from '../../../Components/Shop/CafeClubComp/CafeClubComp';
import Footer from '../../../Components/Shop/Footer/Footer';
import Notice from './../../../Components/Shop/Notice/Notice';
import CampainComp from './../../../Components/Shop/CampainComp/CampainComp';
import MainPageProductsLoading from './../../../Components/ShopLoading/MainPageProductsLoading/MainPageProductsLoading';
import TwoSuggestLoading from './../../../Components/ShopLoading/TwoSuggestLoading/TwoSuggestLoading';
import CategoriesLoading from './../../../Components/ShopLoading/CategoriesLoading/CategoriesLoading';
// end import components 

// start icons
import CallIcon from '@mui/icons-material/Call';
// end icons

// start submit order images
import Cup from './../../../../src/StaticImages/TwoSection/twosec2.jpg'
import Bean from './../../../../src/StaticImages/Other/coffee-beans.png'
import { A11y, Navigation, Scrollbar, Pagination, Autoplay, } from 'swiper/modules';
import HiddenMenue from '../../../Components/Shop/HiddenMenue/HiddenMenue';
// end submit order images;

export default function Main() {

    const navigate = useNavigate();
    const contextUser = useContext(context)

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev);
        contextUser.setAllProductsFlag(prev => !prev);
        contextUser.setCafeClubFlag(prev => !prev);
        contextUser.setPanelNoticesFlag(prev => !prev);
        contextUser.setIsOpenHiddenMeues(false)
    }, []);

    useEffect(() => {

        const allProducts = contextUser.allProducts ? contextUser.allProducts : [];
        let filterNewests = [];
        let filterMost = [];

        if (allProducts?.length) {
            const sorterNewest = [...allProducts].sort((a, b) => {
                return b.id - a.id
            });
            const sorterMostSell = [...allProducts].sort((a, b) => {
                return b.numberOfSell - a.numberOfSell
            });
            for (let x = 0; x < 8; ++x) {
                filterNewests.push(sorterNewest[x])
            }
            for (let x = 0; x < 8; ++x) {
                filterMost.push(sorterMostSell[x])
            }
            contextUser.setNewestProducts(filterNewests)
            contextUser.setMostSell(filterMost)
        }

    }, [contextUser.allProducts]);

    return (
        <section className='Main'>
            {/* start add notices comp  */}
            {
                contextUser.panelNotices
                    ?
                    contextUser.panelNotices.map(notice => <Notice isLoaded={true} key={notice.id} {...notice}></Notice>)
                    :
                    ""
            }
            {/* ens add notices comp  */}

            {/* start campains comp  */}
            {
                contextUser.panelCampains
                    ?
                    contextUser.panelCampains.map(campain => <CampainComp key={campain.id} {...campain}></CampainComp>)
                    :
                    ""
            }
            {/* end campains comp  */}

            {/* start headers comp  */}
            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>
            {/* end headers comp  */}


            {contextUser.isOpenHiddenMeues ? <HiddenMenue style={{ right: "0" }}></HiddenMenue> : <HiddenMenue style={{ right: "-100%" }}></HiddenMenue>}

            {/* start body section */}
            <div className='Main__Body'>
                <div className='Main__Body__Text-Container'>
                    <span className='Main__Body__Text-Container__Big-Font'>

                        <Typewriter
                            options={{ delay: 45 }}
                            onInit={(typewriter) => {
                                typewriter.typeString('قهوه عربیکا تانزانیا')
                                    .pauseFor(2500)
                                    .start()
                            }}
                        />
                        
                    </span>
                    <span className='Main__Body__Text-Container__Mid-Font'>یک فنجان بالانس</span>
                    <div className='Main__Body__Text-Container__Line'></div>
                    <span className='Main__Body__Text-Container__Litt-Font'>قطعا نام آشنای عربیکا را شنیده ایدعربیکا یکی از گونه های قهوه است که در جهان کشت میشود</span>
                </div>
            </div>
            {/* end body section */}

            {/* start show products sections */}
            <div className='Main__Show-Products-Container'>

                <div className='Main__Show-Products-Container__New-Products-Container'>
                    <span className='Main__Show-Products-Container__New-Products-Container__Title'>جدید ترین محصولات</span>

                    <div className='Main__Show-Products-Container__New-Products-Container__Bottom'>
                        <span>فراوری شده از دانه قهوه </span>
                        <span onClick={() => { navigate("/AllProducts") }}>مشاهده همه محصولات</span>
                    </div>

                    {/* start slider of newest products products----------------------------------------------------------------------------------------- */}
                    {
                        contextUser.newestProducts.length
                            ?
                            <Swiper
                                style={{ width: "100%" }}
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={"15"}
                                slidesPerView={
                                    (contextUser.windowSize > 1000) ? 4 :
                                        (1000 >= contextUser.windowSize && contextUser.windowSize > 650) ? 3 :
                                            (650 >= contextUser.windowSize && contextUser.windowSize > 280) ? 2 :
                                                "1"
                                }
                                pagination={{ clickable: true, type: 'bullets' }}
                                scrollbar={{ draggable: true }}
                                navigation={true}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                            >
                                {
                                    contextUser.newestProducts.map((products) => {
                                        return (
                                            <SwiperSlide className='Slider' key={products.id}>
                                                <MainPageProducts {...products}></MainPageProducts>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            :
                            <Swiper
                                style={{ width: "100%" }}
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={"15"}
                                slidesPerView={
                                    (contextUser.windowSize > 1000) ? 4 :
                                        (1000 >= contextUser.windowSize && contextUser.windowSize > 650) ? 3 :
                                            (650 >= contextUser.windowSize && contextUser.windowSize > 280) ? 2 :
                                                "1"
                                }
                                pagination={{ clickable: true, type: 'bullets' }}
                                scrollbar={{ draggable: true }}
                                navigation={true}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                            >
                                {
                                    [1, 2, 3, 4].map((products) => {
                                        return (
                                            <SwiperSlide className='Slider' key={products}>
                                                <MainPageProductsLoading></MainPageProductsLoading>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                    }
                    {/* start slider of newest products products----------------------------------------------------------------------------------------- */}


                </div>

                <div className='Main__Show-Products-Container__Two-Suggessted'>
                    {
                        contextUser.twoSideCategories
                            ?
                            contextUser.twoSideCategories.map((informs) => {
                                return <TwoSuggested key={informs.id} {...informs}></TwoSuggested>
                            })
                            :
                            [1, 2].map((informs) => { return <TwoSuggestLoading key={informs}></TwoSuggestLoading> })
                    }
                </div>

                <div className='Main__Show-Products-Container__Categories'>
                    {
                        contextUser.cupCategories
                            ?
                            contextUser.cupCategories.map((informs) => {
                                return <Categories key={informs.id} {...informs}></Categories>
                            })
                            :
                            [1, 2, 3, 4, 5].map((informs) => { return <CategoriesLoading key={informs}></CategoriesLoading> })
                    }

                </div>

                <div className='Main__Show-Products-Container__Most-Buyer-Products'>

                    <div className='Main__Show-Products-Container__Most-Buyer-Products__Title'>
                        <span className='Main__Show-Products-Container__Most-Buyer-Products__Title__Big'>محصولات پر فروش</span>
                        <span className='Main__Show-Products-Container__Most-Buyer-Products__Title__Litt'>پیشنهاد قهوه خورها</span>
                    </div>

                    {/* start slider of most sell products----------------------------------------------------------------------------------------- */}
                    {
                        contextUser.mostSell.length
                            ?
                            <Swiper
                                style={{ width: "100%" }}
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={"15"}
                                slidesPerView={
                                    (contextUser.windowSize > 1000) ? 4 :
                                        (1000 >= contextUser.windowSize && contextUser.windowSize > 650) ? 3 :
                                            (650 >= contextUser.windowSize && contextUser.windowSize > 280) ? 2 :
                                                "1"
                                }
                                pagination={{ clickable: true, type: 'bullets' }}
                                scrollbar={{ draggable: true }}
                                navigation={true}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                            >
                                {
                                    contextUser.mostSell.map((products) => {
                                        return (
                                            <SwiperSlide className='Slider' key={products.id}>
                                                <MainPageProducts {...products}></MainPageProducts>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            :
                            <Swiper
                                style={{ width: "100%" }}
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={"15"}
                                slidesPerView={
                                    (contextUser.windowSize > 1000) ? 4 :
                                        (1000 >= contextUser.windowSize && contextUser.windowSize > 650) ? 3 :
                                            (650 >= contextUser.windowSize && contextUser.windowSize > 280) ? 2 :
                                                "1"
                                }
                                pagination={{ clickable: true, type: 'bullets' }}
                                scrollbar={{ draggable: true }}
                                navigation={true}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                            >
                                {
                                    [1, 2, 3, 4].map((products) => {
                                        return (
                                            <SwiperSlide className='Slider' key={products}>
                                                <MainPageProductsLoading></MainPageProductsLoading>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>

                    }
                    {/* start slider of most sell products----------------------------------------------------------------------------------------- */}
                </div>

                <div className='Main__Show-Products-Container__Coffee-Club'>

                    <div className='Main__Show-Products-Container__Coffee-Club__Right-Side'>
                        <img src={Bean} alt="" />
                        <div className='Main__Show-Products-Container__Coffee-Club__Right-Side__Titles'>
                            <span className='Main__Show-Products-Container__Coffee-Club__Right-Side__Titles__Big-Text'>کافــــی کــلاب</span>
                            <span className='Main__Show-Products-Container__Coffee-Club__Right-Side__Titles__Litt-Text'>میدونستــــی میتونــــی با امتیاز هات قهوه بگیرــــی ؟</span>
                        </div>
                    </div>

                    <div className='Main__Show-Products-Container__Coffee-Club__Mid-Side'>
                        {
                            contextUser.cafeClub
                                ?
                                contextUser.cafeClub.map((informs) => {
                                    return <CafeClubComp key={informs.id} {...informs}></CafeClubComp>
                                })
                                :
                                ""
                        }
                    </div>

                    <div className='Main__Show-Products-Container__Coffee-Club__Left-Side'>
                        <span className='Main__Show-Products-Container__Coffee-Club__Left-Side__Number'>542</span>
                        <span className='Main__Show-Products-Container__Coffee-Club__Left-Side__Text'>امتیاز شما</span>
                        <button>دریافت جایزه</button>
                    </div>

                </div>

                <div className='Main__Show-Products-Container__Submit-Order'>
                    <img src={Cup} alt="" />
                    <div className='Main__Show-Products-Container__Submit-Order__Left-Side'>
                        <span className='Main__Show-Products-Container__Submit-Order__Left-Side__Big-Font'>یکی از بهترین قهوه ها</span>
                        <span>کیفیت قهوه را از ما بخواهید</span>
                        <span>......</span>
                        <span>فضای گرم و دنج مارا احساس کنید ، جایی که همه میتوانند قهوه مورد علاقه خودرا پیدا کنند و دسر های خوشمزه مارا امتحان کنند ، فضاای داخلی شیک و کارکنان خوش برخورد روز شمارا میسازد</span>
                        <button>
                            <CallIcon></CallIcon>
                            ثبت سفارش تلفن
                        </button>
                    </div>
                </div>

            </div>
            {/* start show products sections */}
            <Footer></Footer>
        </section>
    )
}