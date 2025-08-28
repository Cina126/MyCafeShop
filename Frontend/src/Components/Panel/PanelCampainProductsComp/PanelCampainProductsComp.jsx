import React, { useContext } from 'react'
import './PanelCampainProductsComp.css';
import { context } from '../../../Context/Context';

export default function PanelCampainProductsComp({ id, image, name, isLoaded }) {

    const contextUser = useContext(context)

    function changeValueLogic() {
        if (contextUser.productsInCampains.includes(id)) {
            contextUser.setProductsInCampains(prev => prev.filter(ids => ids !== id))
        } else {
            contextUser.setProductsInCampains(prev => [...prev, id])
        }
    }

    if (isLoaded) {
        return (
            <div className='PanelCampainProductsComp' id={id}>
                <img className='PanelCampainProductsComp__Img' src={image} alt="" />
                <span className='PanelCampainProductsComp__Name'>{name}</span>
                {
                    contextUser.productsInCampains.includes(id)
                        ?
                        <input onChange={changeValueLogic} className='PanelCampainProductsComp__Check' type="checkbox" checked={true} />
                        :
                        <input onChange={changeValueLogic} className='PanelCampainProductsComp__Check' type="checkbox" checked={false} />
                }
            </div>
        )
    } else {
        return (
            <div className='PanelCampainProductsComp skeleton' id={id}></div>
        )
    }

}
