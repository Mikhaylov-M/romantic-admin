import { NavLink } from 'react-router-dom'

const Aside = () => {
  return (
    <>
    <div>
      <NavLink to='/'>Создать карточку</NavLink>
      <NavLink to='/delete'>Удалить карточку</NavLink>
      </div>
    </>
  )
}

export default Aside