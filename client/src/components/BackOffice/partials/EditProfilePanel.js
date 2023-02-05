import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../../reducers/userReducer'
import { Link ,Navigate, useNavigate } from 'react-router-dom'
import './styles/EditProfilePanel.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BASE_PATH } from '../../../utils/constants'
import { customFetch } from '../../../services/fetch'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { alertWaiting, alertConfirmation, alertError } from '../../../services/Alert'
import {Camera} from 'react-bootstrap-icons'


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
            image: Yup.mixed().required('Requerido'),
            password: Yup.string().min(6, 'Contraseña muy corta'),
            newPassword: Yup.string().min(6, 'Contraseña muy corta')
        }
    }

    const uploadHandler = (event) => {
        const fileData = event.target.files[0]
        setFile(fileData)
        setFileName(fileData.name)
    }
    
    const handleSubmit = async (formData) => { 

        try {
            const tokenUrl = `${BASE_PATH}/users/${userData.id}`
            const tokenProperties = {
                method: 'put',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            }
            alertWaiting('Modificando su usuario', 'aguarde un momento')
            const {token} = await customFetch(tokenUrl, tokenProperties)
            localStorage.removeItem('token')
            localStorage.setItem('token', `"${token}"`)

            const authUrl = `${BASE_PATH}/auth/me`
            const authProperties = {
                method: 'get'
            }
            let {data} = await customFetch(authUrl, authProperties)
            
            const updatedUser = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                roleId: data.roleId,
                image: data.image,
            }
            dispatch(logout())
            dispatch(login(updatedUser))
            alertConfirmation('Enhorabuena', 'su perfil ha sido modificado')
            navigate('/')
        } catch (error) {
            alertError('Hubo un error', "Algo salio mal")   
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: userData.firstName,
            lastName: userData.lastName, 
            email: userData.email, 
            password: userData.password, 
            newPassword: userData.password
        },
        validateOnChange: false,
        validateOnBlur: false,
        // validationSchema:  Yup.object(validationSchema()),
        onSubmit: handleSubmit
    })





    return (

        <>
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Mi perfil</h2>

        <div className="p-2 rounded shadow">
        <form onSubmit={formik.handleSubmit} autoComplete="off">


            <div className="d-flex">
                <div>
                    <label htmlFor='profileImage'   className='profile-image-container'>{formik.values.image ? <img src={(typeof formik.values.image === 'string') ? formik.values.image : URL.createObjectURL(formik.values.image)} alt='descatada' style={{width: '100%'}} /> :  <Camera className="h1 m-0"/>}</label>
                    <input name='image' id='profileImage' type='file' accept='image/*' onChange={e => formik.setFieldValue('image', e.target.files[0])} />
                    {formik.errors.image && formik.touched.image && <p className='profile-errors'>{formik.errors.image}</p>}
                </div>
                <div>
                    <div className="d-flex">
                        <div className='mx-4 py-2'>
                            <h3>Nombre:</h3>  
                            <input className='edit-profile-input' type='text' name="firstName" id="firstName" defaultValue={formik.initialValues.firstName} onChange={formik.handleChange} placeholder="Nombre" />
                            {formik.errors.firstName && <p className='profile-errors'>{formik.errors.firstName}</p>}
                        </div>
                        <div className='mx-4 py-2'>
                            <h3>Apellido:</h3>  
                            <input className='edit-profile-input' type='text' name="lastName" id="lastName" defaultValue={formik.initialValues.lastName} onChange={formik.handleChange} placeholder="Apellido" />
                            {formik.errors.lastName && <p className='profile-errors'>{formik.errors.lastName}</p>}
                        </div>
                    </div>
                    <div>
                        <div className='mx-4 py-2'>
                            <h3>Email:</h3>  
                            <input className='edit-profile-input' type='text' name="email" id="email" defaultValue={formik.initialValues.email} onChange={formik.handleChange} placeholder="Email" />
                            {formik.errors.email && <p className='profile-errors'>{formik.errors.email}</p>}
                        </div>
                        <div className='mx-4 py-2'>
                            <h3>Cambiar contraseña:</h3> 
                            <div className="d-flex">
                                <div className="me-4">
                                    <h5>Ingrese contraseña actual</h5>
                                    <input className='edit-profile-input' type='password' name="password" id="password"  defaultValue={formik.initialValues.password}  autoComplete="new-password"onChange={formik.handleChange} placeholder='*****' />
                                    {formik.errors.password && <p className='profile-errors'>{formik.errors.password}</p>}
                                </div>
                                <div className="ms-4">
                                    <h5>Ingrese contraseña nueva</h5>
                                    <input className='edit-profile-input' type='password' name="newPassword" id="newPassword"  defaultValue={formik.initialValues.password}  autoComplete='new-password'onChange={formik.handleChange} placeholder='*****' />
                                    {formik.errors.newPassword && <p className='profile-errors'>{formik.errors.newPassword}</p>}
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                
            </div>
            <div className='d-flex'>
                <Link to={`/backOffice/usuario/${userData.id}`}><button className='delete-btn'>Cancelar</button></Link>
                <button type='submit' className='edit-btn'>Guardar Perfil</button>
            </div>

        </form>
        </div>
        </div>
        <ToastContainer/>
        </>
    )
}



export default EditProfile