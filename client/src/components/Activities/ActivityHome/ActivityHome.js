import React, { useState, useEffect } from 'react'
import { customFetch } from '../../../services/fetch'
import Loader from '../../Loader/Loader'
import FlexList from '../../FlexList/FlexList'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const ActivitiesHome = () => {
    const [ activities, setActivities ] = useState(null)

    const getActivities = async () => {
        try {
            const url = `${SERVER_BASE_URL}/activities`
            const properties = {
                method: 'get'
            }

            const res = await customFetch(url, properties)
            setActivities(res.data.reverse())
        } catch (error) {
            console.log('Error getting activities: ', error)
        }
    }

    useEffect(() => {
        getActivities()
    },[])

    if (!activities) {
        return (
            <>
                <h1>Listado de Actividades</h1>
                <Loader />
                <p className='text-center'>Cargando...</p>
            </>
        )
    }

    return (
        <>
            <h1>Listado de Actividades</h1>
            {activities.length === 0 ?
                <p className='text-center'>No se encontraron actividades.</p>
            :
                <FlexList list={activities} section='actividades' />
            }
        </>
    )
}

export default ActivitiesHome
