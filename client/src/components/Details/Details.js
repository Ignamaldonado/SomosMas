import React from 'react'
import styles from './Details.module.css'
import parse from 'html-react-parser'
import CustomButton from '../CustomButton/CustomButton'

const Details = ({ item, section }) => {
    const Header = ({ title, image, updatedAt }) => {

        console.log('IMAGE', image)
        const date = new Date(updatedAt)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        //fix for images with ' '
        const imageFix = image.replaceAll(' ', '%20')
    
        return (
            <header className={`${styles.header} d-flex align-items-center`} style={{backgroundImage: 'url(' + imageFix + ')'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className={styles.headingContainer}>
                                <h1 className={styles.title}>{title}</h1>
                                <span className={styles.date}>{date.toLocaleDateString('es-AR', options)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    const Content = ({ content }) => {
        return (
            <div className={styles.body}>
                <div className="row">
                    <div className={`col-md-10 col-lg-8 mx-auto ${styles.content}`}>
                        {parse(content)}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header title={item.name} image={item.image} updatedAt={item.updatedAt} />
            <Content content={item.content} />
            <CustomButton href={`/${section}`} text={`Ver mas ${section}`} />
        </>
    )
}

export default Details
