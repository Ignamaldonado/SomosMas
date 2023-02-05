import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import authService from '../../../services/authService'
import { customFetch } from '../../../services/fetch'
import { BASE_PATH } from '../../../utils/constants'
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../../../reducers/userReducer'
import ErrorMessage from "../../../features/errorMessage/ErrorMessage"


//styles
import styles from "./Register.module.css"

const RegisterForm = () => {

  const navigate = useNavigate()  
  const userData = useSelector(store => store.user)
  const dispatch = useDispatch()

    //Formik validation schema using Yup
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string().required('Requerido'),
        lastName: Yup.string().required('Requerido'),
        email: Yup.string().required('Requerido').email('Email inválido')
            .test('checkEmail', 'Este email ya esta registrado', async (value) =>{
                let email = value ? value : ''
                let response = await authService.checkEmail({email})
                if(response.status === 200){
                    return !response.data.emailExist                // codigo para vaildar si existe ese email
                }
                return true
            }),
        password: Yup.string().required('Requerido').min(6, 'Contraseña muy corta')
    })

    const getUserData = async () => {
        try {
            const url = `${BASE_PATH}/auth/me`
            const properties = {
                method: 'get'
            }
            const result = await customFetch(url, properties)
            return result.data.payload
        } catch (err) {
            if(err.response.data.errors){
                err.response.data.errors.forEach(error =>{
                    toast.error( error.msg , {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
            console.log(err.response)
        }
    }

    const onSubmit = async (values) => {
        try {
            let res = await authService.register(values)
            if(res.status === 200){
                    const token = res.data.token
                    localStorage.setItem('token', JSON.stringify(token));
                    const userData = await getUserData()
    
                    const user = {
                        id: userData.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        image: userData.image,
                        roleId: userData.roleId,
                        token: token
                    }
    
                    dispatch(login(user))
                    navigate('/')
            }
        } catch (err) {
            err.response.data.errors.forEach(error =>{
                toast.error( error.msg , {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }
    }

    if(userData.id) {
        return(
            <div className={styles.notAllowed}>
            <h1>Ya estas logueado</h1>
            <Link to='/'><button className={styles.backButton} type='button'>volver</button></Link>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1>Crear una cuenta</h1>
            <Formik
                initialValues={{firstName: '', lastName: '', email: '', password: ''}}
                validateOnBlur = {false}
                validateOnChange = {false}
                onSubmit={onSubmit}
                validationSchema={SignupSchema}
            >                
                {({ errors, touched }) => (
                    <Form className={styles.registerForm}>

                        <Field name="firstName" placeholder="nombre"/>
                        {errors.firstName && touched.firstName && <ErrorMessage message={errors.firstName} />}

                        <Field name="lastName" placeholder="apellido"/>
                        {errors.lastName && touched.lastName && <ErrorMessage message={errors.lastName} />}

                        <Field type="email" name="email" placeholder="email"/>
                        {errors.email && touched.email && <ErrorMessage message={errors.email} />}

                        <Field name="password" type="password" placeholder="contraseña"/>
                        {errors.password && touched.password && <ErrorMessage message={errors.password} />}

                        <Field type="submit" name="submit" value="Crear cuenta" className={styles.button} />
                        
                    </Form>
                )}
            </Formik>
            <ToastContainer/>
        </div>
    )
}

export default RegisterForm
