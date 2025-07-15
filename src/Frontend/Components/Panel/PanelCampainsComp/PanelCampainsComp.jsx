import React from 'react';
import './PanelCampainsComp.css';

export default function PanelCampainsComp({ id, name, image, price, offPrice }) {
    return (
        <div className='PanelCampainsComp' id={id}>
            <img className='PanelCampainsComp__Img' src={image} alt="" />
            <span className='PanelCampainsComp__Name'>{name}</span>
            <span className='PanelCampainsComp__Price'>{Number(price).toLocaleString()} تومان</span>
            <span className='PanelCampainsComp__Off-Proce'>{Number(offPrice).toLocaleString()} تومان</span>
        </div>
    )
}
