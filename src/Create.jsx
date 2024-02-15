import { useRef, useState } from "react";
import { url } from "./api/axios.request";
import axios from "axios";

const Create = ({token}) => {

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
        'Authorization': `Bearer ${token}`
      }

      const body = {
        "name" : cardInfo.name,
        "description" : cardInfo.description,
        "color_description" : cardInfo.color_description,
        "color" : cardInfo.color,
        "product_code" : cardInfo.product_code
      }

      const { status, data } = await axios.post(`${url}/category/create`, body, {
        headers: headers
      })
      if (status === 201) {
        return data.id
      }
    } catch (error) {
      alert(`Ошибка при отправке основных данных: ${error.message}`)
      if (error?.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }
  }

  const sendMainImage = async () => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }

      const formData = {
        "file" : cardImages.mainImage,
      }
      const { status } = 
      await axios.post(`${url}/category/main-image/${cardId.current}`, formData, {
        headers: headers
      })
      return status
    } catch (error) {
      return error?.response?.status
    }
  }

  const sendMainImages = async () => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }

      let formData = new FormData()
      for(let i = 0; i < cardImages.mainImages.length; i++) {
        formData.append('files', cardImages.mainImages[i])
      }

      const { status } =
      await axios.post(`${url}/category/main-images/${cardId.current}`, formData, {
        headers: headers
      })
      return status
    } catch (error) {
      return error?.response?.status
    }
  }

  const sendFirstBottom = async () => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }

      const formData = {
        "file" : cardImages.firsBottom,
      }
      const { status } = 
      await axios.post(`${url}/category/first-bottom-image/${cardId.current}`, formData, {
        headers: headers
      })
      return status
    } catch (error) {
      return error?.response?.status
    }
  }

  const sendSecondBottom = async () => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }

      const formData = {
        "file" : cardImages.secondBottom,
      }
      const { status } = 
      await axios.post(`${url}/category/second-bottom-image/${cardId.current}`, formData, {
        headers: headers
      })
      return status
    } catch (error) {
      return error?.response?.status
    }
  }

  const createCard = async () => {
    try {
      cardId.current = await sendInfo()
      try {
        const statusImage = await sendMainImage()
        const statusImages = await sendMainImages()
        const statusFirstBottom = await sendFirstBottom()
        const statusSecondBottom = await sendSecondBottom()
        if (statusImage === 201 && 
          statusImages === 201 && 
          statusFirstBottom === 201 && 
          statusSecondBottom === 201) {
          alert('Карточка создана и картинки загружены')
        } else if (
          statusImage === 401 ||
          statusImages === 401 ||
          statusFirstBottom === 401 ||
          statusSecondBottom === 401
        ) {
          localStorage.removeItem('token')
          alert('Ошибка авторизации. Войдите снова')
          window.location.reload()
        }
      } catch (error) {
        alert(`Ошибка при попытке загрузить картинки: ${error}`)
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.reload()
      }
      alert(error)
    }
  }

  return (
    <div className="create">
      <div className="create__container container">
        <div className="create__wrapper">
          <form className="create__form" action="">
            <p className="create__title">Описание</p>
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
                <p className="create__title">Загрузить несколько фото для меленьких блоков</p>
                <input className="create__inputs" type="file" multiple
                  onInput={e =>
                    setCardImages({...cardImages, mainImages: e.target.files})}
                 />
              </form>
            </div>
            <div className="create__inner">
              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото для 360</p>
                <input className="create__inputs" type="file"
                onInput={e =>
                  setCardImages({...cardImages,
                    firsBottom: e.target.files[0]})}
                />
              </form>
              <form className="create__form main-image" action="">
                <p className="create__title">Загрузить фото для 360</p>
                <input className="create__inputs" type="file"
                onInput={e =>
                  setCardImages({...cardImages,
                    secondBottom: e.target.files[0]})}
                />
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