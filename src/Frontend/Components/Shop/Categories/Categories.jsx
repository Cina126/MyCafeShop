import './Categories.css';

export default function Categories({ image, title }) {
  return (
    <section className='Categories'>
      <img className='Categories__img' src={image} alt={title} />
      <span className='Categories__span'>{title}</span>
    </section>
  )
}
