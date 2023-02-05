import React, { useEffect, useState } from 'react'
import publicService from '../../../services/publicService'
import panel  from './styles/Panels.module.css'
import form  from './styles/Forms.module.css'
import list  from './styles/Lists.module.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import PropTypes from 'prop-types'
import axios from 'axios'
//Components
import { alertConfirmation,alertWarning ,alertError, alertWaiting, closeCurrentAlert } from '../../../services/Alert'

import Loader from '../../Loader/Loader'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const axiosActivities = axios.create({
    baseURL: `${SERVER_BASE_URL}/activities`,
    headers: {
        'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'multipart/form-data'
    }
});

const ActivitiesPanel = () => {
    const [activities, setActivities] = useState(null)
    const [activityData, setActivityData] = useState({})

    const [ activitiesSearch, setActivitiesSearch ] = useState([])
    const [ search, setSearch ] = useState('')

    async function getData() {
        const data = await publicService.activitiesList()
        setActivities(data.data.reverse())
    }

    useEffect(() => {
        getData()
    }, [])

    const handleUpdate = async (data) => {
        data.categoryId = 'activities';
        setActivityData(data)
        const a = document.getElementById("formDiv");
        if(document.documentElement.scrollWidth < 1000) {
            a.scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    const handleCreate = () => {
        const a = document.getElementById("formDiv");
        if(document.documentElement.scrollWidth < 1000) {
            a.scrollIntoView({
                behavior: "smooth"
            })
        }
        setActivityData({})
    }

    const handleDelete = async ({id, name}) => {
        const deleteConfirmation = await alertWarning(name)

        if (deleteConfirmation) {
            try {
                await axiosActivities.delete(`/${id}`)
                
                getActivities()
                setActivityData({})
            } catch (error) {
                alertError('Error al borrar', 'Por favor, prueba nuevamente')
            }
        }
    }

    const getActivities = async () => {
        const data = await axiosActivities.get()
        setActivities(data.data.reverse())
        setSearch('')
        setActivitiesSearch([])
    }

    const searchActivities = (e) => {
        setSearch(e.target.value)
        setActivitiesSearch(activities.filter(activity => activity.name.toLowerCase().includes(e.target.value)))
    }

    const Item = ({ currentActivity }) => {
        return (
            <div className={list.ItemContainer}>
                <li className={list.listItem}>
                    <div className={list.imageContainer}>
                        <img src={currentActivity.image} alt={currentActivity.name} className={list.image}/>
                    </div>
                    
                    <div className="d-flex flex-column text-center">
                        <h5>{currentActivity.name}</h5>  
                        <button onClick={() => handleUpdate(currentActivity)} className={list.button}>Modificar</button>
                        <button onClick={() => handleDelete(currentActivity)} className={list.button}>Eliminar</button>
                    </div>
                </li>
            </div>
        )
    }

  return (
    <div className={panel.doubleContainer}>

        <div className={panel.columnLeftContainer}>
            <div className={panel.titleContainer}>
                <h1 className={panel.title}>Actividades</h1>
            </div>
            <div className={list.buttonsContainer}>
                <button onClick={()=> handleCreate()} className={list.button}>Crear Actividad</button>
                <input onChange={searchActivities} value={search} className={list.search} placeholder='Buscar actividad...' />
            </div>
            <div className={list.listContainer}>
            <ul className={list.list}>
                    {!activities ?
                        <Loader />
                    :
                        search ? 
                            activitiesSearch.length > 0 ?
                                activitiesSearch.map((currentActivity) => <Item key={currentActivity.id} currentActivity={currentActivity} />)
                            :
                                <p className='text-center'>No se encontraron novedades</p>
                            
                        :
                            activities.length > 0 ? 
                                activities.map((currentActivity) => <Item key={currentActivity.id} currentActivity={currentActivity} />)
                            :
                                <p className='text-center'>No se encontraron novedades</p>
                    }
                </ul>
            </div>
        </div>
        
        <div className={panel.columnRightContainer}>
            <div className={panel.titleContainer}>
                <h1 className={panel.title}>Crear/Modificar</h1>
            </div>
            <div id='formDiv' className={form.formContainer}>
            {
                activityData.id ? (<ActivityForm data={activityData} getActivities={getActivities}/>) : ( <ActivityForm getActivities={getActivities}/>) 
            }
            </div>
        </div>

    </div>
  )
}



const ActivityForm = ({ data, getActivities }) => {

    const MIN_NAME = 10
    const MAX_NAME = 50
    const MIN_CONTENT = 50
    //Formik validation schema using Yup
    const activitySchema = Yup.object().shape({
        name: Yup.string().min(MIN_NAME, 'Nombre muy corto').max(MAX_NAME, 'Nombre muy largo').required('Requerido'),
        image: Yup.mixed().required('Requerido'),
        content: Yup.string().min(MIN_CONTENT, 'Contenido muy corto').required('Requerido')
    })

    //CKEditor5
    const CustomCKEditorField = ({ field, form }) => {
        return (
            <div className={form.ckEditor}>
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
        alertWaiting('Enviando actividad', 'aguarda un momento')

        try {
            if (data.id){
                await axiosActivities.put(`/${data.id}`, values)
            }else{
                await axiosActivities.post('/', values)
                resetForm()
            }
            closeCurrentAlert()

            const alertTitle = `Actividad ${ data.id ? 'actualizada!' : 'creada!'}`
            const alertMessage = `La actividad fue ${ data.id ? 'actualizada' : 'creada' } correctamente.`

            alertConfirmation(alertTitle, alertMessage)
            getActivities()
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
            validationSchema={activitySchema}
            enableReinitialize
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form className={form.activityForm}>

                    <Field name='name' className={form.input} placeholder='Nombre de la actividad' required />
                    {errors.name && touched.name && <p>{errors.name}</p>}

                    <label htmlFor='featuredImage' className={form.uploadImage}>{values.image ? 'Cambiar' : 'Selecciona una'} imagen (PNG, JPG)</label>
                    <input name='image' id='featuredImage' type='file' accept='image/*' onChange={e => setFieldValue('image', e.target.files[0])} />
                    {errors.image && touched.image && <p>{errors.image}</p>}

                    {values.image && <img src={(typeof values.image === 'string') ? values.image : URL.createObjectURL(values.image)} alt='descatada' className={form.image} />}

                    <Field name='content' component={CustomCKEditorField} />
                    {errors.content && touched.content && <p>{errors.content}</p>}

                    <Field type='submit' name='submit' value={`${data.id ? 'Actualizar' : 'Crear'} actividad`} className={form.button} />

                </Form>
            )}
        </Formik>
    )
}

ActivityForm.defaultProps = {data: {name: '', content: '', image: ''}}



export default ActivitiesPanel
