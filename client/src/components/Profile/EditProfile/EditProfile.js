import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../../reducers/userReducer'
import { Navigate, useNavigate } from 'react-router-dom'
import './EditProfile.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BASE_PATH } from '../../../utils/constants'
import { customFetch } from '../../../services/fetch'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { alertWaiting, alertConfirmation, alertError } from '../../../services/Alert'
import Swal from 'sweetalert2'

const EditProfile = () => {

  const userData = useSelector(store => store.user)
  

    return (
      userData.id ? 
      <Profile /> 
      : 
      <Navigate to={'/'} />
    )
    }

const Profile = () => {
  const [file, setFile] = useState('')
  const [ fileName, setFileName ] = useState('Selecciona una imagen')
  const userData = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = () => {
    return {
      firstName: Yup.string().matches(/^$|^[A-Za-z\s]+$/, 'Nombre invalido'),
      lastName: Yup.string().matches(/^$|^[A-Za-z\s]+$/, 'Apellido invalido'),
      email: Yup.string().email('Email invalido'),
      password: Yup.string().min(6, 'Contraseña muy corta'),
      newPassword: Yup.string().min(6, 'Contraseña muy corta')
    }
  }

  const uploadHandler = (event) => {
    const fileData = event.target.files[0]
    setFile(fileData)
    setFileName(fileData.name)
  }

  const handleSubmit = (formData) => { 
    const url = `${BASE_PATH}/users/${userData.id}`
    const properties = {
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        image: file,
        password: formData.password,
        newPassword: formData.newPassword,
      }
    }
    alertWaiting('Modificando su usuario', 'aguarde un momento')
    customFetch(url, properties)
      .then(data => {
        const token = data.data.token
        localStorage.removeItem('token')
        localStorage.setItem('token', `"${token}"`)
        const updatedUser = {
          id: data.data.user.id,
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          email: data.data.user.email,
          roleId: data.data.user.roleId,
          image: data.data.user.image,
         
        }
        dispatch(login(updatedUser))
        navigate(`/usuario/${userData.id}`)
        alertConfirmation('Enhorabuena', 'su perfil ha sido modificado')
      })
      .catch(error => {
        alertError('Hubo un error', error.response.data.errors )
      })
  }

  const handleCancel = () => {
    Swal.fire({
      title: 'Deseas dejar de editar?',
      icon: 'info',
      text: 'No se guardaran los cambios realizados',
      showDenyButton:true,
      confirmButtonText: 'Si',
      confirmButtonColor: '#9ac9fb',
      denyButtonText: 'no'
    }).then(result => {
      if(result.isConfirmed){
        navigate(`/usuario/${userData.id}`)
      }
    })
  }

  const formik = useFormik({
    initialValues: {firstName: '', lastName: '', email: '', password: '', newPassword: ''},
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema:  Yup.object(validationSchema()),
    onSubmit: handleSubmit
  })





  return (
    <>
          <div className='profile-container'>
        <h1>Mi perfil</h1>
        <div className='profile-image-container'>
            <img src={userData.image} alt={userData.image} />
        </div>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <label htmlFor='profileImage' className='profile-image-button'>{fileName}</label>
                    <input name='image' id='profileImage' type='file' accept='image/*'  onChange={uploadHandler}/>
          <div className='profile-input-container'>
            <h3>Nombre:</h3>  
            <input 
              className='edit-profile-input' 
              type='text' 
              name="firstName" 
              id="firstName" 
              onChange={formik.handleChange}
              placeholder={userData.firstName} 
            />
            {formik.errors.firstName && <p className='profile-errors'>{formik.errors.firstName}</p>}
          </div>
          <div className='profile-input-container'>
            <h3>Apellido:</h3>  
            <input 
              className='edit-profile-input' 
              type='text' 
              name="lastName" 
              id="lastName" 
              onChange={formik.handleChange}
              placeholder={userData.lastName} 
              />
            {formik.errors.lastName && <p className='profile-errors'>{formik.errors.lastName}</p>}
          </div>
          <div className='profile-input-container'>
            <h3>Email:</h3>  
            <input 
              className='edit-profile-input' 
              type='text' 
              name="email" 
              id="email" 
              onChange={formik.handleChange}
              placeholder={userData.email} 
            />
            {formik.errors.email && <p className='profile-errors'>{formik.errors.email}</p>}
          </div>
          <div className='profile-input-container'>
            <h3>Cambiar contraseña:</h3>  
            <h5>Ingrese contraseña actual</h5>
            <input 
              className='edit-profile-input' 
              type='password' 
              name="password" 
              id="password" 
              autoComplete="new-password"
              onChange={formik.handleChange}
              placeholder='*****' 
            />
            {formik.errors.password && <p className='profile-errors'>{formik.errors.password}</p>}
            <h5>Ingrese contraseña nueva</h5>
            <input 
              className='edit-profile-input' 
              type='password' 
              name="newPassword" 
              id="newPassword" 
              autoComplete='new-password'
              onChange={formik.handleChange}
              placeholder='*****' 
            />
          </div>  
            {formik.errors.newPassword && <p className='profile-errors'>{formik.errors.newPassword}</p>}
          <div className='profile-btn-cont'>
            <button type='submit' className='edit-btn'>Guardar Perfil</button>
            <button type='button' className='delete-btn' onClick={handleCancel}>Cancelar cambios</button>
          </div>
        </form>
        </div>
        <ToastContainer />
    </>
  )
}



export default EditProfile