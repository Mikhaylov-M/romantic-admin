import { useEffect, useState } from "react";
import { axiosGet, url } from "./api/axios.request";
import { Link } from "react-router-dom";
import axios from "axios";

const Delete = ({token}) => {

  const [categories, setCategories] = useState([])
  
	const getCategories = async () => {
		const data = await axiosGet("/category/all")
		console.log(data)
		setCategories(data)
	}

  const deleteCard = async (category) => {
    let confirm = window.confirm(`Вы действительно хотите удалить ${category.name}?`)
    if (confirm) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        console.log(headers);
        console.log(category.id);
        const data = await axios(`${url}/category/delete/${category.id}`, {headers: headers})
        alert('Успешно удалено')
        getCategories()
      } catch (error){
        if (error?.response?.status === 401) {
          localStorage.removeItem('token')
          window.location.reload()
        }
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
            <div className="delete__card" key={category?.id}>
            <div className="delete__img">
              <img src={
                `${url}/file/${category?.main_image?.id}`
              } alt="" />
              <div className="delete__btn" 
                onClick={() => deleteCard(category)}
              >Удалить</div>
              <Link to={`/update/${category?.id}`} className="delete__btn-change" 
              >Изменить</Link>
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