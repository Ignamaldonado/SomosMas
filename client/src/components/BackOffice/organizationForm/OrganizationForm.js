import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../../reducers/organizationReducer'

//Components
import { alertConfirmation, alertError, alertWaiting, closeCurrentAlert } from '../../../services/Alert'
import ErrorMessage from '../../../features/errorMessage/ErrorMessage'

//styles
import styles from './OrganizationForm.module.css'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL
const MIN_NAME = 3
const MAX_NAME = 30
const MIN_WELCOME_TEXT = 50
const MAX_WELCOME_TEXT = 500


const OrganizationForm = () => {
      //Organization data (redux)
	const organization = useSelector(store => store.organization)
    const dispatch = useDispatch()

    const initialValues = organization.data ? {
        name: organization.data.name,
        image: organization.data.image,
        phone: organization.data.phone,
        address: organization.data.address,
        facebook: organization.data.socialLinks.find(social => social.name === 'Facebook').url,
        instagram: organization.data.socialLinks.find(social => social.name === 'Instagram').url,
        twitter: organization.data.socialLinks.find(social => social.name === 'Twitter').url,
        welcomeText: organization.data.welcomeText
    } : {
        name: '',
        image: '',
        phone: '',
        address: '',
        facebook: '',
        instagram: '',
        twitter: '',
        welcomeText: ''
    }

    //Formik validation schema using Yup
    const organizationSchema = Yup.object().shape({
        name: Yup.string().min(MIN_NAME, 'Nombre muy corto').max(MAX_NAME, 'Nombre muy largo').required('Requerido'),
        image: Yup.mixed(),
        phone: Yup.string(),
        address: Yup.string(),
        facebook: Yup.string(),
        instagram: Yup.string(),
        twitter: Yup.string(),
        welcomeText: Yup.string().min(MIN_WELCOME_TEXT, 'Contenido muy corto').max(MAX_WELCOME_TEXT, 'Contenido muy largo').required('Requerido'),
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

    const handleSubmit = async (values) => {
        alertWaiting('Enviando Organización', 'aguarda un momento')
        
        const endpointUrl = SERVER_BASE_URL + '/organization'

        const socialLinks = [{"url": values.facebook || "", "name": "Facebook"}, {"url": values.instagram || "", "name": "Instagram"}, {"url": values.twitter || "", "name": "Twitter"}]

        // [{"url": "", "name": "Facebook"},{"url": "", "name": "Instagram"},{"url": "", "name": "Twitter"}]

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('phone', values.phone)
        formData.append('address', values.address)
        formData.append('image', values.image)
        formData.append('socialLinks', JSON.stringify(socialLinks))
        formData.append('welcomeText', values.welcomeText)
        
        const headers = {
          'Content-Type': 'multipart/form-data'
        }

        try {
            const res = await axios.put(endpointUrl, formData, headers)

            //update redux
            const organizationData = {...res.data}

            if (typeof organizationData.socialLinks === 'string') {
                organizationData.socialLinks = JSON.parse(res.data.socialLinks)
            }

            dispatch(update(organizationData))

            //Close alert
            closeCurrentAlert()

            //Show confirmation message
            const alertTitle = `Organización actualizada!`
            const alertMessage = `La Organización fue actualizada correctamente.`
            alertConfirmation(alertTitle, alertMessage)
        } catch (error) {
            closeCurrentAlert()
            //Received error must be a string
            alertError('Ups, hubo un error', error)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={organizationSchema}
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form className={styles.organizationForm}>

                    <h2 className={styles.sectionTitle}>Datos de la organización:</h2>

                    <legend className={styles.legend}>Nombre</legend>
                    <Field name='name' placeholder='Nombre' required />
                    {errors.name && touched.name && <p>{errors.name}</p>}

                    <legend className={styles.legend}>Teléfono</legend>
                    <Field name='phone' placeholder='Teléfono' />
                    {errors.phone && touched.phone && <p>{errors.phone}</p>}

                    <legend className={styles.legend}>Dirección</legend>
                    <Field name='address' placeholder='Dirección' />
                    {errors.address && touched.address && <p>{errors.address}</p>}

                    <h2 className={styles.sectionTitle}>Logo:</h2>

                    <label htmlFor='featuredImage' className={styles.uploadImage}>{values.image ? 'Cambiar' : 'Selecciona un'} logo (PNG, JPG)</label>
                    <input name='image' id='featuredImage' type='file' accept='image/*' onChange={e => setFieldValue('image', e.target.files[0])} />
                    {errors.image && touched.image && <p>{errors.image}</p>}

                    {values.image ?
                        <img src={(typeof values.image === 'string') ? values.image : URL.createObjectURL(values.image)} alt='descatada' className={styles.image} />
                    :
                        <img src='/images/logo.png' alt='descatada' className={styles.image} />
                    }

                    <h2 className={styles.sectionTitle}>Redes sociales:</h2>

                    <legend className={styles.legend}>Facebook</legend>
                    <Field name='facebook' placeholder='Facebook (URL)' />
                    {errors.facebook && touched.facebook && <p>{errors.facebook}</p>}

                    <legend className={styles.legend}>Instagram</legend>
                    <Field name='instagram' placeholder='Instagram (URL)' />
                    {errors.instagram && touched.instagram && <p>{errors.instagram}</p>}

                    <legend className={styles.legend}>Twitter</legend>
                    <Field name='twitter' placeholder='Twitter (URL)' />
                    {errors.twitter && touched.twitter && <p>{errors.twitter}</p>}

                    <h2 className={styles.sectionTitle}>Texto de bienvenida:</h2>

                    <Field name='welcomeText' component={CustomCKEditorField} />
                    {errors.welcomeText && touched.welcomeText && <p>{errors.welcomeText}</p>}

                    <Field type='submit' name='submit' value='Actualizar' className={styles.button} />

                </Form>
            )}
        </Formik>
    )
}

export default OrganizationForm
