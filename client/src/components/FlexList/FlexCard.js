import React from 'react'
import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import styles from './FlexCard.module.css'
import CustomButton from '../CustomButton/CustomButton'

const FlexCard = ({ item, section }) => {
    const { id, name, image } = item

    return (
        <div className={styles.card}>
            <Link to={`/${section}/${id}`}>
                <Card.Img variant="top" src={image} className={styles.image} />
            </Link>

            <Card.Body className={styles.body}>
                <h2 className='text-center'>
                    <Link to={`/${section}/${id}`} className={styles.title}>{name}</Link>
                </h2>
                <CustomButton href={`/${section}/${id}`} text='Ver detalle' />
            </Card.Body>
        </div>
    )
}

export default FlexCard
