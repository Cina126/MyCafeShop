import React, { useContext } from 'react'
import Context from './../../Context/Context'
import './FilterSection.css'
export default function FilterSection({ id, sectionId, text, isChecked, data_name }) {

    const contextUser = useContext(Context);
    let changeSituation = null;

    function changeRadioLogic(event) {        

        if (event.target.name === "Type") {
            changeSituation = contextUser.grainTypes
            for (let x of changeSituation) {
                x.isChecked = false
                if (+x.id === +event.target.id) {
                    x.isChecked = true
                    contextUser.setGrainTypes([...changeSituation]);
                    contextUser.setCoffeGrainFinalType(event.target.dataset.name);
                    // why break create bogs ????
                    
                }
            }

        } else if (event.target.name === "Brands") {
            changeSituation = contextUser.brands
            for (let x of changeSituation) {
                x.isChecked = false
                if (+x.id === +event.target.id) {
                    x.isChecked = true
                    contextUser.setBrands([...changeSituation]);
                    contextUser.setCoffeBrandsFinalType(event.target.dataset.name);
                    // why break create bogs ????
                }
            }

        } else {
            changeSituation = contextUser.offers
            for (let x of changeSituation) {
                x.isChecked = false
                if (+x.id === +event.target.id) {
                    x.isChecked = true
                    contextUser.setOffers([...changeSituation]);
                    contextUser.setCoffeOfferFinalType(event.target.dataset.name);
                    // why break create bogs ????
                }
            }
        }

    }
    return (
        <section className='FilterSection'>
            {isChecked
                ? <input onChange={changeRadioLogic} type="radio" id={id} name={sectionId} data-name={data_name} checked/>
                : <input onChange={changeRadioLogic} type="radio" id={id} name={sectionId} data-name={data_name}/>
            }
            <label htmlFor={id}>{text}</label>
        </section>
    )
}
