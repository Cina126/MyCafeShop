import React, { useContext } from 'react'
import './PanelProductsComp.css';
import { context } from '../../../Context/Context';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

export default function PanelProductsComp({ id, name, image, price, offPrice, isLoaded }) {

    const contextUser = useContext(context);

    async function editProductLogic() {
        try {
            contextUser.setIsLoadingRequest(true)
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
            console.log(error);
            toast.error("خطا در دیافت اطلاعات محصول ")
        } finally {
            contextUser.setIsLoadingRequest(false)
        }
    }

    async function deleteProductLogic() {
        swal({
            title: `محصول حذف شود ؟`,
            buttons: {
                cancel: "انصراف",
                confirm: {
                    text: "حذف",
                    value: true,
                    visible: true,
                    className: "swal-red-btn"
                },
            },
            icon: "warning"
        }).then(async res => {
            if (res) {
                try {
                    contextUser.setIsLoadingRequest(true)
                    const Fetch = await fetch(`http://localhost:7000/cafeAPI/products/deleteProduct/${id}`, {
                        method: "DELETE"
                    });
                    if (Fetch.ok) {
                        toast.success("محصول با موفقیت حذف شد")
                        contextUser.setAllProductsFlag(prev => !prev)
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("error")
                }
                finally {
                    contextUser.setIsLoadingRequest(false)
                }
            }
        })
    }

    if (isLoaded) {
        return (
            <div id={id} className='PanelProductsComp'>
                {
                    image !== "null"
                        ?
                        <img className='PanelProductsComp__Img' src={`http://localhost:7000${image}`} alt="" />
                        :
                        <img className='PanelProductsComp__Img' src={`Images/noImage.png`} alt="" />
                }
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
                <div style={{ height: "25px" }} className='PanelProductsComp__Name skeleton'></div>
                <div style={{ height: "25px" }} className='PanelProductsComp__Price skeleton'> </div>
                <div style={{ height: "25px" }} className='PanelProductsComp__OffPrice skeleton'></div>
                <div style={{ height: "25px" }} className='PanelProductsComp__Delete skeleton'></div>
                <div style={{ height: "25px" }} className='PanelProductsComp__Edit skeleton'></div>
            </div>
        )
    }


}
