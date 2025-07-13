import React, { useContext } from 'react'
import './PanelProductsComp.css';
import { context } from '../../../Context/Context';
import swal from 'sweetalert';

export default function PanelProductsComp({ id, name, image, price, offPrice, isLoaded }) {

    const contextUser = useContext(context);

    async function editProductLogic() {
        try {
            const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/allProducts/${id}`)
            if (Fetch.ok) {
                const Json = await Fetch.json();
                contextUser.setEditProductModal({ situation: true, productID: Json[0].id });
                contextUser.setEditNameOfProduct(Json[0].name)
                contextUser.setEditPriceOfProduct(Number(String(Json[0].price).replaceAll(",", "")).toLocaleString())
                contextUser.setEditImageOfProduct(Json[0].image)
                contextUser.setEditoffPrecentOfProduct(Json[0].offPrecent)
                contextUser.setEditproductCountOfProduct(Json[0].productCount)
                contextUser.setEditnumberOfSellOfProduct(Json[0].numberOfSell)
                contextUser.setBrandTypeSelectEdited(Json[0].caffeType)
                contextUser.setGrainTypeSelectEdited(Json[0].grainType)
                contextUser.setEditDiscOfProduct(Json[0].disc)
            }
        } catch (error) {
            swal({
                title: `خطا در دیافت اطلاعات محصول `,
                buttons: "تلاش دوباره",
                icon: "error"
            });
        }
    }

    async function deleteProductLogic() {
        swal({
            title: `محصول حذف شود ؟`,
            buttons: ["انصراف", "حذف"],
            icon: "warning"
        }).then(async res => {
            if (res) {
                const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/deleteProduct/${id}`, {
                    method: "DELETE"
                });
                if (Fetch.ok) {
                    swal({
                        title: `محصول با موفقیت حذف شد`,
                        buttons: "اوکی",
                        icon: "success"
                    }).then(res => { contextUser.setAllProductsFlag(prev => !prev) })
                }
            }
        })
    }

    if (isLoaded) {
        return (
            <div id={id} className='PanelProductsComp'>
                <img className='PanelProductsComp__Img' src={image} alt="" />
                <span className='PanelProductsComp__Name'>{name}</span>
                <span className='PanelProductsComp__Price'>{Number(String(price).replaceAll(",", "")).toLocaleString()} تومان</span>
                <span className='PanelProductsComp__OffPrice'>{Number(String(offPrice).replaceAll(",", "")).toLocaleString()} تومان</span>
                <button className='PanelProductsComp__Delete' onClick={deleteProductLogic}>حذف</button>
                <button className='PanelProductsComp__Edit' onClick={editProductLogic}>ویرایش</button>
            </div>
        )
    } else {
        return (
            <div id={id} className='PanelProductsComp'>
                <div className='PanelProductsComp__Img skeleton' />
                <div className='PanelProductsComp__Name skeleton'></div>
                <div className='PanelProductsComp__Price skeleton'> </div>
                <div className='PanelProductsComp__OffPrice skeleton'></div>
                <div className='PanelProductsComp__Delete skeleton'></div>
                <div className='PanelProductsComp__Edit skeleton'></div>
            </div>
        )
    }


}
