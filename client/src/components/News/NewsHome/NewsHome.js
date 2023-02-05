import React, { useState, useEffect } from 'react'
import { customFetch } from '../../../services/fetch'
import Loader from '../../Loader/Loader'
import FlexList from '../../FlexList/FlexList'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const NewsHome = () => {
    const [ news, setNews ] = useState(null)

    const getNews = async () => {
        try {
            const url = `${SERVER_BASE_URL}/news`
            const properties = {
                method: 'get'
            }

            const res = await customFetch(url, properties)
            setNews(res.data.reverse())
        } catch (error) {
            console.log('Error getting news: ', error)
        }
    }

    useEffect(() => {
        getNews()
    },[])

    if (!news) {
        return (
            <div>
                <h1>Listado de Novedades</h1>
                <Loader />
                <p className='text-center'>Cargando...</p>
            </div>
        )
    }

    return (
        <>
            <h1>Listado de Novedades</h1>
            {news.length === 0 ?
                <p className='text-center'>No se encontraron novedades.</p>
            :
                <FlexList list={news} section='novedades' />
            }
        </>
    )
}

export default NewsHome
