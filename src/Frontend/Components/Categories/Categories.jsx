import  './Categories.css';

export default function Categories({image , title}) {
  return (
    <section className='Categories'>
      <img src={image} alt={title} />
      <span>{title}</span>
    </section>
  )
}
