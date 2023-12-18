import { useEffect, useState } from "react";
import { axiosGet, url } from "./api/axios.request";

const Delete = () => {

  const [categories, setCategories] = useState([])
  
	const getCategories = async () => {
		const data = await axiosGet("/product/all")
		console.log(data)
		setCategories(data)
	}

  const deleteCard = async (category) => {
    let confirm = window.confirm(`Вы действительно хотите удалить ${category.name}?`)
    if (confirm) {
      try {
        const data = await axiosGet(`/product/delete/${category.id}`)
        alert('Успешно удалено')
        getCategories()
      } catch (error){
        alert('Ошибка при удалении, попробуйте ещё раз')
      }
    }
  }

	useEffect(() => {
		getCategories()
	}, [])
  return (

    <>
      <section className="delete">
      {
        categories.map(category => (
            <div className="delete__card">
            <div className="delete__img">
              <img src={
                `${url}/file/${category?.main_image?.id}`
              } alt="" />
              <div className="delete__btn" 
                onClick={() => deleteCard(category)}
              >Удалить</div>
            </div>
            <h2 className="delete__card-title">
              {category.name}
            </h2>
            <p className="delete__card-desc">
              {category.product_code}
            </p>
          </div>
        ))
      }
      </section>
    </>
  )
}

export default Delete