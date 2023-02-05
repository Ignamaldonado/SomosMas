import React, { useEffect, useState } from 'react'
import panel  from './styles/Panels.module.css'
import form  from './styles/Forms.module.css'
import list  from './styles/Lists.module.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { alertConfirmation, alertWarning ,alertError, alertWaiting, closeCurrentAlert } from '../../../services/Alert'
import axios from 'axios'
import Loader from '../../Loader/Loader'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL
const MIN_NAME = 10
const MAX_NAME = 50
const MIN_CONTENT = 50

const axiosNews = axios.create({
    baseURL: `${SERVER_BASE_URL}/news`,
    headers: {
        'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'multipart/form-data'
    }
});


const NewsPanel = () => {
    const [news, setNews] = useState(null)
    const [newsData, setNewsData] = useState({})

    const [ newsSearch, setNewsSearch ] = useState([])
    const [ search, setSearch ] = useState('')

    useEffect(() => {
        getNews()
    }, [])

    const handleUpdate = async (data) => {
        setNewsData(data)
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
        setNewsData({})
    }

    const handleDelete = async ({id, name}) => {
        const deleteConfirmation = await alertWarning(name)

        if (deleteConfirmation) {
            try {
                await axiosNews.delete(`/${id}`)
                
                getNews()
                setNewsData({})
            } catch (error) {
                alertError('Error al borrar', 'Por favor, prueba nuevamente')
            }
        }
    }

    const getNews = async () => {
        const data = await axiosNews.get()
        setNews(data.data.reverse())
        setSearch('')
        setNewsSearch([])
    }

    const searchNews = (e) => {
        setSearch(e.target.value)
        setNewsSearch(news.filter(news => news.name.toLowerCase().includes(e.target.value)))
    }

    const Item = ({ currentNews }) => {
        return (
            <div className={list.listItemContainer}>
                <li className={list.listItem}>
                    <div className={list.imageContainer}>
                        <img src={currentNews.image} alt={currentNews.name} className={list.image}/>
                    </div>
                    
                    <div className={list.dataContainer}>
                        <h5>{currentNews.name}</h5>  
                        <button onClick={() => handleUpdate(currentNews)} className={list.button}>Modificar</button>
                        <button onClick={() => handleDelete(currentNews)} className={list.button}>Eliminar</button>
                    </div>
                </li>
            </div>
        )
    }

  return (
    <div className={panel.doubleContainer}>


        <div className={panel.columnLeftContainer}>
            <div className={panel.titleContainer}>
                <h1 className={panel.title}>Novedades</h1>
            </div>
            <div className={list.buttonsContainer}>
                <button onClick={()=> handleCreate()} className={list.button}>Crear Novedad</button>
                <button onClick={()=> getNews()} className={list.button}>Refresh</button>
                <input onChange={searchNews} value={search} className={list.search} placeholder='Buscar novedad...' />
            </div>

            <div className={list.listContainer}>
                <ul className={list.list}>
                    {!news ?
                        <Loader />
                    :
                        search ? 
                            newsSearch.length > 0 ?
                                newsSearch.map((currentNews) => <Item key={currentNews.id} currentNews={currentNews} />)
                            :
                                <p className='text-center'>No se encontraron novedades</p>
                            
                        :
                            news.length > 0 ? 
                                news.map((currentNews) => <Item key={currentNews.id} currentNews={currentNews} />)
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
                newsData.id ? (<NewsForm data={newsData} getNews={getNews}/>) : ( <NewsForm getNews={getNews}/>) 
            }
            </div>
        </div>

    </div>
  )
}

const NewsForm = ({ data, getNews}) => {

    //Formik validation schema using Yup
    const newsSchema = Yup.object().shape({
        name: Yup.string().min(MIN_NAME, 'Nombre muy corto').max(MAX_NAME, 'Nombre muy largo').required('Requerido'),
        image: Yup.mixed().required('Requerido'),
        categoryId: Yup.number(),
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
                await axiosNews.put(`/${data.id}`, values)
            }else{
                await axiosNews.post('/', values)
                resetForm()
            }
            closeCurrentAlert()

            //Show confirmation message
            const alertTitle = `Novedad ${ data.id ? 'actualizada!' : 'creada!'}`
            const alertMessage = `La novedad fue ${ data.id ? 'actualizada' : 'creada'} correctamente.`
            
            alertConfirmation(alertTitle, alertMessage)
            getNews()
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
            validationSchema={newsSchema}
            enableReinitialize
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form className={form.form}>

                    <Field name='name' className={form.input} placeholder='Nombre de la novedad' required />
                    {errors.name && touched.name && <p>{errors.name}</p>}

                    <label htmlFor='featuredImage' className={form.uploadImage}>{values.image ? 'Cambiar' : 'Selecciona una'} imagen (PNG, JPG)</label>
                    <input name='image' id='featuredImage' type='file' accept='image/*' onChange={e => setFieldValue('image', e.target.files[0])} />
                    {errors.image && touched.image && <p>{errors.image}</p>}

                    {values.image && <img src={(typeof values.image === 'string') ? values.image : URL.createObjectURL(values.image)} alt='descatada' className={form.image} />}

                    <Field name='categoryId' type='number' className={form.input} placeholder='ID Categoria' required />
                    {errors.type && touched.type && <p>{errors.type}</p>}

                    <Field name='content' component={CustomCKEditorField} />
                    {errors.content && touched.content && <p>{errors.content}</p>}

                    <Field type='submit' name='submit' value={`${data.id ? 'Actualizar' : 'Crear' } novedad`} className={form.button} />

                </Form>
            )}
        </Formik>
    )
}

NewsForm.defaultProps = {data: {name: '', content: '', categoryId: 1, image: ''}}


export default NewsPanel