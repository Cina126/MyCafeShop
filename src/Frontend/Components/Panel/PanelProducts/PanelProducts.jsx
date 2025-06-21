import React from 'react'
import './PanelProducts.css';

export default function PanelProducts({ id, name, image, price, offPrice }) {
    return (
        <div id={id} className='PanelProducts'>
            <img src={image} alt="" />
            <span className='PanelProducts__Name'>{name}</span>
            <span className='PanelProducts__Price'>{price}</span>
            <span className='PanelProducts__OffPrice'>{offPrice}</span>
            <button>حذف</button>
            <button>ویرایش</button>
        </div>
    )
}
