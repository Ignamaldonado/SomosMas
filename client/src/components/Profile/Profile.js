import React from 'react'
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { logout } from '../../reducers/userReducer'
import {BASE_PATH} from '../../utils/constants'
import {customFetch} from '../../services/fetch'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {

    const userData = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        Swal.fire({
          title: 'Eliminar usuario',
          icon: 'warning',
          text: 'Verdaderamente desea eliminar su usuario?',
          showDenyButton:true,
          confirmButtonText: 'Si',
          confirmButtonColor: '#9ac9fb',
          denyButtonText: 'Cancelar'
        }).then(result=> {
          if(result.isConfirmed){
            const url = `${BASE_PATH}/users/${userData.id}`
            const properties = {
              method: 'delete'
            }
            customFetch(url, properties)
              .then(data => {
                toast.success( data.data , {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              })
                dispatch(logout())
                localStorage.removeItem('token')
                navigate('/')
              })
              .catch(error => {
                toast.error(error.message , {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              })
              })
          } else if (result.isDenied){
            Swal.fire('Se ha cancelado la eliminacion', '', 'info')
          }
        })
      }

  return (
    userData.id ? 
    <MyProfile handleDelete={handleDelete}/> 
    : 
    <Navigate to={'/'} />)
}


const MyProfile = ({ handleDelete }) => {
    const userData = useSelector(store => store.user)
    console.log(userData.image)
    return (
        <>
        <div className='profile-container'>
        <h1>Mi perfil</h1>
        <div className='profile-image-container'>
            <img src={userData.image} alt={userData.image} />
        </div>
        <h3>Nombre:<span className='span-profile'>{userData.firstName}</span></h3>
        <h3>Apellido:<span className='span-profile'>{userData.lastName}</span></h3>
        <h3>Email:<span className='span-profile'>{userData.email}</span></h3>
        <h3>Admin:<span className='span-profile'>{userData.roleId === 1 ? 'Si' : "No"}</span></h3>
        <div className='profile-btn-cont'>
            <Link to={`/usuario/editar/${userData.id}`}><button className='edit-btn'>Editar perfil</button></Link>
            <button className='delete-btn' onClick={handleDelete}>Eliminar perfil</button>
        </div>
        </div>
        <ToastContainer/>
        </>
    )
}

export default Profile