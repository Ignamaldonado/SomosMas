import React, {useEffect} from 'react'
import './ConfirmEmail.css'
import { customFetch } from '../../services/fetch'
import { BASE_PATH } from '../../utils/constants'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ConfirmEmail = () => {

  const userData = useSelector(store => store.user)
  const navigate = useNavigate()

  Swal.fire({
    title: 'Enviar correo',
    icon: 'info',
    text: 'Quiere enviar un correo a su email para confirmar su usuario?',
    showDenyButton:true,
    confirmButtonText: 'Si',
    confirmButtonColor: '#9ac9fb',
    denyButtonText: 'Volver a la Home'
  }).then(result=> {
    if(result.isConfirmed){
      const url = `${BASE_PATH}/users/auth/confirmemail/`
      const properties = {
      method: 'get'
    }
    customFetch(url, properties)
      .then(data => {
        Swal.fire({
          title: 'Exito!', 
          text: `El correo fue enviado al email de ${userData.email}`, 
          icon: 'success', 
          confirmButtonText: 'Volver a la home'})
          .then(result => {
            navigate('/')
          })
      })
      .catch(error => {
        Swal.fire('Error', 'Ha habido un error a la hora de mandar el email', 'error')
          .then(result => {
            navigate('/')
          })
      })
      
    } else if (result.isDenied){
      Swal.fire('Se ha cancelado el envio de email', '', 'info')
        .then(result => {
          navigate('/')
        })
    }

  })

  return (
    userData.id ? 
    <Confirmation /> 
    : 
    <Navigate to={'/'} />
  )
  }

function Confirmation() {
  
    return (
      <div>
        
      </div>
    )
}

export default ConfirmEmail