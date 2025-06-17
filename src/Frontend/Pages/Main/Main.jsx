/* eslint-disable no-unused-vars */


import React, { createContext, useContext, useEffect } from 'react'
import './Main.css'
import { useNavigate } from 'react-router-dom'
import useGetFetch from '../../Functions/useGetFetch';
import context from './../../Context/Context';

// start import components 
import HeaderPc from '../../Components/HeaderPc/HeaderPc';
import HeaderPhone from '../../Components/HeaderPhone/HeaderPhone'
import TwoSuggested from './../../Components/TwoSuggessted/TwoSuggested'
import MainPageProducts from '../../Components/MainPageProducts/MainPageProducts'
import Categories from './../../Components/Categories/Categories'
import ReadableContent from './../../Components/ReadableContent/ReadableContent'
import Services from './../../Components/Services/Services'
import ClubSection from './../../Components/ClubSection/ClubSection'
import Footer from './../../Components/Footer/Footer';
// end import components 

// start icons
import CallIcon from '@mui/icons-material/Call';
// end icons

// start submit order images
import Cup from './../../../Images/Ghahve/TwoSection/twosec2.jpg'
import Bean from './../../../Images/Ghahve/Other/coffee-beans.png'
import useGetUserInforms from '../../Functions/useGetUserInforms';
// end submit order images;

export const mainPageContext = createContext()

export default function Main() {

    const navigate = useNavigate();
    const contextUser = useContext(context)

    useEffect(() => {
        contextUser.setUserInformsFlag(prev => !prev)
    }, [])



    return (
        <section className='App'>

            <HeaderPc></HeaderPc>
            <HeaderPhone></HeaderPhone>

            {/* start body section */}
            <div className='App__Body'>
                <div className='App__Body__Text_Container'>
                    <span className='App__Body__Text_Container__Big_Font'>قهوه عربیکا تانزانیا</span>
                    <span className='App__Body__Text_Container__Mid_Font'>یک فنجان بالانس</span>
                    <div className='App__Body__Text_Container__Line'></div>
                    <span className='App__Body__Text_Container__Litt_Font'>قطعا نام آشنای عربیکا را شنیده ایدعربیکا یکی از گونه های قهوه است که در جهان کشت میشود</span>
                </div>
            </div>
            {/* end body section */}

            {/* start show products sections */}
            <div className='App__Show_Products_Container'>

                <div className='App__Show_Products_Container__New_Products_Container'>
                    <h1 className='App__Show_Products_Container__New_Products_Container__Title'>جدید ترین محصولات</h1>
                    <div className='App__Show_Products_Container__New_Products_Container__Bottom'>
                        <span>فراوری شده از دانه قهوه </span>
                        <span onClick={() => { navigate("/AllProducts") }}>مشاهده همه محصولات</span>
                    </div>
                    <div className='App__Show_Products_Container__New_Products_Container__Products'>
                        {contextUser.newestProducts?.length ? contextUser.newestProducts.map((products) => {
                            return <MainPageProducts key={products.id} {...products} isLoaded={true}></MainPageProducts>
                        }) : [1, 2, 3, 4, 5, 6, 7, 8].map((informs) => { return <MainPageProducts key={informs} isLoaded={false}></MainPageProducts> })}
                    </div>
                </div>

                <div className='App__Show_Products_Container__Two_Suggessted'>
                    {contextUser.twoSideCategories?.length ? contextUser.twoSideCategories.map((informs) => {
                        return <TwoSuggested key={informs.id} {...informs}></TwoSuggested>
                    }) : [1, 2].map((informs) => { return <TwoSuggested baseColor="var(--products-background)" highlightColor='var(--skeketon-animation)' height="200px" width="600px" key={informs}></TwoSuggested> })}
                </div>

                <div className='App__Show_Products_Container__Categories'>
                    {contextUser.cupCategories?.length ? contextUser.cupCategories.map((informs) => {
                        return <Categories key={informs.id} {...informs}></Categories>
                    }) : [1, 2, 3, 4, 5].map((informs) => { return <Categories baseColor="var(--products-background)" highlightColor='var(--skeketon-animation)' height="150px" width="150px" borderRadius="50%" key={informs}></Categories> })}

                </div>

                <div className='App__Show_Products_Container__Most_Buyer_Products'>
                    <div className='App__Show_Products_Container__Most_Buyer_Products__Title'>
                        <h1>محصولات پر فروش</h1>
                        <span>پیشنهاد قهوه خورها</span>
                    </div>
                    <div className='App__Show_Products_Container__Most_Buyer_Products__Products'>
                        {contextUser.mostSell?.length ? contextUser.mostSell.map((products) => {
                            return <MainPageProducts key={products.id} {...products} isLoaded={true}></MainPageProducts>
                        }) : [1, 2, 3, 4].map((informs) => { return <MainPageProducts isLoaded={false} key={informs}></MainPageProducts> })}

                    </div>
                </div>

                <div className='App__Show_Products_Container__Coffee_Club'>

                    <div className='App__Show_Products_Container__Coffee_Club__Right_Side'>
                        <img src={Bean} alt="" />
                        <div className='App__Show_Products_Container__Coffee_Club__Right_Side__Titles'>
                            <span className='App__Show_Products_Container__Coffee_Club__Right_Side__Titles__Big_Text'>کافــــی کــلاب</span>
                            <span className='App__Show_Products_Container__Coffee_Club__Right_Side__Titles__Litt_Text'>میدونستــــی میتونــــی با امتیاز هات قهوه بگیرــــی ؟</span>
                        </div>
                    </div>

                    <div className='App__Show_Products_Container__Coffee_Club__Left_Side'>
                        <div className='App__Show_Products_Container__Coffee_Club__Left_Side__Three_Sections'>
                            {/* {contextUser?.coffeClub?.map((informs) => {
                                return <ClubSection key={informs.id} {...informs}><informs.icon></informs.icon></ClubSection>
                            })} */}
                        </div>
                        <div className='App__Show_Products_Container__Coffee_Club__Left_Side__Prize'>
                            <span className='App__Show_Products_Container__Coffee_Club__Left_Side__Prize__Number'>542</span>
                            <span className='App__Show_Products_Container__Coffee_Club__Left_Side__Prize__Text'>امتیاز شما</span>
                            <button>دریافت جایزه</button>
                        </div>
                    </div>

                </div>
                {/* 
                <div className='App__Show_Products_Container__Readable_Content'>
                    <h1>مطالب خواندنی</h1>
                    <div className='App__Show_Products_Container__Readable_Content__Contains'>
                        {!isLoadingReadableArticles ? readableArticles.map((informs) => {
                            return <ReadableContent key={informs.id} {...informs}></ReadableContent>
                        }) : [1, 2, 3, 4].map((informs) => { return <Skeleton baseColor="var(--products-background)" highlightColor='var(--skeketon-animation)' height={350} width={292} key={informs}></Skeleton> })}
                    </div>
                </div> */}

                <div className='App__Show_Products_Container__Submit_Order'>
                    <img src={Cup} alt="" />
                    <div className='App__Show_Products_Container__Submit_Order__Left_Side'>
                        <span className='App__Show_Products_Container__Submit_Order__Left_Side__Big_Font'>یکی از بهترین قهوه ها</span>
                        <span>کیفیت قهوه را از ما بخواهید</span>
                        <span>......</span>
                        <span>فضای گرم و دنج مارا احساس کنید ، جایی که همه میتوانند قهوه مورد علاقه خودرا پیدا کنند و دسر های خوشمزه مارا امتحان کنند ، فضاای داخلی شیک و کارکنان خوش برخورد روز شمارا میسازد</span>
                        <button>
                            <CallIcon></CallIcon>
                            ثبت سفارش تلفن
                        </button>
                    </div>
                </div>
                <div className='App__Show_Products_Container__Services'>
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
