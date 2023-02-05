import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import PropTypes from 'prop-types'

//Components
import { alertConfirmation, alertError, alertWaiting, closeCurrentAlert } from '../../../services/Alert'
import ErrorMessage from '../../../features/errorMessage/ErrorMessage'

//styles
import styles from './NewsForm.module.css'

//Axios (REPLACE IT WITH 'HTTP PETITIONS SERVICES' (OT289-32) WHEN AVAILABLE?)
import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL
const MIN_NAME = 10
const MAX_NAME = 50
const MIN_CONTENT = 50

const NewsForm = ({ data }) => {
    const action = data?.id ? 'put' : 'post'
    const currentData = data || {name: '', content: '', categoryId: 1, image: ''}

    //Formik validation schema using Yup
    const activitySchema = Yup.object().shape({
        name: Yup.string().min(MIN_NAME, 'Nombre muy corto').max(MAX_NAME, 'Nombre muy largo').required('Requerido'),
        image: Yup.mixed().required('Requerido'),
        categoryId: Yup.number(),
        content: Yup.string().min(MIN_CONTENT, 'Contenido muy corto').required('Requerido')
    })

    //CKEditor5
    const CustomCKEditorField = ({ field, form }) => {
        return (
            <div className={styles.ckEditor}>
                <CKEditor
                    config={{placeholder: 'Escribe el contenido aquí...'}}
                    name={field.name}
                    editor={ ClassicEditor }
                    data={field.value}
                    onChange={( event, editor ) => {
                        const contentData = editor.getData()
                        form.setFieldValue(field.name, contentData)
                    }}
                />
            </div>
        )
    }

    const handleSubmit = async (values, { resetForm }) => {
        alertWaiting('Enviando novedad', 'aguarda un momento')
        
        const endpointUrl = SERVER_BASE_URL + '/news' + (currentData?.id ? `/${currentData.id}` : '')

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('image', values.image)
        formData.append('categoryId', values.categoryId)
        formData.append('content', values.content)
  
        const headers = {
          'Content-Type': 'multipart/form-data'
        }

        try {
            await axios[action](endpointUrl, formData, headers)

            //if it's a new activity, reset form after saving it
            if (action === 'post') {
                resetForm()
            }

            closeCurrentAlert()

            //Show confirmation message
            const alertTitle = `Novedad ${action === 'post' ? 'creada!' : 'actualizada!'}`
            const alertMessage = `La novedad fue ${action === 'post' ? 'creada' : 'actualizada'} correctamente.`
            
            alertConfirmation(alertTitle, alertMessage)
        } catch (error) {

            closeCurrentAlert()
            //Received error must be a string
            alertError('Ups, hubo un error', error)
        }
    }

    return (
        <Formik
            initialValues={currentData}
            onSubmit={handleSubmit}
            validationSchema={activitySchema}
            enableReinitialize
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form className={styles.newsForm}>

                    <Field name='name' placeholder='Nombre de la novedad' required />
                    {errors.name && touched.name && <ErrorMessage message={errors.name} />}

                    <label htmlFor='featuredImage' className={styles.uploadImage}>{values.image ? 'Cambiar' : 'Selecciona una'} imagen (PNG, JPG)</label>
                    <input name='image' id='featuredImage' type='file' accept='image/*' onChange={e => setFieldValue('image', e.target.files[0])} />
                    {errors.image && touched.image && <ErrorMessage message={errors.image} />}

                    {values.image && <img src={(typeof values.image === 'string') ? values.image : URL.createObjectURL(values.image)} alt='descatada' className={styles.image} />}

                    <Field name='categoryId' type='number' placeholder='ID Categoria' required />
                    {errors.type && touched.type && (<ErrorMessage message={errors.type} />)}

                    <Field name='content' component={CustomCKEditorField} />
                    {errors.content && touched.content && <ErrorMessage message={errors.content} />}

                    <Field type='submit' name='submit' value={`${action === 'post' ? 'Crear' : 'Actualizar'} novedad`} className={styles.button} />

                </Form>
            )}
        </Formik>
    )
}

NewsForm.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    })
}

export default NewsForm
