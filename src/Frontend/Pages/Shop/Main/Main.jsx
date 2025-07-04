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
import Categories from '../../../Components/Shop/Categories/Categories'
import Footer from '../../../Components/Shop/Footer/Footer';
// end import components 

// start icons
import CallIcon from '@mui/icons-material/Call';
// end icons

// start submit order images
import Cup from './../../../../StaticImages/TwoSection/twosec2.jpg'
import Bean from './../../../../StaticImages/Other/coffee-beans.png'
import Skeleton from '../../../Components/Shop/Skeleton/Skeleton';
import { A11y, Navigation, Scrollbar, Pagination, Autoplay, } from 'swiper/modules';
// end submit order images;

export default function Main() {

    const navigate = useNavigate();
    const contextUser = useContext(context)

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev);
        contextUser.setAllProductsFlag(prev => !prev);
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
        <section className='App'>

            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>

            {/* start body section */}
            <div className='App__Body'>
                <div className='App__Body__Text-Container'>
                    <span className='App__Body__Text-Container__Big-Font'>
                        <Typewriter
                            options={{ delay: 45 }}
                            onInit={(typewriter) => {
                                typewriter.typeString('قهوه عربیکا تانزانیا')
                                    .pauseFor(2500)
                                    .start()
                            }}
                        />
                    </span>
                    <span className='App__Body__Text-Container__Mid-Font'>یک فنجان بالانس</span>
                    <div className='App__Body__Text-Container__Line'></div>
                    <span className='App__Body__Text-Container__Litt-Font'>قطعا نام آشنای عربیکا را شنیده ایدعربیکا یکی از گونه های قهوه است که در جهان کشت میشود</span>
                </div>
            </div>
            {/* end body section */}

            {/* start show products sections */}
            <div className='App__Show-Products-Container'>

                <div className='App__Show-Products-Container__New-Products-Container'>
                    <h1 className='App__Show-Products-Container__New-Products-Container__Title'>جدید ترین محصولات</h1>
                    <div className='App__Show-Products-Container__New-Products-Container__Bottom'>
                        <span>فراوری شده از دانه قهوه </span>
                        <span onClick={() => { navigate("/AllProducts") }}>مشاهده همه محصولات</span>
                    </div>

                    <Swiper
                        style={{ width: "100%" }}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={"15"}
                        slidesPerView={4
                            // (contextUser.windowSize > 1000) ? 4 :
                            //     (1200 > contextUser.windowSize && contextUser.windowSize > 600) ? 3 :
                            //         "2"
                        }
                        pagination={{ clickable: true, type: 'bullets' }}
                        scrollbar={{ draggable: true }}
                        navigation={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                        {contextUser.newestProducts ? contextUser.newestProducts.map((products) => {
                            return (
                                <SwiperSlide className='Slider' key={products.id}>
                                    <MainPageProducts {...products} isLoaded={true}></MainPageProducts>
                                    {/* <span>salam</span> */}
                                </SwiperSlide>
                            )
                        }) : [1, 2, 3, 4, 5, 6, 7, 8].map((informs) => { return <Skeleton></Skeleton> })}
                    </Swiper>

                </div>

                <div className='App__Show-Products-Container__Two-Suggessted'>
                    {contextUser.twoSideCategories ? contextUser.twoSideCategories.map((informs) => {
                        return <TwoSuggested isLoaded={true} key={informs.id} {...informs}></TwoSuggested>
                    }) : [1, 2].map((informs) => { return <TwoSuggested isLoaded={false} key={informs}></TwoSuggested> })}
                </div>

                <div className='App__Show-Products-Container__Categories'>
                    {contextUser.cupCategories ? contextUser.cupCategories.map((informs) => {
                        return <Categories isLoaded={true} key={informs.id} {...informs}></Categories>
                    }) : [1, 2, 3, 4, 5].map((informs) => { return <Categories isLoaded={false} key={informs}></Categories> })}

                </div>

                <div className='App__Show-Products-Container__Most-Buyer-Products'>
                    <div className='App__Show-Products-Container__Most-Buyer-Products__Title'>
                        <h1>محصولات پر فروش</h1>
                        <span>پیشنهاد قهوه خورها</span>
                    </div>
                    <Swiper
                        style={{ width: "100%" }}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={"15"}
                        slidesPerView={(contextUser.windowSize > 1200) ? 4 :
                            (1200 > contextUser.windowSize && contextUser.windowSize > 800) ? 3 :
                                "2"}
                        pagination={{ clickable: true, type: 'bullets' }}
                        scrollbar={{ draggable: true }}
                        navigation={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                        {contextUser.mostSell ? contextUser.mostSell.map((products) => {
                            return (
                                <SwiperSlide className='Slide' key={products.id}>
                                    <MainPageProducts {...products} isLoaded={true}></MainPageProducts>
                                    {/* <span>salam</span> */}
                                </SwiperSlide>
                            )
                        }) : [1, 2, 3, 4, 5, 6, 7, 8].map((informs) => { return <Skeleton></Skeleton> })}
                    </Swiper>
                </div>

                <div className='App__Show-Products-Container__Coffee-Club'>

                    <div className='App__Show-Products-Container__Coffee-Club__Right-Side'>
                        <img src={Bean} alt="" />
                        <div className='App__Show-Products-Container__Coffee-Club__Right-Side__Titles'>
                            <span className='App__Show-Products-Container__Coffee-Club__Right-Side__Titles__Big-Text'>کافــــی کــلاب</span>
                            <span className='App__Show-Products-Container__Coffee-Club__Right-Side__Titles__Litt-Text'>میدونستــــی میتونــــی با امتیاز هات قهوه بگیرــــی ؟</span>
                        </div>
                    </div>

                    <div className='App__Show-Products-Container__Coffee-Club__Left-Side'>
                        <div className='App__Show-Products-Container__Coffee-Club__Left-Side__Three-Sections'>
                            {/* {contextUser?.coffeClub?.map((informs) => {
                                return <ClubSection key={informs.id} {...informs}><informs.icon></informs.icon></ClubSection>
                            })} */}
                        </div>
                        <div className='App__Show-Products-Container__Coffee-Club__Left-Side__Prize'>
                            <span className='App__Show-Products-Container__Coffee-Club__Left-Side__Prize__Number'>542</span>
                            <span className='App__Show-Products-Container__Coffee-Club__Left-Side__Prize__Text'>امتیاز شما</span>
                            <button>دریافت جایزه</button>
                        </div>
                    </div>

                </div>
                {/* 
                <div className='App__Show-Products-Container__Readable-Content'>
                    <h1>مطالب خواندنی</h1>
                    <div className='App__Show-Products-Container__Readable-Content__Contains'>
                        {!isLoadingReadableArticles ? readableArticles.map((informs) => {
                            return <ReadableContent key={informs.id} {...informs}></ReadableContent>
                        }) : [1, 2, 3, 4].map((informs) => { return <Skeleton baseColor="var(--products-background)" highlightColor='var(--skeketon-animation)' height={350} width={292} key={informs}></Skeleton> })}
                    </div>
                </div> */}

                <div className='App__Show-Products-Container__Submit-Order'>
                    <img src={Cup} alt="" />
                    <div className='App__Show-Products-Container__Submit-Order__Left-Side'>
                        <span className='App__Show-Products-Container__Submit-Order__Left-Side__Big-Font'>یکی از بهترین قهوه ها</span>
                        <span>کیفیت قهوه را از ما بخواهید</span>
                        <span>......</span>
                        <span>فضای گرم و دنج مارا احساس کنید ، جایی که همه میتوانند قهوه مورد علاقه خودرا پیدا کنند و دسر های خوشمزه مارا امتحان کنند ، فضاای داخلی شیک و کارکنان خوش برخورد روز شمارا میسازد</span>
                        <button>
                            <CallIcon></CallIcon>
                            ثبت سفارش تلفن
                        </button>
                    </div>
                </div>
                <div className='App__Show-Products-Container__Services'>
                    {/* {contextUser?.services?.map((informs) => {
                        return <Services key={informs.id} {...informs}><informs.icon></informs.icon></Services>
                    })} */}

                </div>
            </div>
            {/* start show products sections */}
            <Footer></Footer>
        </section>
    )
}