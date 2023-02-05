import React, { useState, useEffect } from 'react'
import './NewsDetail.css'
import { customFetch } from '../../../services/fetch'
import { useParams } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import Details from '../../Details/Details'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const NewsDetail = () => {
    const [news, setNews] = useState(null)

    const params = useParams()
    const { id } = params

    const getNews = async () => {
        try {
            const url = `${SERVER_BASE_URL}/news/${id}`
            const properties = {
                method: 'get'
            }

            const res = await customFetch(url, properties)
            setNews(res.data)
        } catch (error) {
            console.log('Error getting news: ', error)
        }
    }

    useEffect(()=>{
        getNews()
    },[])

    if (!news) {
        return (
            <div className='mainContainer'>
                <Loader />
                <h1>Cargando novedad</h1>
            </div>
        )
    }

    return (
        <div className='mainContainer'>
            <Details item={news} section='novedades' />
        </div>
    )
}

export default NewsDetail
