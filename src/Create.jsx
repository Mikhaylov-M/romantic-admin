

const Create = () => {
  return (
    <div className="create">
      <div className="create__container container">
        <div className="create__wrapper">
          <form className="create__form" action="">
            <p className="create__title">Загрузить фото</p>
            <input className="create__inputs" type="text" placeholder="Название" />
            <textarea className="create__inputs create__inputs--textarea" name="" id="" cols="30" rows="10" placeholder="Описание"></textarea>
            <input className="create__inputs" type="text" placeholder="Название цвета" />
            <input className="create__inputs" type="text" placeholder="Цвет #FFFFFF" />
            <input className="create__inputs" type="text" placeholder="Код продукта" />
          </form>

          <div className="create__block">
            <div className="create__inner">
              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото</p>
                <input className="create__inputs" type="file" placeholder="Главное фото" />
              </form>

              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото для меленьких блоков</p>
                <input className="create__inputs" type="file" placeholder="Главное фото" />
              </form>
            </div>
            <div className="create__inner">
              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото для 360</p>
                <input className="create__inputs" type="file" placeholder="Главное фото" multiple />
              </form>
              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото для 360</p>
                <input className="create__inputs" type="file" placeholder="Главное фото" multiple />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create