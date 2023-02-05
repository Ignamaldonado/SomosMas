import React, { useEffect, useState } from 'react'
import publicService from '../../../services/publicService'
import { customFetch } from '../../../services/fetch'
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

const axiosMembers = axios.create({
    baseURL: `${SERVER_BASE_URL}/members`,
    headers: {
        'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'multipart/form-data'
    }
});

const MembersPanel = () => {
    const [members, setMembers] = useState(null)
    const [memberData, setMemberData] = useState({})

    const [ membersSearch, setMembersSearch ] = useState([])
    const [ search, setSearch ] = useState('')

    useEffect(() => {
        async function getData() {
            const data = await axiosMembers.get()
            setMembers(data.data.reverse())
        }
        getData()
    }, [])

    const handleUpdate = async (data) => {
        data.categoryId = 'members';
        setMemberData(data)
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
        setMemberData({})
    }

    const handleDelete = async ({id, name}) => {
        const deleteConfirmation = await alertWarning(name)

        if (deleteConfirmation) {
            try {
                await axiosMembers.delete(`/${id}`)
                handleRefresh()
                setMemberData({})
            } catch (error) {
                alertError('Error al borrar', 'Por favor, prueba nuevamente')
            }
        }
    }

    const handleRefresh = async () => {
        const data = await publicService.membersList()
        setMembers(data.data.reverse())
        setSearch('')
        setMembersSearch([])
    }

    const searchMembers = (e) => {
        setSearch(e.target.value)
        setMembersSearch(members.filter(member => member.name.toLowerCase().includes(e.target.value)))
    }

    const Item = ({ currentMember }) => {
        return (
            <div className={list.ItemContainer}>
                <li className={list.listItem}>
                    <div className={list.imageContainer}>
                        <img src={currentMember.image} alt={currentMember.name} className={list.image}/>
                    </div>
                    
                    <div className="d-flex flex-column text-center">
                        <h5>{currentMember.name}</h5>  
                        <button onClick={() => handleUpdate(currentMember)} className={list.button}>Modificar</button>
                        <button onClick={() => handleDelete(currentMember)} className={list.button}>Eliminar</button>
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
                <button onClick={()=> handleRefresh()} className={list.button}>Refresh</button>
                <input onChange={searchMembers} value={search} className={list.search} placeholder='Buscar actividad...' />
            </div>
            <div className={list.listContainer}>
            <ul className={list.list}>
                    {!members ?
                        <Loader />
                    :
                        search ? 
                            membersSearch.length > 0 ?
                                membersSearch.map((currentMember) => <Item key={currentMember.id} currentMember={currentMember} />)
                            :
                                <p className='text-center'>No se encontraron novedades</p>
                            
                        :
                            members.length > 0 ? 
                                members.map((currentMember) => <Item key={currentMember.id} currentMember={currentMember} />)
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
                memberData.id ? (<MemberForm data={memberData}/>) : ( <MemberForm/>) 
            }
            </div>
        </div>

    </div>
  )
}

const MIN_NAME = 10
const MAX_NAME = 50
const MIN_CONTENT = 50

const MemberForm = ({ data }) => {

    //Formik validation schema using Yup
    const memberSchema = Yup.object().shape({
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
                await axiosMembers.put(`/${data.id}`, values)
            }else{
                await axiosMembers.post('/', values)
                resetForm()
            }
            closeCurrentAlert()

            const alertTitle = `Actividad ${ data.id ? 'actualizada!' : 'creada!'}`
            const alertMessage = `La actividad fue ${ data.id ? 'actualizada' : 'creada' } correctamente.`

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
            validationSchema={memberSchema}
            enableReinitialize
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form className={form.memberForm}>

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

MemberForm.defaultProps = {data: {name: '', content: '', image: ''}}



export default MembersPanel
