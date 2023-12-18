import { useRef, useState } from "react";
import { axiosGet, url } from "./api/axios.request";
import axios from "axios";

const Create = () => {

  const [cardInfo, setCardInfo] = useState({
    name: '',
    description: '',
    color_description: '',
    color: '',
    product_code: ''
  })

  const cardId = useRef('')

  const [cardImages, setCardImages] = useState({
    mainImage: {},
    mainImages: {},
    firsBottom: {},
    secondBottom: {}
  })

  const sendInfo = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      }

      const body = {
        "name" : cardInfo.name,
        "description" : cardInfo.description,
        "color_description" : cardInfo.color_description,
        "color" : cardInfo.color,
        "product_code" : cardInfo.product_code
      }

      const { status, data } = await axios.post(`${url}/product/create`, body, {
        headers: headers
      })
      if (status === 201) {
        return data.id
      }
    } catch (error) {
      return error.message
    }
  }

  const sendMainImage = async () => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }

      const formData = {
        "file" : cardImages.mainImage,
      }
      const { status } = 
      await axios.post(`${url}/product/main-image/${cardId.current}`, formData, {
        headers: headers
      })
      return status
    } catch (error) {
      alert('Ошибка при загрузке картинки')
    }
  }

  const sendMainImages = async () => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }

      let formData = new FormData()
      for(let i = 0; i < cardImages.mainImages.length; i++) {
        formData.append('files', cardImages.mainImages[i])
      }

      const { status } =
      await axios.post(`${url}/product/main-images/${cardId.current}`, formData, {
        headers: headers
      })
      return status
    } catch (error) {
      alert('Ошибка при загрузке картинок')
    }
    }

  const createCard = async () => {
    try {
      cardId.current = await sendInfo()
      try {
        const status1 = await sendMainImage()
        const status2 = await sendMainImages()
        if (status1 === 201 && status2 === 201) {
          alert('Карточка создана и картинки загружены')
        }
      } catch {
        alert('Ошибка при попытке загрузить картинку')
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="create">
      <div className="create__container container">
        <div className="create__wrapper">
          <form className="create__form" action="">
            <p className="create__title">Загрузить фото</p>
            <input className="create__inputs" type="text"
              placeholder="Название"
              onInput={e =>
                setCardInfo({...cardInfo, name: e.target.value})}
            />
            <textarea className="create__inputs create__inputs--textarea"
              cols="30" rows="10" placeholder="Описание"
              onInput={e =>
                setCardInfo({...cardInfo, description: e.target.value})}
            ></textarea>
            <input className="create__inputs" type="text" 
              placeholder="Название цвета"
              onInput={e =>
                setCardInfo({...cardInfo, color_description: e.target.value})}
            />
            <input className="create__inputs" type="text"
              placeholder="Цвет #FFFFFF"
              onInput={e =>
                setCardInfo({...cardInfo, color: e.target.value})}
            />
            <input className="create__inputs" type="text" 
              placeholder="Код продукта"
              onInput={e => 
                setCardInfo({...cardInfo, product_code: e.target.value})}
            />
          </form>
          <div className="create__block">
            <div className="create__inner">
              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото</p>
                <input className="create__inputs" type="file"
                  onInput={e =>
                    setCardImages({
                      ...cardImages, mainImage: e.target.files[0]})}
                />
              </form>

              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото для меленьких блоков</p>
                <input className="create__inputs" type="file" multiple
                  onInput={e =>
                    setCardImages({...cardImages, mainImages: e.target.files})}
                 />
              </form>
            </div>
            <div className="create__inner">
              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото для 360</p>
                <input className="create__inputs" type="file" />
              </form>
              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото для 360</p>
                <input className="create__inputs" type="file" />
              </form>
            </div>
          </div>
          </div>
        <button className="create__btn" onClick={createCard}>Создать</button>
      </div>
    </div>
  )
}

export default Create