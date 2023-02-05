import './Header.css'
import React, { useState } from 'react'
import { List, X, Tools } from 'react-bootstrap-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {

  //Organization data (redux)
	const organization = useSelector(store => store.organization)

  let location = useLocation()
  const userData = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/')
  }

  return (
    <>

      <div className="header">
        <div className="logo">
          {!organization.loading && 
            <Link to='/'><img src={organization.data?.image ? organization.data.image : '/images/logo.png'} alt={organization.data?.name ? organization.data.name : 'logo'} /></Link>
          }
        </div>
        <nav>
          <Link to="/nosotros"><button className={`${location.pathname === "/nosotros" ? 'active' : '' }`}>Nosotros</button></Link>
          <Link to="/actividades"><button className={`${location.pathname === "/actividades" ? 'active' : '' }`}>Actividades</button></Link>
          <Link to="/novedades"><button className={`${location.pathname === "/novedades" ? 'active' : '' }`}>Novedades</button></Link>
          <Link to="/testimonios"><button className={`${location.pathname === "/testimonios" ? 'active' : '' }`}>Testimonios</button></Link>
          <Link to="/contacto"><button className={`${location.pathname === "/contacto" ? 'active' : '' }`}>Contacto</button></Link>
        </nav>
        <div className='account'>
          {userData.id && userData.roleId === 1 ?
                          <>
                          <Link to='/backoffice' style={{ textDecoration: 'none' }}>
                            <div className='login login-flex'>
                              <div className='account-button-image'>
                              <Tools size={36}/>
                              </div>
                            </div>
                          </Link>
                          </> 
                          :
                          null
                          }
          {userData.id ?
              <>
              <Link to={`/usuario/${userData.id}`} style={{ textDecoration: 'none' }}>
                <div className='login login-flex'>
                  <div className='account-button-image'>
                    <img src={userData.image} alt={userData.firstName}/>
                  </div>
                  <div className='account-button-text'>
                    <p>{userData.firstName}</p>
                  </div>   
                </div>
              </Link>
              <button className='register' onClick={handleLogout}>Cerrar Sesion</button>
              </>
          :
            <>
              <Link to='Login'><button className='login'>Log in</button></Link>
              <Link to='Registrarse'><button className='register'>Registrate</button></Link>
            </>
          }
        </div>
        <BurguerIcon userData={userData} handleLogout={handleLogout}/>
      </div>
      <div className='hidden'></div>
      {userData.id && userData.isConfirmed !== 1 ? <AccountVerification /> : null}    
      <ToastContainer/>
    </>
  )
}

function AccountVerification() {
  return (
    <Link to={`/usuario/confirmaremail`} style={{ textDecoration: 'none', margin:0 }}>
    <div className='account-verification'>
    <h6>Tenes que Verificar tu cuenta para acceder a algunas funcionalidades</h6>
    </div>
  </Link>
  )
}

function BurguerIcon({ userData, handleLogout, }) {

  const [openMenu, setOpenMenu] = useState(false)

  return(
   <div className='burguer-container'>
   <div className='burguer-menu' onClick={() => setOpenMenu(!openMenu)}> 
    {!openMenu ? <List size={36}/> : <X size={36}/>}
   </div>
   {openMenu && <BurguerMenu setOpenMenu={setOpenMenu} openMenu={openMenu} userData={userData} handleLogout={handleLogout} />}
   </div>
  )
}

function BurguerMenu({ setOpenMenu, openMenu, userData, handleLogout, handleDelete }) {

  let location = useLocation()

  return(

    <ul className='burguer-list'>
      {userData.id ? /*ARMAR EDICION DE PERFIL*/null : <Link to='Login'><li className='burguer-login' onClick={() => setOpenMenu(!openMenu)}>Login</li></Link>}
      {userData.id ? <li className='burguer-register' onClick={handleLogout}>Cerrar sesion</li> : <Link to='Registrarse'><li className='burguer-register' onClick={() => setOpenMenu(!openMenu)}>Registrate</li></Link>}
      <Link to="/nosotros" ><li  className={`${location.pathname === "/nosotros" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Nosotros</li></Link>
      <Link to="/actividades" ><li  className={`${location.pathname === "/actividades" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Actividades</li></Link>
      <Link to="/novedades" ><li  className={`${location.pathname === "/novedades" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Novedades</li></Link>
      <Link to="/testimonios" ><li  className={`${location.pathname === "/testimonios" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Testimonios</li></Link>
      <Link to="/contacto" ><li  className={`${location.pathname === "/contacto" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Contacto</li></Link>
    
    </ul>

  )
}
