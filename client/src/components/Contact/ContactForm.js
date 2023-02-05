import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import ErrorMessage from '../../features/errorMessage/ErrorMessage'
import { alertConfirmation, alertError } from '../../services/Alert'
import styles from './ContactForm.module.css'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const ContactForm = () => {
	const validationSchema = yup.object().shape({
		name: yup.string().required('Requerido'),
		email: yup
			.string()
			.email('Formato Email inválido')
			.required('Requerido'),
		phone: yup.number().required('Requerido'),
		message: yup
			.string()
			.min(2)
			.max(250, '250 caracteres permitidos')
			.required('Requerido'),
	})

	const handleSubmit = async (values, { resetForm }) => {
		const url = `${SERVER_BASE_URL}/contacts`
		const properties = {
			method: 'post',
			data: values,
		}
		try {
			await axios(url, properties)

			const alertTitle = 'Consulta Enviada'
			const alertMessage = 'Su consulta fue enviada correctamente'

			resetForm()
			alertConfirmation(alertTitle, alertMessage)
		} catch (error) {
			alertError('Ups, hubo un error', error)
		}
	}

	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				phone: '',
				message: '',
			}}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form className={styles.contactForm}>
                    <Field name='name' placeholder='Nombre' />
                    {errors.name && touched.name && <ErrorMessage message={errors.name} />}

                    <Field name='email' placeholder='Email' />
                    {errors.email && touched.email && <ErrorMessage message={errors.email} />}

                    <Field name='phone' placeholder='Telefono' />
                    {errors.phone && touched.phone && <ErrorMessage message={errors.phone} />}

                    <Field as='textarea' rows='10' cols='50' name='message' placeholder='Escriba su consulta' />
                    {errors.message && touched.message && <ErrorMessage message={errors.message} />}

                    <Field type='submit' name='submit' value='Enviar Consulta' />
				</Form>
			)}
		</Formik>
	)
}

export default ContactForm
