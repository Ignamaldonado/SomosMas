import React, { useEffect, useState } from "react"
import row  from './styles/Rows.module.css'
import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const axiosTestimonials = axios.create({
    baseURL: `${SERVER_BASE_URL}/testimonials`,
    headers: {
        'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'multipart/form-data'
    }
});

const TestimonialsPanel = ()=> {
    const [ testimonials, setTestimonials ] = useState(null)
    
    const getTestimonials = async () => {
        try {
            const res = await axiosTestimonials.get()
            setTestimonials(res.data)
        } catch (error) {
            console.log('Error getting news: ', error)
        }
    }

    useEffect(() => {
        getTestimonials()
    },[])

    const handleDelete = async (id) => {
        await axiosTestimonials.delete(`/${id}`)
        getTestimonials()
    }

    return (
        <div className={row.container}>
            <div className={row.titleContainer}>
                <h1 className={row.title}>Testimonios</h1>
            </div>
            <div className={row.rowContainer}>
                <ul className={row.row}>
                    {
                        testimonials && testimonials.map((e) => (
                            <div key={e.id} className={row.rowItemContainer}>
                                <li className="d-flex">
                                    <div className={row.imageContainer}>
                                        <img className={row.image} src={e.image} alt="Image" />
                                    </div>
                                    <div className={row.dataContainer}>
                                        <h5 className={row.name}> {e.name} </h5>
                                        <p className>{e.content}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDelete(e.id)} className={row.deleteButton}>✖</button>
                                    </div>
                                </li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default TestimonialsPanel