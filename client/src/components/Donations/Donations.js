import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BASE_PATH } from '../../utils/constants'
import { customFetch } from '../../services/fetch'
import './Donations.css'
import Swal from 'sweetalert2'

const Donations = () => {


    const navigate = useNavigate()

    const user = useSelector(store => store.user)

    const formik = useFormik({
        initialValues: initialValues(),
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            console.log(formData)
            console.log(user.firstName)
            const url = `${BASE_PATH}/checkout`
            const obj = {
                currency: formData.currency,
                donation: formData.donation,
                firstname: user ? user.firstName : 'anonimo',
                surname: user ? user.lastName : 'anonimo',
                email: user ? user.email : 'anonimo@gmail.com'
            }
            const properties = {
                method: 'post',
                data: obj
            }
            Swal.fire({
                title: 'Donar',
                icon: 'info',
                text: 'Usted esta a punto de ser redireccionado a MercadoPago',
                showDenyButton:true,
                confirmButtonText: 'Si',
                confirmButtonColor: '#9ac9fb',
                denyButtonText: 'Cancelar'
              }).then(result => {
                if(result.isConfirmed){
                customFetch(url, properties)
                    .then(fetch => {
                        window.location.href = fetch.data
                    })
                }})
        }   
    })

  return (
    <div className='donations-container'>
        <form className='donations-form' onSubmit={formik.handleSubmit}>
            <label for='donation'>Ingresa el valor que quieres donar:</label>
            <input type='text' name='donation' className='donation-input' onChange={formik.handleChange}/>
            <label for='currency'>Tipo de moneda</label>
            <label>USD</label>
            <input type='radio' name='currency' value='USD' onChange={formik.handleChange} />
            <label>ARS</label>
            <input type='radio' name='currency' value='ARS' onChange={formik.handleChange} />
            <button type='submit' className='login donation-button'>Donar</button>
            <h5>{formik.errors.currency}</h5>
            <h5>{formik.errors.donation}</h5>
        </form>
        <div className='lastest-donations'>
        
        </div>
       
    </div>
  )
}

function initialValues() {
    return {
        donation: '',
        currency: ''
    }
}

function validationSchema() {
    return {
        donation: Yup.string().matches(/^\d+$/, 'Solo se puede colocar numeros').required('Es necesario colocar un monto'),
        currency: Yup.string().required('Es necesario especificar la moneda')
    }
}

export default Donations