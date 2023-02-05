import React from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import authService from '../../../services/authService'
import { customFetch } from '../../../services/fetch'
import { BASE_PATH } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../reducers/userReducer'
import { Link } from 'react-router-dom'
import ErrorMessage from "../../../features/errorMessage/ErrorMessage"

import styles from "./Login.module.css"

const LoginForm = () => {

  const userData = useSelector(store => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const loginSchema = Yup.object().shape({
            email: Yup.string().required("Debe ingresar un email").matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {message: "El email es invalido"})
            .test('checkEmail', 'Este email no esta registrado', async (value) =>{
                let email = value ? value : ''
                let response = await authService.checkEmail({email})
                if(response.status === 200){
                    return response.data.emailExist                 // codigo para vaildar si existe ese email
                }
                return true
            }),
            password: Yup.string().required("Debe ingresar una contraseña").min(6, 'La contraseña es muy corta')
                .test('checkPassword', 'El email o contraseña no coinciden', async (password, {parent:{email}}) =>{
                    let emailValue = email ? email : ''
                    let passwordValue = password ? password : ''
                    let response = await authService.checkPassword({email: emailValue, password:passwordValue})
                    if(response.status === 200){
                        return response.data.passwordCorrect        // codigo para vaildar si coinciden email y contraseña
                    }
                    return true
                }),
    }) // Hace un fetch cada vez que tocas una tecla y el tema de que las validaciones las hace el controlador de login tipo seria 3 fetch para loguearte aparte que se tendrian que crear los controladores

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
            let res = await authService.login(values)
            if(res.data.token){
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
                    isConfirmed: userData.isConfirmed,
                    token: token
                }

                dispatch(login(user))
                navigate('/')
            }
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

    if (userData.id) {
        return(
            <div className={styles.notAllowed}>
            <h1>Ya estas logueado</h1>
            <Link to='/'><button className={styles.backButton} type='button'>volver</button></Link>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1>Ingresar a tu cuenta</h1>
            <Formik
                initialValues={{email: '', password: ''}}
                validateOnChange= {false}
                validateOnBlur= {false}
                onSubmit={onSubmit}
                validationSchema={loginSchema}
            >
                {({ errors, touched }) => (
                    <Form className={styles.loginForm}>

                        <Field type="email" name="email" placeholder="Email"/>
                        {errors.email && touched.email && <ErrorMessage message={errors.email} />}

                        <Field type="password" name="password" placeholder="Contraseña"/>
                        {errors.password && touched.password && <ErrorMessage message={errors.password} />}

                        <Field type="submit" name="submit" value="Iniciar sesión" className={styles.loginButton} />

                    </Form>
                )}
            </Formik>
            <ToastContainer/>
        </div>
    )
}

export default LoginForm