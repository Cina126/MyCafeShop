import './MainPageProductsLoading.css';

export default function MainPageProductsLoading() {
  return (
    <div className='MainPageProductsLoading'>
      
      <div className='MainPageProductsLoading__img skeleton'></div>
      <div className='MainPageProductsLoading__name-and-disc skeleton'></div>

      <div className='MainPageProductsLoading__price-section '>
        <div className='MainPageProductsLoading__price hasOff skeleton'></div>
        <div className='MainPageProductsLoading__offPrice skeleton'></div>
      </div>

      <div className='MainPageProductsLoading__Details'>

        <div className="MainPageProductsLoading__Details__Btns skeleton"></div>

        <div className="MainPageProductsLoading__Details__Btns skeleton" ></div>

        <div className='MainPageProductsLoading__Details__Btns skeleton'></div>

      </div>
    </div>
  )
}
