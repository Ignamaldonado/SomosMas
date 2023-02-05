import React from "react"
import {useSelector} from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {Camera} from 'react-bootstrap-icons'
import { alertConfirmation, alertError, alertWaiting, closeCurrentAlert } from '../../../services/Alert'
import axios from 'axios'

import styles from './styles/TestimonialForm.module.css'

const MAX_NAME = 50
const MIN_CONTENT = 50

const AddTestimonialsPanel = ()=> {

    return (
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Cuentanos tu experiencia</h2>
            <p>Agrega un tesimonio</p>
            <TestimonialForm/>
        </div>
    );
}



const TestimonialForm = () => {

    const userState = useSelector(state => state.user)
    const fullName = userState.firstName + ' ' + userState.lastName
    const data =  {name: fullName, content: '', image: ''}

    //Formik validation schema using Yup
    const testimonialSchema = Yup.object().shape({
        name: Yup.string().max(MAX_NAME, 'Nombre muy largo').required('Requerido'),
        image: Yup.mixed().required('Requerido'),
        content: Yup.string().min(MIN_CONTENT, 'Contenido muy corto').required('Requerido')
    })

    const handleSubmit = async (values, { resetForm }) => {
        alertWaiting('Enviando testionio', 'aguarda un momento')
        try {

            // await adminService.createTestimonial(values)
            resetForm()
        
            closeCurrentAlert()

            //Show confirmation message
            const alertTitle = `Testimonio ${data.id ? 'actualizado!' : 'creado!'}`
            const alertMessage = `El testionio fue ${data.id ? 'actualizado' : 'creado'} correctamente.`
            alertConfirmation(alertTitle, alertMessage)
        } catch (error) {
            closeCurrentAlert()
            //Received error must be a string
            alertError('Ups, hubo un error', error)
        }
    }

    return (
        <Formik
            initialValues={data}
            onSubmit={handleSubmit}
            validationSchema={testimonialSchema}
            enableReinitialize
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form className={styles.testimonialForm}>

                    <div className="w-100 d-flex align-items-center">

                        <div>                               
                            <label htmlFor='featuredImage' className={styles.uploadImage}>{values.image ? <img src={(typeof values.image === 'string') ? values.image : URL.createObjectURL(values.image)} alt='descatada' style={{width: '100%'}} /> :  <Camera className={styles.cameraIcon}/>}</label>
                            <input name='image' id='featuredImage' type='file' accept='image/*' onChange={e => setFieldValue('image', e.target.files[0])} />
                            {errors.image && touched.image && <p>{errors.image}</p> }
                        </div>
                        <div className="d-flex flex-fill flex-column">
                            <Field name='name' placeholder='Nombre y Apellido' className="ms-1 flex-fill"/>
                            {errors.name && touched.name && <p>{errors.name}</p> }
                        </div>

                    </div>

                    <Field name='content'  component="textarea" rows="5" />
                    {errors.content && touched.content && <p>{errors.content}</p> }

                    <Field type='submit' name='submit' value={`${data.id ? 'Testimonio' : 'Crear' } Actividad`} className={styles.button} />

                </Form>
            )}
        </Formik>
    )
}


export default AddTestimonialsPanel