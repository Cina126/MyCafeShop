import React from 'react'
import './TwoSuggested.css';

export default function TwoSuggested({ image, title, disc }) {

  return (
    <section className='TwoSuggested' style={{ backgroundImage: `url(${image})` }}>
      <span className='TwoSuggested__Big-Text'>{title}</span>
      <span className='TwoSuggested__Litt-Text'>{disc}</span>
    </section>
  )
}
