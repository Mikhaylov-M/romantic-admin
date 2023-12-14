import { NavLink } from 'react-router-dom'

const Aside = () => {
  return (
    <>
      <NavLink to='/'>Создать карточку</NavLink>
      <NavLink to='/delete'>Удалить карточку</NavLink>
    </>
  )
}

export default Aside