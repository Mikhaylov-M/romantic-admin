import { NavLink } from 'react-router-dom'
import logo from '../src/images/logo.png'

const Aside = () => {
  return (
    <>
    <div className="aside">
        <div className="aside__wrapper">
          <div className="aside__logo">
            <img src={logo} alt="" />
          </div>
          <NavLink className="aside__links" to='/'>Создать карточку</NavLink>
          <NavLink className="aside__links" to='/delete'>Удалить / Изменить</NavLink>
        </div>  
    </div>
    </>
  )
}

export default Aside