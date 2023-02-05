import React, { useEffect } from 'react'
import './EmailConfirmed.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { BASE_PATH } from '../../utils/constants'
import axios from 'axios'
import { alertWaiting, alertConfirmation, alertError } from '../../services/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { refresh } from '../../reducers/userReducer'
import { customFetch } from '../../services/fetch'



const EmailConfirmed = () => {
    const navigate = useNavigate()
    const userData = useSelector(store => store.user)
    const dispatch = useDispatch()
    const params = useParams()
    const {token} = params
    let newToken;
    const confirmUrl = `${BASE_PATH}/users/auth/confirmemail/${token}`
    const refreshURL = `${BASE_PATH}/auth/me`
    const refreshProperties = {
      method: 'get'
    }

    const getConfirmEmail = async () => {
        const config = {
            method: 'get',
            url: confirmUrl,
            headers: {      
                "Authorization": `Bearer ${token}` 
            }
        }
        return await axios(config) 
    }
    
    useEffect(() => { 
        alertWaiting('Estamos confirmando su email', 'Espere un momento')
       getConfirmEmail()
        .then(token => {   
            console.log(token)
            newToken = JSON.stringify(token.data)
            console.log(newToken)
            localStorage.removeItem('token')
            localStorage.setItem('token', newToken)
        })
        .then(data => {
          console.log(newToken)
            if (newToken) {
                console.log('aca llega')
                customFetch(refreshURL, refreshProperties)
                .then(user => {
                  console.log(userData.isConfirmed)
                  console.log(user)
                  let userObj = {
                    id: user.data.payload.id,
                    firstName: user.data.payload.firstName,
                    lastName: user.data.payload.lastName,
                    email: user.data.payload.email,
                    image: user.data.payload.image,
                    roleId: user.data.payload.roleId,
                    isConfirmed: user.data.payload.isConfirmed,
                    token: newToken
                  }
                  dispatch(refresh(userObj))
                  alertConfirmation('Enhorabuena', 'Su email ha sido confirmado')
                })
                  .catch(error => alertError('Oops', 'Ha habido un problema'))
            } else {
                alertError('Oops', 'es este error')
            }
        })
        .catch(error => alertError('Oops', 'Ha habido un problema para confirmar usuario'))
    }, [])

  return (
    <>
    <Link to='/'><button>Volver a la home</button></Link>
    </>
  )
}

export default EmailConfirmed