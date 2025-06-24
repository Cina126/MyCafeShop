import React, { useContext } from 'react'
import './PanelProducts.css';
import context from './../../../Context/Context';
import swal from 'sweetalert';

export default function PanelProducts({ id, name, image, price, offPrice }) {

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
        const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/deleteProduct/${id}`, {
            method: "DELETE"
        });
        if (Fetch.ok) {
            swal({
                title: `محصول حذف شود ؟`,
                buttons: ["انصراف", "حذف"],
                icon: "warning"
            }).then((res) => {
                if (res) {
                    swal({
                        title: `محصول با موفقیت حذف شد`,
                        buttons: "اوکی",
                        icon: "success"
                    })
                    contextUser.setAllProductsFlag(prev => !prev)
                }
            });
        }
    }

    return (
        <div id={id} className='PanelProducts'>
            <img src={image} alt="" />
            <span className='PanelProducts__Name'>{name}</span>
            <span className='PanelProducts__Price'>{Number(String(price).replaceAll(",", "")).toLocaleString()} تومان</span>
            <span className='PanelProducts__OffPrice'>{Number(String(offPrice).replaceAll(",", "")).toLocaleString()} تومان</span>
            <button onClick={deleteProductLogic}>حذف</button>
            <button onClick={editProductLogic}>ویرایش</button>
        </div>
    )
}
