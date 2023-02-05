import React, { useState, useEffect } from 'react'
import { customFetch } from '../../../services/fetch'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Slider from '../Slider/Slider'
import Loader from '../../Loader/Loader'
import NewsletterCard from '../Newsletter/NewsletterCard'
import TestimonialsCard from '../../Testimonials/TestimonialsCard/TestimonialsCard'
import s from './Main.module.css'
import Button from 'react-bootstrap/Button'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const Main = () => {
	const [ news, setNews ] = useState(null)
	const [ testimonials, setTestimonials ] = useState(null)

	//Organization data (redux)
	const organization = useSelector(store => store.organization)

	const title = 'Hola! Bienvenidx'

	const img = [
		{
			imageUrl: 'https://alkemyong.s3.amazonaws.com/apoyo-escolar-slider.jpg',
			text: 'Apoyo escolar ',
		},
		{
			imageUrl: 'https://alkemyong.s3.amazonaws.com/ayuda-alimentacion-slider.jpg',
			text: 'Ayuda alimenticia',
		},
		{
			imageUrl: 'https://alkemyong.s3.amazonaws.com/actividades-slider.jpg',
			text: 'Actividades al aire libre',
		}
	]

	const getNews = async () => {
		try {
			const url = `${SERVER_BASE_URL}/news`
			const properties = {
				method: 'get',
			}
	
			const res = await customFetch(url, properties)
	
			const slicedNews = res.data.slice(0, 4).reverse()
			setNews(slicedNews)
		} catch (error) {
			toast.error(
				'No se pueden obtener las noticias en este momento',
				{
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			)
		}
	}

	const getTestimonials = async () => {
		try {
			const url = `${SERVER_BASE_URL}/testimonials`
			const properties = {
				method: 'get',
			}
	
			const res = await customFetch(url, properties)
	
			const slicedTestimonials = res.data.reverse().slice(0, 3)

			console.log('testimonials', slicedTestimonials)
			setTestimonials(slicedTestimonials)
		} catch (error) {
			toast.error(
				'No se pueden obtener los testimonios en este momento',
				{
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			)
		}
	}

	useEffect(() => {
		getNews()
		getTestimonials()
	}, [])

	const LatestNews = () => {
		return (
			<div className={s.news}>
				{news.map(news => (
					<NewsletterCard
						key={news.id}
						name={news.name}
						img={news.image}
						text={news.content}
						url={news.id}
					/>
				))}
			</div>
		)
	}

	const LatestTestimonials = () => {
		return (
			<div className={s.testimonialsCardContainer}>
				{testimonials.map(testimonial => (
					<TestimonialsCard img={testimonial.image} title={testimonial.name} content={testimonial.content} truncate key={testimonial.id} />
				))}
			</div>
		)
	}

	return (
		<>
			<div className={s.body_container}>
				<div className={s.hero}>
					<div className={s.welcome_div}>
						<h1 className={s.title}>{title}</h1>
						{organization.data && parse(organization.data.welcomeText)}
						
						<Button href="/donaciones" className={s.main_button}>
							Colabora!
						</Button>
						
					</div>
					<div className={s.slider_div}>
						<Slider images={img} />
					</div>
				</div>
				<div className={s.newsletter_title_container}>
					<h2 className={s.newsletter_title}>Últimos testimonios</h2>
					{testimonials ?
						testimonials.length > 0 ?
							<LatestTestimonials />
						:
							<p>No se encontraron testimonios</p>
					:
						<Loader />
					}
				</div>
				<div className={s.newsletter_title_container}>
					<h2 className={s.newsletter_title}>Últimas Novedades</h2>
					{news ?
						news.length > 0 ?
							<LatestNews />
						:
							<p>No se encontraron novedades</p>
					:
						<Loader />
					}
				</div>
			</div>
			<ToastContainer />
		</>
	)
}

export default Main
