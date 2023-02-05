import React, { useState, useEffect } from 'react'
import './ActivityDetail.css'
import { customFetch } from '../../../services/fetch'
import { useParams } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import Details from '../../Details/Details'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const ActivityDetail = () => {
    const [activity, setActivity] = useState(null)

    const params = useParams()
    const { id } = params

    const getActivity = async () => {
        try {
            const url = `${SERVER_BASE_URL}/activities/${id}`
            const properties = {
                method: 'get'
            }

            const res = await customFetch(url, properties)
            setActivity(res.data)
        } catch (error) {
            console.log('Error getting activity: ', error)
        }
    }

    useEffect(()=>{
        getActivity()
    },[])

    if (!activity) {
        return (
            <div className='mainContainer'>
                <Loader />
                <h1>Cargando actividad</h1>
            </div>
        )
    }

    return (
        <div className='mainContainer'>
            <Details item={activity} section='actividades' />
        </div>
    )
}

export default ActivityDetail
