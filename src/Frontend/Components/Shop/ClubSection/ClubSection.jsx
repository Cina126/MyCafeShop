import React from 'react'
import  './ClubSection.css'
export default function ClubSection({children, text ,isLoaded}) {
  return (
    <section className='ClubSection'>
      {children}
      <span>{text}</span>
    </section>
  )
}
