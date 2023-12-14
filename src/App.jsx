import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <div className="admin">
        <div className="admin__container container">
          <div className="admin__wrapper">
            <form className='admin__form create-category' action="">
              <p className='admin__title'>Описание карточки</p>
              <input className='admin__inputs create-category__inputs' id='name' type="text" placeholder='Название' />
              <textarea className='admin__input create-category__textarea' name="" id="textarea" cols="30" rows="10" placeholder='Описание'></textarea>
              <input className='admin__inputs create-category__inputs' type="text" placeholder='Цвет #FFFFFF' />
              <input className='admin__inputs create-category__inputs' type="text" placeholder='Название цвета' />
              <input className='admin__inputs create-category__inputs' type="text" placeholder='Код продукта' />
            </form>

            <form className='admin__form main-image' action="">
              <p className='admin__title'>Загрузаить главную картинку</p>
              <input className='admin__inputs main-image__input' type="file" />
            </form>

            <form className='admin__form little-images' action="">
              <p className='admin__title'>Загрузаить маленькие картинки</p>
              <input className='admin__inputs little-images__input' type="file" multiple />
            </form>

            <form className='admin__form firstB-img' action="">
              <p className='admin__title'>360deg фото верхняя</p>
              <input className='admin__inputs firstB-img__input' type="file" multiple />
            </form>

            <form className='admin__form secondB-img' action="">
              <p className='admin__title'>360deg фото нижняя</p>
              <input className='admin__inputs secondB-img__input' type="file" multiple />
            </form>

          </div>
          <button className='admin__btn'>Отправить</button>
        </div>
      </div>
    </>
  )
}