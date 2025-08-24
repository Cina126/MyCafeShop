import React from 'react'
import "./Footer.css";
import GhahvePng from './../../../../src/StaticImages/Other/coffee-beans.png'
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
export default function Footer() {
    return (
        <section className='Footer'>
            <div className='Footer__Top-Side'>
                <div className='Footer__Top-Side__Discriptions'>
                    <img src={GhahvePng} alt="" />
                    <span>
                        ما بر آنیم تا با پیشرو بودن در فرایند
                        تولید ريا، نوع و کیفیت محصول ،الگویی برای تولید کنندگان ایرانی باشیم
                        و به مرجع قهوه در ایران تبدیل شویم
                        می پنداریم که نظر مردم عزیز ایران نسبت به کالای ایرانی بهبود یابد
                        و ما در این راستا میکوشیم
                        ما بر آنیم تا با پیشرو بودن در فرایند
                        تولید ريا، نوع و کیفیت محصول ،الگویی برای تولید کنندگان ایرانی باشیم
                        و به مرجع قهوه در ایران تبدیل شویم
                        می پنداریم که نظر مردم عزیز ایران نسبت به کالای ایرانی بهبود یابد
                        و ما در این راستا میکوشیم
                    </span>
                </div>
                <div className='Footer__Top-Side__Access'>
                    <span className='Footer__Top-Side__Access__Title'>دسترسی سریع</span>
                    {/* <ul> */}
                        <li>حریم خصوصی</li>
                        <li>عودت کالا</li>
                        <li>شرایط استفاده</li>
                        <li>شرایط استفاده</li>
                        <li>ثبت سفارش</li>
                        <li>حریم خصوصی</li>
                        <li>عودت کالا</li>
                    {/* </ul> */}
                </div>
                <div className='Footer__Top-Side__Call'>
                    <span className='Footer__Top-Side__Call__Title'>در تماس باشیم</span>
                    <span>بلوار میرداماد ،خیابان البرز ،کوچه قبادیان پلاک 21</span>
                    <span>sinarezaee091@gmail.com</span>
                    <div className='Footer__Top-Side__Call__Btns'>
                        <button className='Footer__Top-Side__Call__Instagram'>
                            <InstagramIcon></InstagramIcon>
                            Golden-Coffe@
                        </button>
                        <button className='Footer__Top-Side__Call__Telegram'>
                            <TelegramIcon></TelegramIcon>
                            Golden-Coffe-Io@
                        </button>
                    </div>
                </div>
            </div>
            <div className='Footer__Bottom-Side'>
                <span className='Footer__Bottom-Side__Persian-Copyright'>
                    تمامی حقوق این رابط کاربری
                    متعلق به شخص <span className='Sina'>سید سینا سید رضایی </span> است
                    و هرگونه کپی برداری پیگرد قانونی دارد
                </span>
                <span className='Footer__Bottom-Side__English-Copyright'>
                    copyright@2025 Golden Coffe . All Rights Reserved .
                </span>
            </div>
        </section>
    )
}
