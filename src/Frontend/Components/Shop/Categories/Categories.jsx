import './Categories.css';

export default function Categories({ image, title, isLoaded }) {
  if (isLoaded) {
    return (
      <section className='Categories'>
        <img className='Categories__img' src={image} alt={title} />
        <span className='Categories__span'>{title}</span>
      </section>
    )
  } else {
    return (
      <section className='Categories '>
        <div className='Categories__img skeleton circle'></div>
        <div className='Categories__span skeleton'></div>
      </section>
    )
  }

}
