import './Categories.css';

export default function Categories({ image, title, isLoaded }) {
  if (isLoaded) {
    return (
      <section className='Categories'>
        <img src={image} alt={title} />
        <span>{title}</span>
      </section>
    )
  } else {
    return (
      <section className='Categories loading'>
        <span className='loader'></span>
      </section>
    )
  }

}
