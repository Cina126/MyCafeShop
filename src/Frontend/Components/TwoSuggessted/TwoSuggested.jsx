import React from 'react'
import './TwoSuggested.css'
export default function TwoSuggested({ image, title, disc ,isLoaded }) {
  return (
    <section className='TwoSuggested' style={{ backgroundImage: `url(${image})` }}>
      <span className='TwoSuggested__Big_Text'>{title}</span>
      <span className='TwoSuggested__Litt_Text'>{disc}</span>
    </section>
  )
}
