import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { customFetch } from '../../../services/fetch'
import Loader from '../../Loader/Loader'
import TestimonialsCard from '../TestimonialsCard/TestimonialsCard'
import s from './TestimonialsHome.module.css'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const TestimonialsHome = () => {
    const [ testimonials, setTestimonials ] = useState(null)

    const getTestimonials = async () => {
        try {
            const url = `${SERVER_BASE_URL}/testimonials`
            const properties = {
                method: 'get'
            }

            const res = await customFetch(url, properties)
            setTestimonials(res.data.reverse())
        } catch (error) {
            console.log('Error getting news: ', error)
        }
    }

    useEffect(() => {
        getTestimonials()
    },[])

    if (!testimonials) {
        return (
            <>
                <h1>Testimonios</h1>
                <Loader />
                <p className='text-center'>Cargando...</p>
            </>
        )
    }

    return (
        <>
            <h1>Testimonios</h1>
            <div className="d-flex justify-content-end">
                <Link to="/backOffice/addTestimonial"><div className="py-2 my-3 me-3 btn btn-primary">Agregar mi testimonio</div></Link>

            </div>
            {testimonials.length === 0 ?
                <p className='text-center'>No se encontraron testimonios.</p>
            :
                <div className={s.testimonialsCardContainer}>
                    {
                        testimonials.map(t => {
                            return ( <TestimonialsCard img={t.image} title={t.name} content={t.content} key={t.id} /> )
                        })
                    }
                </div>
            }
        </>
    )
}

export default TestimonialsHome
