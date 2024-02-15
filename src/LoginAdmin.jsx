import { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from "./api/axios.request";

const LoginAdmin = ({setToken}) => {

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const getToken = async (e) => {
    e.preventDefault()
    try {
      const headers = {
        'Content-Type': 'application/json',
      }

      const body = {
       "username": form.username,
       "password": form.password
      }
      console.log(body);
      const { data } = await axios.post(`${url}/auth/login`, body, {
        headers: headers
      })
      setToken(data.access_token)
      localStorage.setItem('token', data.access_token)
    } catch (error) {
      localStorage.removeItem('token')
      alert(`Ошибка при попытке входа: ${error.message}`)
    }
  }

  return (
    <main className="page">
      <section className="login">
        <div className="login__container">
          <h1 className="login__title">ВХОД</h1>
          <h2 className="login__subtitle">Все поля заполнения обязательны*</h2>
          <form className="login__form">
            <input className="login__input" type="text" placeholder="Логин" onInput={(e) => {
              setForm({ ...form, username: e.target.value })
            }} />
            <input
              className="login__input"
              type="password"
              placeholder="Пароль"
              onInput={(e) => {
                setForm({ ...form, password: e.target.value })
              }}
            />
            <button className="login__btn" onClick={getToken}>ВОЙТИ</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginAdmin