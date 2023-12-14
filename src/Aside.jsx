import { NavLink } from 'react-router-dom'

const Aside = () => {
  return (
    <>
    <div className="aside">
        <div className="aside__wrapper">
          <NavLink className="aside__links" to='/'>Создать карточку</NavLink>
          <NavLink className="aside__links" to='/delete'>Удалить карточку</NavLink>
        </div>  
    </div>
    </>
  )
}

export default Aside