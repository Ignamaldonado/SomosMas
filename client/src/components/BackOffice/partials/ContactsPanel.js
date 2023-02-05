import React, { useEffect, useState } from "react"
import {  useSelector } from 'react-redux'

import '../BackOffice.css'
import custom  from './styles/ContactsPanel.module.css'
import panel  from './styles/Panels.module.css'
import form  from './styles/Forms.module.css'
import { ToastContainer, toast } from "react-toastify"
import Collapse from 'react-bootstrap/Collapse';
import { alertConfirmation, alertError, alertWaiting, closeCurrentAlert } from '../../../services/Alert'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {Plus, Envelope, Phone, EnvelopePaper} from 'react-bootstrap-icons'
import axios from 'axios'
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL
 
// const userData = useSelector(store => store.user)


const axiosContact = axios.create({
    baseURL: `${SERVER_BASE_URL}/contacts`,
    headers: {'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
});

const ContactsPanel = () => {
    
    const [contactsMessages, setContactsMessages] = useState([])
    const [selectedMessage, setSelectedMessage] = useState(undefined)


    const getContacts = async () => {
        try {
            return axiosContact.get()
        } catch (error) {
            toast.error( error.msg , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    useEffect(() => {
       getContacts()
        .then(messages => {
            setContactsMessages(messages.data.reverse())
        })
    }, [])

    return (
    <div className={panel.simpleContainer}>
        <h1>Contactos a la pagina</h1>
        <div className={panel.doubleContainer}>
            <div className={panel.columnLeftContainer}>    
            {contactsMessages.map(contact => {
                return (
                    <Contact contact={contact} setSelectedMessage={setSelectedMessage} key={contact.id} />
                )
            })}
            </div>
            <div className={panel.columnRightContainer}>
               { selectedMessage ? <ContactForm data={selectedMessage} setSelectedMessage={setSelectedMessage}/> : <div className="pt-5 w-100 d-flex justify-content-center "><div className="bg-light p-5 rounded-circle"><EnvelopePaper className="h1"/></div></div>}
            </div>
        </div>
        <ToastContainer />

    </div>
    )
}

const Contact = ({contact, setSelectedMessage}) => {

    const [open, setOpen] = useState(false)

    return(
        <div className={`${custom.container}`}>
            <div className="d-flex justify-content-between">
                <div className={custom.name}>
                    <h3 className="m-0">{contact.name}</h3>
                </div>
                <button className={`d-flex align-items-center justify-content-content p-0 m-0 ${custom.openButton}`}>
                    <Plus onClick={()=>{setOpen(!open)}} className={`d-flex align-items-center justify-content-center h2 p-0 m-0  ${open ? custom.cross : custom.plus }` }/>
                </button>
            </div>
            <Collapse in={open}>
                <div>
                    <div className="d-flex my-3">
                        <span className="d-flex align-items-center">
                            <Envelope className="mt-1 me-2"/>
                            <span className={custom.email}>{contact.email}</span>
                        </span>
                        <span className="ms-auto d-flex align-items-center">
                            <Phone className="me-1"/>
                            <span className={custom.phone}>{contact.phone}</span>
                        </span>
                    </div>
                    
                    <div>
                        <div className={custom.message}>{contact.message}</div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className={form.button} onClick={()=>{setSelectedMessage(contact)}}>Responder</button>
                    </div>
                </div>
                
            </Collapse>
        </div>
    )
}


const ContactForm = ({ data, setSelectedMessage }) => {

    //Formik validation schema using Yup
    const contactSchema = Yup.object().shape({
        email: Yup.string().required('Requerido').email('email invalido'),
        subject: Yup.string().required('Requerido'),
        message: Yup.string().required('Requerido')
    })

    const handleSubmit = async (values, { resetForm }) => {
        alertWaiting('Enviando email', 'Aguarde un momento')
        try {
            await axiosContact.post('/respond', values)
            resetForm()
            closeCurrentAlert()
            alertConfirmation("Email enviado!", "El email se envio correctamente")
        } catch (error) {
            closeCurrentAlert()
            alertError('Ups, hubo un error', error)
        }
    }

    return (
        <Formik
            initialValues={data}
            onSubmit={handleSubmit}
            validationSchema={contactSchema}
            enableReinitialize
        >
            {({ errors, touched, values }) => (
                <Form className={form.form}>

                    <Field name='email' className={form.input} placeholder='Email'/>
                    {errors.type && touched.email && (<p>{errors.email}</p>)}

                    <Field name='subject' className={form.input} placeholder='Asunto'/>
                    {errors.type && touched.subject && (<p>{errors.subject}</p>)}

                    <Field name='response' component="textarea" className={form.input} rows="7" placeholder='Escribe la respuesta aquí...'/>
                    {errors.content && touched.response && <p>{errors.response}</p>}
                    
                    <div className="d-flex justify-content-between">
                        <button className={form.button} onClick={()=>{setSelectedMessage(undefined)}}>Cancelar</button>
                        <Field type='submit' name='submit' value="Enviar" className={form.button} />
                    </div>


                </Form>
            )}
        </Formik>
    )
}

ContactForm.defaultProps = {
    email: '',
    subject: '',
    content: ''
}


export default ContactsPanel