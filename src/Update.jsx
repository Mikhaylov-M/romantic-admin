import { useEffect, useRef, useState } from "react";
import { axiosGet, url } from "./api/axios.request";
import axios from "axios";
import { useParams } from 'react-router-dom'

const Update = () => {

  const { id } = useParams()

  const [cardInfo, setCardInfo] = useState()

  const getCard = async () => {
    const {
      name,
      description,
      color_description,
      color,
      product_code,
      main_image
    } = await axiosGet(`/product/id/${id}`)
    setCardInfo({
      name: name,
      description: description,
      color_description: color_description,
      color: color,
      product_code: product_code,
      main_image: main_image
    })
  }

	useEffect(() => {
		/* TODO: Axios запрос на получение товара со всеми его данными */
    getCard()
		/* TODO: Axios запрос на получение товара со всеми его данными */
	}, [])

	const [cardImages, setCardImages] = useState({
		mainImage: {},
    firsBottom: {},
    secondBottom: {}
	})

	const sendInfo = async () => {
		try {
			const headers = {
				'Content-Type': 'application/json',
			}

			const body = {
				"name": cardInfo.name,
				"description": cardInfo.description,
				"color_description": cardInfo.color_description,
				"color": cardInfo.color,
				"product_code": cardInfo.product_code
			}

			const { status } = await axios.post(`${url}/product/update/${id}`, body, {
				headers: headers
			})

			return status
		} catch (error) {
			alert(`Ошибка при обновлении основной информации: ${error.message}`)
		}
	}

	const sendMainImage = async () => {
		try {
			const headers = {
				'Content-Type': 'multipart/form-data',
			}

			const formData = {
				"file": cardImages.mainImage,
			}
			const { status } =
				await axios.post(`${url}/product/main-image/${id}`, formData, {
					headers: headers
				})
			return status
		} catch (error) {
			alert(`Ошибка при загрузке картинки: ${error.message}`)
		}
	}

  const sendFirstBottom = async () => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }

      const formData = {
        "file" : cardImages.firsBottom,
      }
      const { status } = 
      await axios.post(`${url}/product/first-bottom-image/${id}`, formData, {
        headers: headers
      })
      return status
    } catch (error) {
      alert(`Ошибка при загрузке первой 360 картинки: ${error.message}`)
    }
  }

  const sendSecondBottom = async () => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }

      const formData = {
        "file" : cardImages.secondBottom,
      }
      const { status } = 
      await axios.post(`${url}/product/second-bottom-image/${id}`, formData, {
        headers: headers
      })
      return status
    } catch (error) {
      alert(`Ошибка при загрузке второй 360 картинки: ${error.message}`)
    }
  }

	const updateCard = async () => {
		try {
			const statusInfo = await sendInfo()
      const statusImage = await sendMainImage()
      const statusFirstBottom = await sendFirstBottom()
      const statusSecondBottom = await sendSecondBottom()
      if (statusInfo === 201 &&
        statusImage === 201 &&
        statusFirstBottom === 201 &&
        statusSecondBottom === 201) {
        getCard()
        alert('Информация успешно обновлена')
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
							value={ cardInfo?.name }
							onInput={e => {
								/*  TODO: Добавить двустороннюю связь  */
								setCardInfo({ ...cardInfo, name: e.target.value })
							}}
						/>
						<textarea className="create__inputs create__inputs--textarea"
							cols="30" rows="10" placeholder="Описание"
              value={cardInfo?.description}
							onInput={e =>
								setCardInfo({ ...cardInfo, description: e.target.value })}
						></textarea>
						<input className="create__inputs" type="text"
							placeholder="Название цвета"
              value={ cardInfo?.color_description }
							onInput={e =>
								setCardInfo({ ...cardInfo, color_description: e.target.value })}
						/>
						<input className="create__inputs" type="text"
							placeholder="Цвет #FFFFFF"
              value={ cardInfo?.color }
							onInput={e =>
								setCardInfo({ ...cardInfo, color: e.target.value })}
						/>
						<input className="create__inputs" type="text"
							placeholder="Код продукта"
              value={ cardInfo?.product_code }
							onInput={e =>
								setCardInfo({ ...cardInfo, product_code: e.target.value })}
						/>
					</form>
          <form className="create__form main-image" action="">
            <p className="create__title">Загрузить фото</p>
            <input className="create__inputs" type="file"
              onInput={e =>
                setCardImages({
                  ...cardImages, mainImage: e.target.files[0]
                })}
            />
            <div className="create__img-wrapper">
              <img
                src={`${url}/file/${cardInfo?.main_image?.id}`}
                alt="main image"
              />
            </div>
            <p className="create__title">Обновить фото для 360</p>
                <input className="create__inputs" type="file"
                onInput={e =>
                  setCardImages({...cardImages,
                    firsBottom: e.target.files[0]})}
                />
                <p className="create__title">Обновить фото для 360</p>
                <input className="create__inputs" type="file"
                onInput={e =>
                  setCardImages({...cardImages,
                    secondBottom: e.target.files[0]})}
                />
          </form>
				</div>
				<button className="create__btn" onClick={updateCard}>Обновить</button>
			</div>
		</div>
	)
}

export default Update